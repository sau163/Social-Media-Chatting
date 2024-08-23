import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isMobile: false,
    isSearch: false,
    isNotifications: false,
    isNewGroups: false,
    isSetMenu: false,
    uploading: false,
    notificatinC:0,
    newMessagesAlert:[
        {
        chatId:"",
        count:0,
        }
    ]
}

const missSclice= createSlice({
    name:"miss",
    initialState,
    reducers:{
         setIsMobile:(state,action)=>{
                state.isMobile=action.payload;
        },
        setIsSearch:(state,action)=>{
            state.isSearch=action.payload;
         },
         setIsNotifications:(state,action)=>{
              state.isNotifications=action.payload;
        },
        setIsNewGroups:(state,action)=>{
            state.isNewGroups=action.payload;
        },
        setIsSetMenu:(state,action)=>{
            state.isSetMenu=action.payload;
        },
        setUploading:(state,action)=>{
            state.uploading=action.payload;
        },
        incrementNotificationss:(state)=>{
            state.notificatinC++;
        },
        resetNotificationss:(state)=>{
            state.notificatinC=0;
        },
        setNewMessagesAlert:(state,action)=>{
           const index = state.newMessagesAlert.findIndex(
            (item)=> item.chatId=== action.payload.chatId
           );
           if(index!==-1){
            state.newMessagesAlert[index].count+=1;
           }else{
            state.newMessagesAlert.push({
                chatId:action.payload.chatId,
                count:1,
           });
 
           }
        },

        logedout:(state)=>{
            state.isMobile=false;
            state.isSearch=false;
            state.isNotifications=false;
            state.isNewGroups=false;
        }
        
        
    }

})

export const {setIsMobile,setIsNotifications,setIsSearch,setIsNewGroups,logedout,setIsSetMenu,setUploading,incrementNotificationss,resetNotificationss,setNewMessagesAlert}=missSclice.actions
export default missSclice;