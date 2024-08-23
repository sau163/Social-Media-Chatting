import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import {Server} from 'socket.io';
import {createServer} from 'http';
import {v4 as uuid} from 'uuid'
//import  { createUsers,createGroupChats, createSingleChats, createMessagesInAChat } from './seeder/userSeeder.js';
//import {createMessagesInAChat} from './seeder/userSeeder.js';
config(); // Load environment variables

const app = express();
const server = createServer(app);
const io = new Server(server,{
    cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
    },
});
app.set("io", io);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        credentials: true,
    })
);
//createUsers(10); // Ensure this is called once during initialization
// createSingleChats(10);
// createGroupChats(10);
//createMessagesInAChat("666a86461b76ccb813e3743a", 50);



app.use(morgan('dev'));
app.use(cookieParser());

import userRoute from './routes/userRoute.js';
import chatRoute from './routes/chatRoute.js';
import adminRoute from './routes/adminRoute.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from './contants/events.js';
import { getSockets } from './utils/features.js';
import Message from './models/message.js';
import { socketAuthentication } from './middlewares/authMiddleware.js';


app.use('/api/v1/user', userRoute);
app.use('/api/v1/chat', chatRoute);
app.use('/api/v1/admin', adminRoute);

app.get('/ping', (req, res) => {
    res.send('pong');
});


const userSocketId = new Map();

io.use((socket,next)=>{
    cookieParser()(socket.request, socket.request.res,async(err)=>{
      await  socketAuthentication(err,socket,next);
    })
})

io.on("connection",(socket)=>{

    const user=socket.user;
    //console.log(user); 
  //all user who is connected to the server 
    userSocketId.set(user._id.toString(),socket.id.toString());

    //console.log(userSocketId);

    socket.on(NEW_MESSAGE,async({chatId,members,message})=>{
        
        const messagesForRealTime={
            content:message,
            _id:uuid(),
            sender:{
                _id:user._id,
                name:user.name
            },
            chat:chatId,
            createdAt:new Date().toISOString(),
        };

        const messageForDB={
            content:message,
            sender:user._id,
            chat:chatId
        };

      // console.log("Emitting", messagesForRealTime)
        //console.log("members", members)
        // members of spesific group which is passs on members
        const userSocket = getSockets(members);

        //console.log("userSocket", userSocket);

        io.to(userSocket).emit(NEW_MESSAGE,
            {
            chat:chatId,
            message:messagesForRealTime
        });

        io.to(userSocket).emit(NEW_MESSAGE_ALERT, {chatId});

        try{
            await Message.create(messageForDB);
        }catch(e){
            console.log(e);
        }
        console.log(messagesForRealTime);
    })

    socket.on('disconnect',()=>{
        console.log('connection disconnected');
        userSocketId.delete(user._id.toString());
    })
})

app.use(errorMiddleware);

export  {app,server,userSocketId};