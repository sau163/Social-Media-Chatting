// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axiosInstance from "../constants/axiosInstance";

// const initialState={
//     users:[],
// }

// export const getSearchUsers = createAsyncThunk('/users/getSearchUsers',async(name)=>{
//     try {
//         const response = await axiosInstance.get(`/user/search?name=${name}`);
//         return (await response).data;
//     } catch (error) {
//         console.log(error);
//         toast.error(error.message);
//     }
//  });
// const usersSlice= createSlice({
//     name:"users",
//     initialState:[],
//     reducers:{},
//     extraReducers:(builder)=>{
//         builder.
//         addCase(getSearchUsers.fulfilled, (state,action)=>{
//             state.users=[...action.payload];
//         })
//     }
        
    
//  });
//  export default usersSlice;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../constants/axiosInstance";
import toast, { Toaster } from 'react-hot-toast';

const initialState = {
    users: [],
    notification:{},
};

export const getSearchUsers = createAsyncThunk('/users/getSearchUsers', async (name, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/user/search?name=${name}`);
        return response.data.users;
    } catch (error) {
        console.log(error);
        toast.error(error.message);
        return rejectWithValue(error.message);
    }
});

// export const sendFriendRequest = createAsyncThunk('/users/getSearchUsers', async (data) => {
//     try {
//         console.log('userId', data);
//         const response = await axios.put("http://localhost:3002/api/v1/user/sendrequest",data);
//         toast.promise(response, {
//             loading: 'Wait! request is sending .....',
//             success: (response) => response.data.message,
//             error: 'Failed to send friend request'
//         });
//         return response;
//     } catch (error) {
//         console.log(error);
//         toast.error(error.message);
//         return rejectWithValue(error.message);
//     }
// });

export const sendFriendRequest = createAsyncThunk('/users/sendFriendRequest', async (userId) => {
    try {
        const response = await axiosInstance.put('/user/sendrequest',  userId ); // Corrected URL and payload
        toast.success(response.data.message);
    } catch (error) {
        console.log(error);
        toast.error("request allredy send");
        throw error; // Ensure error is thrown for createAsyncThunk to handle
    }
});

export const getAllNotifications = createAsyncThunk('/user/getAllNotifications', async () => {
    try {
        const response = await axiosInstance.get('/user/notification');
        return response.data.sender;
    } catch (error) {
        console.log(error);
        toast.error(error.message);
        return rejectWithValue(error.message);
    }
});
export const acceptRequest = createAsyncThunk('/users/acceptRequest',async(data)=>{
    try {
        console.log('userId', data);
        const response = await axiosInstance.put('/user/acceptrequest',data);
        console.log("jchsvhcb",response)
        toast.success(response.data.message);
        //return response;
    } catch (error) {
        console.log(error);
        toast.error(error.message);
        throw error; // Ensure error is thrown for createAsyncThunk to handle
    }
})

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSearchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(getSearchUsers.rejected, (state, action) => {
                state.users = [];
            })
            .addCase(getAllNotifications.fulfilled, (state, action) => {
                state.notification = action.payload;
            })
    }
});

export default usersSlice.reducer;
