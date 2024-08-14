import asyncHandler from "../middlewares/asyncHandler.js";
import Chat from "../models/chat.js";
import Message from "../models/message.js";
import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

const cookieOptions = {
    secure: process.env.NODE_ENV === 'production' ? true : false,
    maxAge: 2 * 60 * 60 * 1000, // 2 hourss
    httpOnly: true,
};

export const adminLogin= asyncHandler(async (req,res,next) => {

    const {secretKey} = req.body;

    if(!secretKey){
        return next(new AppError('please provide secret key',404));
    }
    
    const adminSecretKey=process.env.ADMIN_SECRET_KEY|| "100rabh_raaz";
    const isMatch= secretKey===adminSecretKey;

    if(!isMatch) {
        return next(new AppError('unauthorized',401));
    }

    const token = jwt.sign(secretKey, process.env.JWT_SECRET);

    return res.cookie("admin-token", token, cookieOptions)
        .status(200)
        .json({
            success: true,
            message: 'Admin logged in successfully',
            token,
        });
});

export const adminLogout= asyncHandler(async (req,res,next) => {

    
    return res.cookie("admin-token","",{...cookieOptions,maxAge:0})
    .status(200).json({
        success: true,
        message: 'Admin logout successfully',
    });
});

export const getAdminData= asyncHandler(async (req,res,next) => {

    
    
    return res
    .status(200).json({
        admin:true,
    });
});

export const getAllUsers= asyncHandler(async (req,res,next) => {

    const users = await User.find({});

    const transformedUsers =await Promise.all( users.map(async({name,useName, avatar, _id}) => {
        
        const [groups,friends]= await Promise.all([
            Chat.countDocuments({groupChat: true,members:_id}),
            Chat.countDocuments({groupChat: false,members:_id})
        ])
        
        
        return {
            name,
            useName,
            avatar: avatar.url,
            _id,
            groups,
            friends
        }
    }));

    return res.status(200).json({
        success: true,
        users: transformedUsers,
    });
});


export const getAllChat= asyncHandler(async (req,res,next) => {

    const chats = await Chat.find({})
    .populate("members","name avatar")
    .populate("creator","name avatar");

    const transformedChats =await Promise.all( chats.map(async({_id,members,groupChat,name,creator}) => {
        
         const totalMessages= await Message.countDocuments({chat: _id})

        return {
            _id,
            groupChat,
            name,
            avatar: members.slice(0,3).map((member) =>member.avatar.url),
            members:members.map(({_id,name,avatar}) =>({
                
                _id,
                name,
                avatar:avatar.url,
      
            })),
            creator:{
                name:creator?.name||"none",
                avatar:creator?.avatar.url||"none",
            },
            totalmembers: members.length,
            totalMessages,
        }
    }));

    return res.status(200).json({
        success: true,
        chats: transformedChats,
    });
});

export const getAllMessages= asyncHandler(async (req,res,next) => {

    const messages = await Message.find({})
    .populate("sender","name avatar")
    .populate("chat","groupChat");

    const transformedmessages = messages.map(({content,attachments,_id,sender,createdAt, chat})=>({
        _id,
        content,
        attachments,
        sender:{
            _id: sender._id,
            name:sender.name,
            avatar:sender.avatar.url,
        },
        createdAt,
        chat:chat._id,
        groupChat: chat.groupChat,
    }));

    return res.status(200).json({
        success: true,
        messages:transformedmessages,
    });
});

export const getAllStatus= asyncHandler(async (req,res,next) => {

    const [groupsCount,usersCount,messagesCount, totalChatsCount]= await Promise.all([
        Chat.countDocuments({groupChat:true}),
        User.countDocuments(),
        Message.countDocuments(),
        Chat.countDocuments(),
    ]);

    const today=new Date();

    const last7Days=new Date();
    last7Days.setDate(last7Days.getDate()-7);

    const last7DaysMessages = await Message.find({
        createdAt:{
            $gte:last7Days,
            $lte:today,
        }
    }).select("createdAt");

    const messages = new Array(7).fill(0);

    last7DaysMessages.forEach(message => {

        const index = (today.getTime() - message.createdAt.getTime())/(1000*60*60*24);

        const adjectIndex= Math.floor(index);

        messages[6-adjectIndex]++;
    })

    const status={
        groupsCount,
        usersCount,
        messagesCount,
        totalChatsCount,
        messagesChart:messages,
    }

    return res.status(200).json({
        success: true,
        status,
    });
});