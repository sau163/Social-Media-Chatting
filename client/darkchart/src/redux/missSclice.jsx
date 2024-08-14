import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isMobile: false,
    isSearch: false,
    isNotifications: false,
    isNewGroups: false,
    isSetMenu: false,
    uploading: false,
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

        logedout:(state)=>{
            state.isMobile=false;
            state.isSearch=false;
            state.isNotifications=false;
            state.isNewGroups=false;
        }
        
        
    }

})

export const {setIsMobile,setIsNotifications,setIsSearch,setIsNewGroups,logedout,setIsSetMenu,setUploading}=missSclice.actions
export default missSclice;