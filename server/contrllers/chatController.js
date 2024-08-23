import asyncHandler from "../middlewares/asyncHandler.js";
import AppError from "../utils/AppError.js";
 import { ALERT,NEW_MESSAGE,NEW_MESSAGE_ALERT,REFETCH_CHATS } from "../contants/events.js";
import Chat from "../models/chat.js";
import { getOtherMember } from "../lib/helpher.js";
import Message from "../models/message.js";
import { deleteFilesFromCloud, emitEvent, uploadFileToCloud } from "../utils/features.js";
import User from "../models/userSchema.js";

export const newGroupChat = asyncHandler( async(req,res,next) => {

    const {name,members}= req.body;

    if(members.length<2){
        return next(new AppError('Group must have atleast 2 members', 400));
    }

    const allMembers = [...members,req.user.id];

    await Chat.create({
        name,
        groupChat:true,
        creator: req.user.id,
        members:allMembers,
    })


emitEvent(req,ALERT,allMembers, `welcome to ${name} group`);
emitEvent(req,REFETCH_CHATS,members);

return res.status(200).json({
    success:true,
    message:'group created successfully'
})
})


export const getMyChat = asyncHandler(async (req, res, next) => {
    const chats = await Chat.find({ members: req.user }).populate(
        "members",
        "name avatar"
    );

    const transformedChats = chats.map(({ _id, name, members, groupChat }) => {

        const otherMember = getOtherMember(members,req.user);

        return {
            _id,
            groupChat,
            name:groupChat? name : otherMember.name,
            avatar: groupChat? members.slice(0,3).map(({avatar}) => avatar.url): [otherMember.avatar.url],
            members: members.reduce((prev,curr) =>{
                if(curr._id.toString() !== req.user.toString()){
                    prev.push(curr._id);
                }
                return prev;
            },[])
            
        };
    });

    return res.status(200).json({
        success: true,
        message: 'Chats fetched successfully',
        chats: transformedChats,
    });
});

export const getMyGroup = asyncHandler(async (req, res, next) => {
    const chats = await Chat.find({ members: req.user,groupChat: true}).populate(
        "members",
        "name avatar"
    );
    
    console.log(req.user)
    console.log(chats);
    const transformedChats = chats.map(({ _id, name, members, groupChat }) => {

        
        return ({
            _id,
            groupChat,
            name,
            avatar: members.slice(0,3).map(({avatar}) => avatar.url) ,
            members,
    })
            
    });

    return res.status(200).json({
        success: true,
        message: 'Chats fetched successfully',
        chats: transformedChats,
    });
});



export const addMembers = asyncHandler(async (req, res, next) => {
    const { chatId, members } = req.body;

    if (!members || members.length < 1) {
        return next(new AppError('Please provide members', 404));
    }

    const chat = await Chat.findById(chatId);

    if (!chat) {
        return next(new AppError('Chat does not exist', 404));
    }

    if (!chat.groupChat) {
        return next(new AppError('Chat is not a group', 404));
    }


    if ( chat.creator.toString() !== req.user.toString()) {
        return next(new AppError('You are not the creator', 403));
    }

    const allNewMembersFind = members.map(memberId => User.findById(memberId, "name"));
    const allNewMembers = await Promise.all(allNewMembersFind);

    const uniqueMembers = allNewMembers.filter(member => !chat.members.includes(member._id.toString()));

    chat.members.push(...uniqueMembers.map(member => member._id));

    if (chat.members.length > 50) {
        return next(new AppError('Group cannot have more than 50 members', 404));
    }

    await chat.save();

    const allUsersName = allNewMembers.map(member => member.name).join(",");

    // Assuming emitEvent and ALERT/REFETCH_CHATS constants are defined correctly
    emitEvent(res, ALERT, chat.members, `${allUsersName} added in group`);
    emitEvent(res, REFETCH_CHATS, chat.members);

    return res.status(200).json({
        success: true,
        message: 'Added successfully',
    });
});


export const removeMember = asyncHandler(async (req, res, next) => {
    const { userId, chatId } = req.body;

    const [chat, removeMember] = await Promise.all([
        Chat.findById(chatId),
        User.findById(userId, "name")
    ]);

    if (!chat) {
        return next(new AppError('Chat does not exist', 404));
    }

    if (!chat.groupChat) {
        return next(new AppError('Chat is not a group', 404));
    }
    

    if (!chat.creator || !req.user || !req.user) {
        return next(new AppError('Invalid request: Creator or current user ID is undefined', 400));
    }

    if (chat.creator.toString() !== req.user.toString()) {
        return next(new AppError('You are not the creator', 403));
    }

    if (chat.members.length < 3) {
        return next(new AppError('Group must have at least 3 members', 404));
    }

    chat.members = chat.members.filter(member => member.toString() !== userId.toString());

    await chat.save();

    emitEvent(res, ALERT, chat.members, `${removeMember.name} removed from group`);
    emitEvent(res, REFETCH_CHATS, chat.members);

    return res.status(200).json({
        success: true,
        message: 'Removed successfully',
    });
});


export const leaveGroup = asyncHandler(async (req, res, next) => {
    
    const chatId = req.params.id;

    const chat = await Chat.findById(chatId);

         if (!chat) {
            return next(new AppError('Chat does not exist', 404));
        }
    
        if (!chat.groupChat) {
            return next(new AppError('Chat is not a group', 404));
        }
    
        const otherMembers=chat.members.filter(
            (member)=>member.toString()!== req.user.toString()
        )
        
        if(otherMembers.length<3){
            return next(new AppError('Group must have atleast 3 members', 403));
        }
        if(chat.creator.toString()=== req.user.toString()) {
            const newCreator =otherMembers[0]; 
            
            chat.creator=newCreator;
        }

        chat.members=otherMembers;

        const [user] =await Promise.all([chat.findById(req.user,"name")]);
        await chat.save();
        

        emitEvent(res,ALERT,chat.members,`${user.name} leave the group`);

    return res.status(200).json({
        success: true,
        message: 'remove successfully',
    });
});


export const sendAttachment = asyncHandler(async (req, res, next) => {
    
   const {chatId}= req.body;

   console.log("chat",chatId);
    
   const [chat,me] = await Promise.all([
    Chat.findById(chatId),
    User.findById(req.user,"name")  ])

    if (!chat) {
        return next(new AppError('Chat does not exist', 404));
    }

    const files= req.files|| [];

    console.log(files)

    if(files.length<1 ){
        return next(new AppError('please provide attachments', 404));
    }

    if(files.length>10 ){
        return next(new AppError('no. of file ot greater than 5', 404));
    }
    
    //upload files here 
    const attachements = await uploadFileToCloud(files);
    console.log("attachment",attachements);
    
    const messageForDB={content:"",attachements,sender: me._id,chat:chatId};
    
    const messagesForRealTime ={
        ...messageForDB,
        sender: {
            _id: me._id,
            name: me.name,
            //avatar: me.avatar.url,
        }
    };
    const message= await Message.create(messageForDB);
    emitEvent(req,NEW_MESSAGE,chat.members,{
        message:messagesForRealTime,
        chatId
    })
    
    emitEvent(req,NEW_MESSAGE_ALERT,chat.members,{chatId});
    
    return res.status(200).json({
        success: true,
        message,
    });
});

export const getChatDetails = asyncHandler(async (req, res, next) => {
    
    if(req.query.populate==="true"){
        const chat = await Chat.findById(req.params.id).populate(
            "members",
            "name avatar"
        ).lean();
        if (!chat) {
            return next(new AppError('Chat does not exist', 404));
        }
        const chats = chat.members.map(({_id, name, avatar}) =>
        ({
            _id,
            name,
            avatar: avatar.url,
        }))

        return res.status(200).json({
            success: true,
            chats,
        });
    }
    else {
        const chat = await Chat.findById(req.params.id);
        if (!chat) {
            return next(new AppError('Chat does not exist', 404));
        }
        return res.status(200).json({
            success: true,
            chat,
        });
    }
 });

 export const renameGroup = asyncHandler(async (req, res, next) => {

    const chatId= req.params.id;
    const {name}= req.body;

     const chat = await Chat.findById(chatId);
     
     if (!chat) {
         return next(new AppError('Chat does not exist', 404));
     }
     
     if(!chat.groupChat) {
        return next(new AppError('this is not a group chat', 404));
     }
     
     if(chat.creator.toString()!== req.user.toString()) {
        return next(new AppError('You are not the creator', 403));
     }

     chat.name=name;
     await chat.save();

     emitEvent(req,REFETCH_CHATS,chat.members);
    return res.status(200).json({
         success: true,
         message:"group rename successfully",
     });
 });

 export const deleteChat = asyncHandler(async (req, res, next) => {

    const chatId= req.params.id;
   
     const chat = await Chat.findById(chatId);
     
     if (!chat) {
         return next(new AppError('Chat does not exist', 404));
     }
     
     if(!chat.groupChat) {
        return next(new AppError('this is not a group chat', 404));
     }
    
     const members=chat.members;

     if(chat.groupChat&& chat.creator.toString()!== req.user.toString()){
        return next(new AppError('You are not the creator', 403));
     }

     if(chat.groupChat&& !chat.members.includes(req.user.toString())){
        return next(new AppError('You are not a member', 403));
     }

     //here we have to delete all masseges as well as attachmentsfom cloudnery

     const messAttachment = await Message.find({
        chat:chatId,
        attachments:{$exists:true,$ne:[]},
     });

     const public_ids=[];

     messAttachment.forEach(attachments=>{
        attachments.forEAch(({public_id})=>public_ids.push(public_id));
     });

     await Promise.all([
        deleteFilesFromCloud(public_ids),
        chat.deleteOne(),
        Message.deleteMany({chat:chatId}),
     ])


     emitEvent(req,REFETCH_CHATS,chat.members);
    return res.status(200).json({
         success: true,
         message:"chat delete successfully",
     });
 });
 
 export const getMessages = asyncHandler(async (req, res, next) => {

    const chatId= req.params.id;
    const{page=1}=req.query;
    const limit=20;
    const skip=(page-1)*limit;

    const[messages,totalMessageCount] = await Promise.all([
        Message.find({chat:chatId})
       .sort({createdAt:-1})
       .skip(skip) 
       .limit(limit)
       .populate("sender", "name avatar")
       .lean(),
        Message.countDocuments({chat:chatId}),
    ]);

    const totalpages = Math.ceil(totalMessageCount/limit)||0;

    return res.status(200).json({
         success: true,
         messages:messages.reverse(),
         totalpages,
     });
 });