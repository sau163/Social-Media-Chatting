import { createSlice } from "@reduxjs/toolkit";

const initialState={
    notificationCount:0,
}

const chats= createSlice({
    name:"chats",
    initialState,
    reducers:{
        incrementNotification:(state)=>{
            state.notificationCount+=1;
        },
        resetNotification:(state)=>{
            state.notificationCount=0;
        }
    }    
})

export const {incrementNotification,resetNotification}=chats.actions
export default chats;