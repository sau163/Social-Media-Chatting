
// import { Box, Stack, Typography } from "@mui/material";
// import React, { memo } from "react";
// import { Link } from "react-router-dom";

// const ChatItem =({
//     avatar=[],
//     name,
//     _id,
//     groupChat=false,
//     sameSender,
//     isOnline,
//     newMessages,
//     index=0,
//     handleDeleteChatOption,
// })=>{
//    return <Link to={`/chat/${_id}`}
//    oncontextmenu={(e)=>handleDeleteChatOption(e,_id,groupChat)}>
//     <div style={{
//         display: "flex",
//         gap:"1rem",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "1rem",
//     backgroundColor: sameSender? "skyblue" : "unset",
//     color: sameSender? "white" : "unset",
//     position:"relative",   
//     borderBottom: "1px solid #ccc",
//     }}>
//         {}
//         <Stack>
//             <Typography>{name}</Typography>
//             {newMessages&&(
//                 <Typography> {newMessages.count} New Meaasge</Typography>
//             )}
//         </Stack>
//         {
//             isOnline&&(
//                 <Box
//                     sx={{
//                         position: "absolute",
//                         top: "50%",
//                         right: "1rem",
//                         backgroundColor: "green",
//                         color: "white",
//                         padding: "0.25rem",
//                         borderRadius: "50%",
//                         fontSize: "0.75rem",
//                     }}
//                 />
//             )
//         }
//     </div>

//    </Link>
// }

// export default memo(ChatItem);

// import { Box, Stack, Typography } from "@mui/material";
// import React, { memo } from "react";
// import { Link } from "react-router-dom";

// const ChatItem = ({
//     avatar = [],
//     name,
//     _id,
//     groupChat = false,
//     sameSender,
//     isOnline,
//     newMessages,
//     index = 0,
//     handleDeleteChatOption,
// }) => {
//     return (
//         <Link to={`/chat/${_id}`}
//             onContextMenu={(e) => handleDeleteChatOption(e, _id, groupChat)}>
//             <div style={{
//                 display: "flex",
//                 gap: "1rem",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 padding: "1rem",
//                 backgroundColor: sameSender ? "#ddf3f5" : "unset", // Lighter background
//                 color: sameSender ? "black" : "unset", // Darker text
//                 position: "relative",
//                 borderBottom: "1px solid #ccc",
//             }}>
//                 <Stack>
//                     <Typography>{name}</Typography>
//                     {newMessages && (
//                         <Typography>{newMessages.count} New Message</Typography>
//                     )}
//                 </Stack>
//                 {isOnline && (
//                     <Box
//                         sx={{
//                             position: "absolute",
//                             top: "50%",
//                             right: "1rem",
//                             backgroundColor: "green",
//                             color: "white",
//                             padding: "0.25rem",
//                             borderRadius: "50%",
//                             fontSize: "0.75rem",
//                         }}
//                     />
//                 )}
//             </div>
//         </Link>
//     );
// }

// export default memo(ChatItem);


import React, { memo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ChatItem = ({
    avatar = "",
    name,
    _id,
    groupChat = false,
    sameSender,
    isOnline,
    newMessagesAlert,
    index = 0,
    handleDeleteChat,
}) => {
    return (
        <Link to={`/chat/${_id}`} style={{ textDecoration: 'none' }}>
            <div
                style={{
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.3rem",
                    backgroundColor: sameSender ? "#ddf3f5" : "white", // Lighter background for current chat
                    color: sameSender ? "black" : "black", // Darker text
                    position: "relative",
                    borderBottom: "1px solid #ccc",
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                    borderRadius: 8,
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dae8e8'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = sameSender ? "#ddf3f5" : "white"}
            >
                <Stack direction="row" alignItems="center" spacing={2} sx={{ width: '100%' }}>
                    <Box>
                        <img src={avatar} alt={name} style={{ width: 40, height: 40, borderRadius: '50%' }} />
                    </Box>
                    <Stack sx={{ flexGrow: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{name}</Typography>
                        {newMessagesAlert?.count > 0 && (
                            <Typography variant="body2" color="primary">
                                {newMessagesAlert.count} New Messages
                            </Typography>
                        )}
                    </Stack>
                    {isOnline && (
                        <Box
                            sx={{
                                backgroundColor: "green",
                                color: "white",
                                padding: "0.25rem",
                                borderRadius: "50%",
                                fontSize: "0.75rem",
                            }}
                        />
                    )}
                </Stack>
            </div>
        </Link>
    );
}

export default memo(ChatItem);
