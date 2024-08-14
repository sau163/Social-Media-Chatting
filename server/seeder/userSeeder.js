import { getRounds } from "bcrypt";
import Chat from "../models/chat.js";
import User from "../models/userSchema.js";
import { faker, simpleFaker } from '@faker-js/faker';
import Message from "../models/message.js";

const createUsers = async (numUsers) => {
    try {
        const usersPromise = [];

        for (let i = 0; i < numUsers; i++) {
            const tempUser = User.create({
                name: faker.name.fullName(),
                userName: faker.internet.userName(),
                email: faker.internet.email(),
                password: "password",
                avatar: {
                    public_id: faker.system.fileName(),
                    url: faker.image.avatar()
                }
            });
            usersPromise.push(tempUser);
        }

        await Promise.all(usersPromise);
        console.log("User created", numUsers);
       // process.exit(1);
    } catch (e) {
        console.log(e);
       // process.exit(1);
    }
};

const createSingleChats = async(numChats)=>{
    try{
        const users = await User.find().select("_id");

        const chatsPromise = [];
        for(let i=0;i<users.length ;i++){
            for(let j=i+1;j<users.length;j++){
                chatsPromise.push(
                    Chat.create({
                        name: faker.lorem.words(2),
                        members:[users[i],users[j]]
                    })
                )
            }
            }
        await Promise.all(chatsPromise);
        console.log("Chats created", numChats);
    }catch (e) {
        console.log(e);
       // process.exit(1);
    }

};

const createGroupChats= async (numChats) => {

    try {
        const users = await User.find().select("_id");

        const chatsPromise = [];
        for (let i = 0; i < users.length; i++) {
            
            const numMembers=simpleFaker.number.int({min:3,max:users.length});
            const members = [];
            for (let j = 0; j < numMembers; j++) {
                
                const randomIndex=Math.floor(Math.random()*users.length);
                const randomUser = users[randomIndex];

                if (!members.includes(randomUser)) {
                    members.push(randomUser);
                }
            }
            const chat = Chat.create({
                groupChat : true,
                name: faker.lorem.words(1),
                creator: members[0],
                members,
        })
        }
        await Promise.all(chatsPromise);
        console.log("Chats created", numChats);
    } catch (e) {
        console.log(e);
       // process.exit(1);
    }
}

const createMessages = async (numMessages) => { 

    try {
        const users = await User.find().select("_id");
        const chats = await Chat.find().select("_id");

        const messagesPromise = [];
        for (let i = 0; i <numMessages; i++) {
            const randomUser=users[Math.floor(Math.random()*users.length)];
            const randomChat=chats[Math.floor(Math.random()*chats.length)];

            messagesPromise.push(
                Message.create({
                    chat: randomChat,
                    sender: randomUser,
                    content: faker.lorem.sentence(),
                })
            )
        }
        await Promise.all(messagesPromise);
        console.log("Messages created", numMessages);
    } 
catch (e) {
    console.log(e);
   // process.exit(1);
}     
 }

const createMessagesInAChat= async (chatId, numMessages) => {

    try{
        const users = await User.find().select("_id");
        
        const messagesPromise = [];

        for (let i = 0; i <numMessages; i++) {
            const randomUser=users[Math.floor(Math.random()*users.length)];

            messagesPromise.push(
                Message.create({
                    chat: chatId,
                    sender: randomUser,
                    content: faker.lorem.sentence(),
                })
            )
    
    }
    await Promise.all(messagesPromise);
    console.log("Messages created", numMessages);

}catch (e){
    console.log(e);
   // process.exit(1);
}
}
export {createUsers,createSingleChats,createGroupChats,createMessages,createMessagesInAChat};
