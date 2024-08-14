// import jwt from "jsonwebtoken";
// import AppError from "../utils/AppError.js";
// import asyncHandler from "./asyncHandler.js";
// export const authMiddleware =asyncHandler(async (req, res , next) =>{

//     const {token} = req.cookies;
     
//     if(!token){
//         return next(new AppError('unauthorized',401));
//     }
    
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     if(!decoded){
//         return next(new AppError('unauthorized',401));
//     }
//     req.user = decoded;
//     next();
    
    
// });

import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userSchema.js";

export const authMiddleware = asyncHandler(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new AppError('Unauthorized', 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return next(new AppError('Unauthorized', 401));
        }

        req.user = decoded.id;
        next();
    } catch (err) {
        return next(new AppError('Unauthorized', 401));
    }
});

export const adminAuthMiddleware =asyncHandler(async (req, res , next) =>{

    const token = req.cookies["admin-token"];
     
    if(!token){
        return next(new AppError('unauthorized',401));
    }
    
    const secretKey = jwt.verify(token, process.env.JWT_SECRET);

    const adminSecretKey=process.env.ADMIN_SECRET_KEY|| "100rabh_raaz";
    const isMatch= secretKey===adminSecretKey;

    if(!isMatch) {
        return next(new AppError('unauthorized',401));
    }

    next();
    
    
});

export const socketAuthentication=async(err,socket,next)=>{
 try{
    if(err) return next(err);
    const authToken = socket.request.cookies.token;

    if(!authToken) return next(new Error('unauthorized',401));

    const decoded =jwt.verify(authToken, process.env.JWT_SECRET);

    const user= await User.findById(decoded.id);

    if(!user) return next(new Error('unauthorized 3',401));

    socket.user= user;

    return next();

 } catch(e){
    console.log(e);
    return next(new AppError('please login to acces this route',401));
 }
}

