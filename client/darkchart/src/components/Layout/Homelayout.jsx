


// import React, { useEffect, useCallback, useMemo } from 'react';
// import Header from './Header';
// import { Drawer, Grid } from "@mui/material";
// import ChatLists from '../spacific/ChatLists';
// import { useParams } from 'react-router-dom';
// import Profile from '../spacific/Profile';
// import SearchComponent from '../spacific/Search';
// import Notification from '../spacific/Notification';
// import NewGroup from '../spacific/Newgroup';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllChat, getAllMyGropus } from '../../redux/chatSlice';
// import { getMyProfile } from '../../redux/authSlice';
// import { setIsMobile, setIsNewGroups, setIsNotifications, setIsSearch } from '../../redux/missSclice';
// import { getAllNotifications } from '../../redux/usersSlice';
// import { useSocket } from '../../socket';

// function Homelayout({ children }) {
//     const dispatch = useDispatch();

//     const { chatList } = useSelector((state) => state.chat);
//     const { data } = useSelector((state) => state.auth);
//     const { isLoading, isMobile, isSearch, isNewGroups, isNotifications } = useSelector((state) => state.miss);
//     const { notification } = useSelector((state) => state.users);
//     const params = useParams();
//     const chatId = params.chatId;

//     const socket = useSocket();

//     const handleFetchChatList = useCallback(async () => {
//         await dispatch(getAllChat());
//     }, [dispatch]);

//     const handleFetchMyGroups = useCallback(async () => {
//         await dispatch(getAllMyGropus());
//     }, [dispatch]);

//     const handleFetchMyProfile = useCallback(async () => {
//       dispatch(getMyProfile());
//     }, [dispatch]);

//     useEffect(() => {
//         handleFetchMyProfile();
//         handleFetchChatList();
//         handleFetchMyGroups();
//     }, []);

//     // useEffect(() => {
//     //     handleFetchChatList();
//     // }, [handleFetchChatList]);

//     // useEffect(() => {
//     //     handleFetchMyGroups();
//     // }, [handleFetchMyGroups]);

//     const handleMobileClose = () => {
//         dispatch(setIsMobile(false));
//     };
//     console.log("sdd")
//     const handleSearchClick = useCallback(() => {
//         dispatch(setIsSearch(true));
//     }, [dispatch]);

//     const handleNotificationClick = useCallback(() => {
//         return ()=>{
//             dispatch(getAllNotifications());
//         dispatch(setIsNotifications(true));
//         dispatch(setIsNewGroups(false));
//         }
//     }, [dispatch]);

//     const handleBackToProfile = useCallback(() => {
//         return ()=>{
//             dispatch(setIsNotifications(false));
//         dispatch(setIsNewGroups(false));
//         }
//     }, [dispatch]);

//     const handleNewGroupClick = useCallback(() => {
//         return () =>{
//             dispatch(setIsNewGroups(true));
//         dispatch(setIsNotifications(false));
//         }
//     }, [dispatch]);

//     const renderChildrenWithProps = useMemo(() => {
//         return React.Children.map(children, child => {
//             if (React.isValidElement(child)) {
//                 return React.cloneElement(child, { chatId });
//             }
//             return child;
//         });
//     }, [children, chatId]);

//     return (
//         <>
//             {isLoading ? (
//                 <h1>wait</h1>
//             ) : (
//                 <Drawer open={isMobile} onClose={handleMobileClose}>
//                     <ChatLists width="100vh" chats={chatList} chatId={chatId} />
//                 </Drawer>
//             )}
//             <Header 
//                 onSearchClick={handleSearchClick} 
//                 onNotificationClick={handleNotificationClick} 
//                 onNewGroupClick={handleNewGroupClick} 
//             />
//             <Grid container height={"calc(100vh - 4rem)"}>
//                 <Grid
//                     item
//                     sm={4}
//                     md={3}
//                     sx={{
//                         display: { xs: "none", sm: "block" }
//                     }}
//                     height={"100%"}>
//                     {isSearch ? <SearchComponent chatId={chatId} /> : <ChatLists chats={chatList} chatId={chatId} />}
//                 </Grid> 
//                 <Grid item xs={12} sm={8} lg={6} height={"100%"} bgcolor="#ddf3f5">
//                     {renderChildrenWithProps}
//                 </Grid>
//                 <Grid item md={4} lg={3} height={"100%"}
//                     sx={{
//                         display: { xs: "none", md: "block" },
//                         padding: "2rem",
//                         bgcolor: "#aad8d3"
//                     }}>
//                     {isNotifications ? (
//                         <Notification onBackClick={handleBackToProfile} notification={notification} chatId={chatId} />
//                     ) : (
//                         isNewGroups ? (
//                             <NewGroup onBackClick={handleBackToProfile} chatId={chatId} />
//                         ) : (
//                             <Profile user={data} chatId={chatId} />
//                         )
//                     )}
//                 </Grid>
//             </Grid>
//         </>
//     );
// }

// export default React.memo(Homelayout);


import React, { useEffect, useCallback, useMemo } from 'react';
import Header from './Header';
import { Drawer, Grid } from "@mui/material";
import ChatLists from '../spacific/ChatLists';
import { useParams } from 'react-router-dom';
import Profile from '../spacific/Profile';
import SearchComponent from '../spacific/Search';
import Notification from '../spacific/Notification';
import NewGroup from '../spacific/Newgroup';
import { useDispatch, useSelector } from 'react-redux';
import { getAllChat, getAllMyGropus } from '../../redux/chatSlice';
import { getMyProfile } from '../../redux/authSlice';
import { setIsMobile, setIsNewGroups, setIsNotifications,setIsSearch,incrementNotificationss, resetNotificationss, setNewMessagesAlert} from '../../redux/missSclice';
import { getAllNotifications } from '../../redux/usersSlice';
import { useSocket } from '../../socket';
import { NEW_MESSAGE_ALERT, NEW_REQUEST } from '../../constants/events';
import { incrementNotification } from '../../redux/chat';
function Homelayout({ children }) {
    const dispatch = useDispatch();
    const { chatList } = useSelector((state) => state.chat);
    const { data } = useSelector((state) => state.auth);
    const { isLoading, isMobile, isSearch, isNewGroups, isNotifications } = useSelector((state) => state.miss);
    const { notification } = useSelector((state) => state.users);
    const params = useParams();
    const chatId = params.chatId;
    const socket = useSocket();

    const handleFetchChatList = useCallback(async () => {
        await dispatch(getAllChat());
    }, [dispatch]);

    const handleFetchMyGroups = useCallback(async () => {
        await dispatch(getAllMyGropus());
    }, [dispatch]);

    const handleFetchMyProfile = useCallback(async () => {
      dispatch(getMyProfile());
    }, [dispatch]);

    useEffect(() => {
        handleFetchMyProfile();
        handleFetchChatList();
        handleFetchMyGroups();
    }, []);

    const handleMobileClose = () => {
        dispatch(setIsMobile(false));
    };

    const handleSearchClick = useCallback(() => {
        dispatch(setIsSearch(true));
    }, [dispatch]);

    const handleNotificationClick = useCallback(() => {
        dispatch(getAllNotifications());
        dispatch(setIsNotifications(true));
        dispatch(setIsNewGroups(false));
        dispatch(resetNotificationss())
    }, [dispatch]);

    const handleBackToProfile = useCallback(() => {
        dispatch(setIsNotifications(false));
        dispatch(setIsNewGroups(false));
    }, [dispatch]);

    const handleNewGroupClick = useCallback(() => {
        dispatch(setIsNewGroups(true));
        dispatch(setIsNotifications(false));
    }, [dispatch]);

    const renderChildrenWithProps = useMemo(() => {
        return React.Children.map(children, child => {
            if (React.isValidElement(child)) {
                return React.cloneElement(child, { chatId });
            }
            return child;
        });
    }, [children, chatId]);

    useEffect(() => {
        const newMassageAlertHandler = (data) => {
            dispatch(setNewMessagesAlert(data));
        };

        const newRequestHandler = () => {
            // Increment the notification count when a new request is received
            dispatch(incrementNotificationss());
        };

        if (socket) {
            socket.on(NEW_MESSAGE_ALERT, newMassageAlertHandler);
            socket.on(NEW_REQUEST, newRequestHandler);
        }

        // Cleanup the event listeners on unmount
        return () => {
            if (socket) {
                socket.off(NEW_MESSAGE_ALERT, newMassageAlertHandler);
                socket.off(NEW_REQUEST, newRequestHandler);
            }
        };
    }, [socket, dispatch]);

    return (
        <>
            {isLoading ? (
                <h1>wait</h1>
            ) : (
                <Drawer open={isMobile} onClose={handleMobileClose}>
                    <ChatLists width="100vh" chats={chatList} chatId={chatId} />
                </Drawer>
            )}
            <Header 
                onSearchClick={handleSearchClick} 
                onNotificationClick={handleNotificationClick} 
                onNewGroupClick={handleNewGroupClick} 
            />
            <Grid container height={"calc(100vh - 4rem)"}>
                <Grid
                    item
                    sm={4}
                    md={3}
                    sx={{
                        display: { xs: "none", sm: "block" }
                    }}
                    height={"100%"}>
                    {isSearch ? <SearchComponent chatId={chatId} /> : <ChatLists chats={chatList} chatId={chatId} />}
                </Grid> 
                <Grid item xs={12} sm={8} lg={6} height={"100%"} bgcolor="#ddf3f5">
                    {renderChildrenWithProps}
                </Grid>
                <Grid item md={4} lg={3} height={"100%"}
                    sx={{
                        display: { xs: "none", md: "block" },
                        padding: "2rem",
                        bgcolor: "#aad8d3"
                    }}>
                    {isNotifications ? (
                        <Notification onBackClick={handleBackToProfile} notification={notification} chatId={chatId} />
                    ) : (
                        isNewGroups ? (
                            <NewGroup onBackClick={handleBackToProfile} chatId={chatId} />
                        ) : (
                            <Profile user={data} chatId={chatId} />
                        )
                    )}
                </Grid>
            </Grid>
        </>
    );
}

export default React.memo(Homelayout);
