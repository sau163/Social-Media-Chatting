
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import chatReducer from './chatSlice';
import missSclice from './missSclice';
import usersReducer from './usersSlice';
import chat from './chat';
const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    miss: missSclice.reducer,
    users: usersReducer,
    chats:chat.reducer,
   
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
  devTools: true
});

export default store;
