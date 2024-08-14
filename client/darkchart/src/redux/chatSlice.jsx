import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../constants/axiosInstance";
import toast from "react-hot-toast";
const initialState = {
    chatList:[],
    chatDetail:{},
    oldMessages:{}
}

export const getAllChat = createAsyncThunk("/chat/getAllChat", async () => {
    try {
        const response = axiosInstance.get("/chat/my");
        //console.log("single",(await response).data.chats);
        return (await response).data.chats;
    } catch(error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
})

export const getAllMyGropus = createAsyncThunk("/chat/getAllMyGroup", async () => {
    try {
        const response = axiosInstance.get("/chat/my/group");
        //console.log("group",(await response).data.chats)
        return (await response).data.chats;
        
    } catch(error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
})

export const chatDetails = createAsyncThunk(
    'chat/chatDetails',
    async ({ chatId, populate = false }) => {
       // console.log(chatId)
        try {
            let url = `chat/${chatId}`;
            if (populate) {
                url += "?populate=true";
            }
            const response = await axiosInstance.get(url, {
                withCredentials: true,
            });
            //console.log(response.data.chat);
            return response.data.chat;
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
            throw error;
        }
    }
);

export const getMessages= createAsyncThunk("/chat/getMessages",async({chatId,page})=>{
    try {
        const response = await axiosInstance.get(`/chat/message/${chatId}?page=${page}`);
     
        return (await response).data;
    } catch(error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
})

export const sendAttachments= createAsyncThunk("/chat/sendAttachments",async(data)=>{
    try {
        const response = await axiosInstance.post('/chat/message',data);
        console.log("ham hai",response.data);
        return (await response).data;
    } catch(error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
})

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        clearChatList: (state) => {
            state.chatList = [];
        }
    },
    extraReducers: (builder) => {
      builder
      .addCase(getAllChat.fulfilled, (state, action) => {
       
        if(action?.payload) {
            state.chatList=[...action.payload];
           // console.log("single2",state.chatList);
        }
      })
      .addCase(getAllMyGropus.fulfilled, (state, action) => {
       
        if(action?.payload) {
            state.chatList=[...action.payload];
           // console.log("group2",state.chatList);
        }
      })
      .addCase(chatDetails.fulfilled, (state, action) => {
        if(action?.payload){
            state.chatDetail = action.payload;
        }
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        if(action?.payload?.messages){
            state.oldMessages = {...state.oldMessages,...action.payload};
        }
      })
      .addCase(sendAttachments.fulfilled, (state, action) => {
        if(action?.payload){
            state.oldMessages = {...state.oldMessages,...action.payload};
        }
      })
      
    }
  })
  
  export const { clearChatList } = chatSlice.actions;

  export default chatSlice.reducer;


