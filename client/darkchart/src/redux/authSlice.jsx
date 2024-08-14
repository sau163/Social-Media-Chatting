

// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axiosInstance from '../constants/axiosInstance';
// import toast from 'react-hot-toast';

// const initialState = {
//   isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false,
//   data: localStorage.getItem("data") || {}
 
// };

// export const login = createAsyncThunk("/auth/signin", async ({ data, navigate }, { rejectWithValue }) => {
//   try {
//       const responsePromise = axiosInstance.post("/user/login", data);
//       toast.promise(responsePromise, {
//           loading: 'Wait! Authenticating your account...',
//           success: (response) => response.data.message,
//           error: 'Failed to authenticate your account'
//       });
//       const response = (await responsePromise);
//       navigate('/');
//       return response;
//   } catch(error) {
//       console.log(error);
//       toast.error(error?.response?.data?.message);
//       return rejectWithValue(error.response.data);
//   }
// })

// export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
//   try {
//       const response = axiosInstance.post("user/signup", data);
//       toast.promise(response, {
//           loading: 'Wait! creating your account',
//           success: (data) => {
//               return data?.data?.message;
//           },
//           error: 'Failed to create your account'
//       });
//       return await response;
//   } catch(error) {
//       console.log(error);
//       toast.error(error?.response?.data?.message);
//   }
// })

// export const logout = createAsyncThunk("/auth/logout", async () => {
//   try {
//       const response = axiosInstance.post("user/logout");
//       toast.promise(response, {
//           loading: 'Wait! logging out your account',
//           success: (data) => {
//               return data?.data?.message;
//           },
//           error: 'Failed to logout your account'
//       });
//       return await response;
//   } catch(error) {
//       console.log(error);
//       toast.error(error?.response?.data?.message);
//   }
// })
// export const getMyProfile = createAsyncThunk("/user/getMyProfile", async () => {
//     try {
//         const response = axiosInstance.get("user/profile");
        
        
//         return (await response).data.data;
//     } catch(error) {
//         console.log(error);
//         toast.error(error?.response?.data?.message);
//     }
// })



// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//     .addCase(login.fulfilled, (state, action) => {
//       // localStorage.setItem("data", JSON.stringify(action.payload.user));
//         localStorage.setItem("isLoggedIn", 'true');
//         state.isLoggedIn = true;
//        // state.data = action.payload.user;
//     })
//     .addCase(login.rejected, (state) => {
//         state.isLoggedIn = false;
//     })
//     .addCase(logout.fulfilled, (state) => {
//       localStorage.clear();
//       state.isLoggedIn = false;
//       state.data = {};
//   })
//   .addCase(getMyProfile.fulfilled, (state, action) => {
//     state.data = action.payload; 
// })
// // .addCase(getMyProfile.rejected, (state) => {
// //     state.data = {}; // Reset user data if fetching profile fails
// // });
//   }
// })

// export default authSlice.reducer;


// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axiosInstance from '../constants/axiosInstance';
// import toast from 'react-hot-toast';

// const initialState = {
//   isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false,
//   data: JSON.parse(localStorage.getItem("data")) || {},
// };

// export const login = createAsyncThunk("/auth/signin", async ({ data, navigate }, { rejectWithValue }) => {
//   try {
//       const responsePromise = axiosInstance.post("/user/login", data);
//       toast.promise(responsePromise, {
//           loading: 'Wait! Authenticating your account...',
//           success: (response) => response.data.message,
//           error: 'Failed to authenticate your account'
//       });
//       const response = (await responsePromise);
//       navigate('/');
//       return response.data;
//   } catch(error) {
//       console.log(error);
//       toast.error(error?.response?.data?.message);
//       return rejectWithValue(error.response.data);
//   }
// });

// export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
//   try {
//       const response = axiosInstance.post("user/signup", data);
//       toast.promise(response, {
//           loading: 'Wait! creating your account',
//           success: (data) => {
//               return data?.data?.message;
//           },
//           error: 'Failed to create your account'
//       });
//       return await response;
//   } catch(error) {
//       console.log(error);
//       toast.error(error?.response?.data?.message);
//   }
// });

// export const logout = createAsyncThunk("/auth/logout", async () => {
//   try {
//       const response = axiosInstance.post("user/logout");
//       toast.promise(response, {
//           loading: 'Wait! logging out your account',
//           success: (data) => {
//               return data?.data?.message;
//           },
//           error: 'Failed to logout your account'
//       });
//       return await response;
//   } catch(error) {
//       console.log(error);
//       toast.error(error?.response?.data?.message);
//   }
// });

// export const getMyProfile = createAsyncThunk("/user/getMyProfile", async () => {
//     try {
//         const response = axiosInstance.get("user/profile");
//         return (await response).data.data;
//     } catch(error) {
//         console.log(error);
//         toast.error(error?.response?.data?.message);
//     }
// });

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//     .addCase(login.fulfilled, (state, action) => {
//         localStorage.setItem("isLoggedIn", 'true');
//         localStorage.setItem("data", JSON.stringify(action.payload.user));
//         state.isLoggedIn = true;
//         state.data = action.payload.user;
//     })
//     .addCase(login.rejected, (state) => {
//         state.isLoggedIn = false;
//     })
//     .addCase(logout.fulfilled, (state) => {
//         localStorage.clear();
//         state.isLoggedIn = false;
//         state.data = {};
//     })
//     .addCase(getMyProfile.fulfilled, (state, action) => {
//         state.data = action.payload; 
//     });
//   }
// });

// export default authSlice.reducer;


import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../constants/axiosInstance';
import toast from 'react-hot-toast';
import { clearChatList } from './chatSlice'; // Import the clearChatList action
import axios from 'axios';
import { logedout } from './missSclice';

const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false,
  data: JSON.parse(localStorage.getItem("data")) || {},
};

export const login = createAsyncThunk("/auth/signin", async ({ data, navigate }, { rejectWithValue }) => {
  try {
      const responsePromise = axiosInstance.post("/user/login", data);
      toast.promise(responsePromise, {
          loading: 'Wait! Authenticating your account...',
          success: (response) => response.data.message,
          error: 'Failed to authenticate your account'
      });
      const response = (await responsePromise);
      navigate('/');
      return response.data;
  } catch(error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error.response.data);
  }
});

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
      const response = axiosInstance.post("user/signup", data);
      toast.promise(response, {
          loading: 'Wait! creating your account',
          success: (data) => {
              return data?.data?.message;
          },
          error: 'Failed to create your account'
      });
      return await response;
  } catch(error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
  }
});

export const logout = createAsyncThunk("/auth/logout", async (_, { dispatch }) => {
  try {
      const response = axiosInstance.post("user/logout");
      toast.promise(response, {
          loading: 'Wait! logging out your account',
          success: (data) => {
              return data?.data?.message;
          },
          error: 'Failed to logout your account'
      });
      dispatch(logedout());
      dispatch(clearChatList()); // Dispatch the clearChatList action
      return await response;
  } catch(error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
  }
});

export const getMyProfile = createAsyncThunk("/user/getMyProfile", async () => {
    try {
        const response = axiosInstance.get("user/profile");
        return (await response).data.data;
    } catch(error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("isLoggedIn", 'true');
        localStorage.setItem("data", JSON.stringify(action.payload.user));
        state.isLoggedIn = true;
        state.data = action.payload.user;
    })
    .addCase(login.rejected, (state) => {
        state.isLoggedIn = false;
    })
    .addCase(logout.fulfilled, (state) => {
        window.onbeforeunload = function() {
            localStorage.clear();
         }
        state.isLoggedIn = false;
        state.data = {};
    })
    .addCase(getMyProfile.fulfilled, (state, action) => {
        state.data = action.payload; 
    });
  }
});

export default authSlice.reducer;
