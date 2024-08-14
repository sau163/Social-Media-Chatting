import asyncHandler from "../middlewares/asyncHandler.js";
import Chat from "../models/chat.js";
import User from "../models/userSchema.js";
import AppError from "../utils/AppError.js";
import cloudinary from 'cloudinary';
import fs from 'fs';
import Request from "../models/request.js"
import { emitEvent } from "../utils/features.js";
import { NEW_REQUEST, REFETCH_CHATS } from "../contants/events.js";
import { getOtherMember } from "../lib/helpher.js";

const cookieOptions = {
    secure: process.env.NODE_ENV === 'production' ? true : false,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
};

export const newUser = asyncHandler(async (req, res, next) => {
    const { name, userName, password,  email } = req.body;

    if (!name || !password  || !userName || !email) {
        return next(new AppError('All parameters required', 404));
    }

    // if ( password != confirmPassword){
    //     return next(new AppError('Password and confirm password do not match', 404))
    // }

    const userVerification = await User.findOne({ email });

    if (userVerification) {
        return next(new AppError('User already exists', 404));
    }

    const user = await User.create({
        name,
        userName,
        email,
        password,
        avatar: {
            public_id: email,
            url: ''
        }
    });

    if (!user) {
        return next(new AppError('Something went wrong', 404));
    }

    if (req.file) {
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'lms',
                width: 250,
                height: 250,
                gravity: 'faces',
                crop: 'fill',
            });

            if (result) {
                user.avatar.public_id = result.public_id;
                user.avatar.url = result.url;

                fs.rmSync(`uploads/${req.file.filename}`);
            }
        } catch (error) {
            return next(new AppError(error.message || 'Something went wrong', 404));
        }
    }

    await user.save();

    const token = await user.GenerateWebToken();

    user.password = undefined;

    res.cookie('token', token, cookieOptions);

    return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user,
    });
});

export const loginUser = asyncHandler( async function (req, res,next) {

    const { email, password } = req.body;

    if (!email ||!password) {
        return next(new AppError('All parameters required', 404));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!(user && (await user.comparePassword(password)))) {
        return next(
          new AppError('Email or Password do not match or user does not exist', 401)
        );
      }

      const token = await user.GenerateWebToken();

      user.password =  undefined;

      res.cookie('token', token,cookieOptions)

      return res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        user,
      })
});

export const myProfile = asyncHandler(async function(req, res, next) {
    const user = await User.findById(req.user);

    if (!user) {
        return next(new AppError('User does not exist', 404));
    }

    const data = {
        id:user.id,
        avatar: user.avatar.url, // Assuming user.avatar.url is where the avatar URL is stored
        name: user.name,
        userName: user.userName,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };

    return res.status(200).json({
        success: true,
        message: 'User profile fetched successfully',
        data,
    });
});


export const logoutUser =asyncHandler(async (req, res,next) => {

    res.cookie('token',null,{
        secure: process.env.NODE_ENV =='production'?true:false,
        maxAge: 0,
        httpOnly: true,
    } );
    return res.status(200).json({
        success: true,
        message: 'User logged out successfully',
    })
});

export const searchUser =asyncHandler(async (req, res,next) => {

    const {name=""}=req.query;

    const myChats = await Chat.find({groupChat:false,members:req.user});
    //all users from my chats
    const allUsers = myChats.map((chat) =>chat.members).flat();
 //all users from my chats except me //4:33
    const allUsersExceptMe = await User.find({
        _id:{$nin:allUsers},
        name:{$regex:name,$options:"i"},

    })

    const users = allUsersExceptMe.map(({_id,name,avatar})=>({
        _id,
        name,
        avatar:avatar.url,
    }));

    return res.status(200).json({
        success: true,
        users,
    })
});

export const sendRequest =asyncHandler(async (req, res,next) => {

    const {userId} = req.body;
    console.log(req.user,userId);

if(!userId)
{
    return next(new AppError('User id required', 404));
}
    const request = await Request.findOne({
        $or:[
            {sender:req.user,receiver:userId},
            {sender:userId,receiver:req.user},
        ]
    });
    if(request){
        return next(new AppError('Request already sent', 404));
    }
    
    await Request.create({
        sender:req.user,
        receiver:userId,
    });

    emitEvent(req,NEW_REQUEST,[userId]);


    

    return res.status(200).json({
        success: true,
        message: 'Request sent successfully',  
    })
});

// export const acceptRequest =asyncHandler(async (req, res,next) => {

//     const {requestId,accept} = req.body;

//     console.log(requestId, accept);


//     if(!requestId){
//         console.log("1")
//         return next(new AppError('Request id required', 404));
//     }

//     // Validation logic for "accept"
//     if (accept === undefined || accept === null || accept === '') 
//         {
//             console.log("2")
//         return next(new AppError('Please add accept', 400));
//     }
//     if (typeof accept !== 'boolean') {
//         console.log("3")
//         return next(new AppError('Accept must be a boolean', 400));
//     }

//     const request = await Request.findById(requestId)
//     .populate("sender","name")
//     .populate("receiver","name") ;

//     if(!request){
//         console.log("4")
//         return next(new AppError('Request does not exist', 404));
//     }
//     console.log("Req", request.receiver._id.toString(), request.user.toString());
//     if(request.receiver._id.toString() !== request.user.toString()){
//         console.log("5")
//         return next(new AppError('You are not the receiver', 403));
//     }

//     if(!accept){
//         console.log("6")
//         await request.deleteOne();

//         return res.status(200).json({
//             success: true,
//             message: 'Request rejected successfully',  
//         })
//     }

//     const members = [request.sender._id, request.receiver._id];
//     await Promise.all([
//         Chat.create({
//             members,
//             name:`${request.sender.name}-${request.receiver.name}`
//         }),
//         request.deleteOne(),
//     ]);
//     emitEvent(req,REFETCH_CHATS,members);

//     return res.status(200).json({
//         success: true,
//         message: 'Request ACCEPTED',  
//         senderId:request.sender._id,
//     })
// });

export const acceptRequest = asyncHandler(async (req, res, next) => {
    const { requestId, accept } = req.body;
   

    console.log(requestId, accept);
    console.log("req",req.user.toString())

    if (!requestId) {
      
        return next(new AppError('Request id required', 404));
    }

    // Validation logic for "accept"
    if (accept === undefined || accept === null || accept === '') {
      
        return next(new AppError('Please add accept', 400));
    }
    if (typeof accept !== 'boolean') {
        console.log("3");
        return next(new AppError('Accept must be a boolean', 400));
    }

    const request = await Request.findById(requestId)
        .populate("sender", "name")
        .populate("receiver", "name");



    if (!request) {
      
        return next(new AppError('Request does not exist', 404));
    }

    // Adding checks before calling toString()
    const receiverId = request.receiver?._id?.toString();
    const userId = req.user.toString();
    
    console.log("Req", receiverId, userId);

    if (receiverId !== userId) {
      
        return next(new AppError('You are not the receiver', 403));
    }

    if (!accept) {
      
        await request.deleteOne();

        return res.status(200).json({
            success: true,
            message: 'Request rejected successfully',
        });
    }

    const members = [request.sender._id, request.receiver._id];
    await Promise.all([
        Chat.create({
            members,
            name: `${request.sender.name}-${request.receiver.name}`
        }),
        request.deleteOne(),
    ]);
    emitEvent(req, REFETCH_CHATS, members);

    return res.status(200).json({
        success: true,
        message: 'Request ACCEPTED',
        senderId: request.sender._id,
    });
});


export const getNotification =asyncHandler(async (req, res,next) => {

    const requests = await Request.find({receiver:req.user})
    .populate("sender","name avatar");

    const allRequests = requests.map(({_id,sender})=>({
        _id,
        sender:{
            _id:sender._id,
            name:sender.name,
            avatar:sender.avatar.url,
        },
    })) 

    return res.status(200).json({
        success: true,
        message: 'Request ACCEPTED',  
        sender:allRequests,
    })
});

export const getFriends =asyncHandler(async (req, res,next) => {8

    const chatId= req.query.chatId;
    const chats = await Chat.find({
        members:req.user,
        groupChat:false,

    }).populate("members", "name avatar");

    const friends=chats.map((members) =>{
        const otherUser= getOtherMember(members, req.user)
        return {
            _id:otherUser._id,
            name:otherUser.name,
            avatar:otherUser.avatar.url,
        };
    });
    if(chatId){
        const chat=await chat.findById(chatId);

        const avlFriend = friends.filter(friend =>!chat.members.includes(friend._Id));

        return res.status(200).json({
            success: true,
            friends:avlFriend,
        })
    }
    else{
        return res.status(200).json({
            success: true,
            friends,
        })
    }

});