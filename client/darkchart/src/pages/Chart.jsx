
// import { AttachFile, Send } from '@mui/icons-material';
// import { IconButton, Stack } from '@mui/material';
// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import FileMemu from '../Dialogs/FileMemu';
// import Homelayout from '../components/Layout/Homelayout';
// import MessageComponent from '../components/shared/MessageComponent';
// import { chatDetails, getMessages } from '../redux/chatSlice';
// import { useSocket } from '../socket';
// import { useParams } from 'react-router-dom';
// import { NEW_MESSAGE } from '../constants/events';
// import { useInfiniteScrollTop } from '6pp';
// //import { useSocketEvent } from '../lib/features';

// function Chat() {
//   const containerRef = useRef(null);
//   const dispatch = useDispatch();
//   const params = useParams();
//   const chatId = params.chatId;

//   const { chatDetail } = useSelector((state) => state.chat);
//   const { data } = useSelector((state) => state.auth);
//   const {oldMessages}=useSelector((state) => state.chat);
//  //console.log(oldMessages?.messages);
//   const socket = useSocket();

//   const [message, setMessage] = useState("");

//   const [messages, setMessages] = useState([]);

//   const [page, setPage] = useState(1);
 
//   const getMessagesHandler = (chatId)=>{
//     dispatch(getMessages({chatId,page}))
//   }


//   const getChatdetails = useCallback((chatId) => {
//     dispatch(chatDetails({ chatId }));
//   }, [dispatch]);

//   useEffect(() => {
//     getChatdetails(chatId);
//     getMessagesHandler(chatId);
//   }, [chatId]);

 


// // Handle new message event
// // const handleMessageReceived = useCallback((data) => {
// //   const newMessage = data.message;
// //   if (!messages.some(msg => msg._id === newMessage._id)) {
// //     setMessages(prevMessages => [...prevMessages, newMessage]);
// //   }
// // }, [messages]);

// //   // Event handler object
// //   const eventHandlers = {
// //     [NEW_MESSAGE]: handleMessageReceived
// //   };

// //   // Register socket event
// //   useSocketEvent(socket, eventHandlers);

// useEffect(()=>{
//   socket.on(NEW_MESSAGE,(data)=>{
//     const newMessage = data.message;
//     if (!messages.some(msg => msg._id === newMessage._id)) {
//       setMessages(prevMessages => [...prevMessages, newMessage]);
//     }
//     // console.log(data);
//     // setMessages(prevMessages => [...prevMessages, data.message]);
//     // console.log(prevMessages);
//   })
// },[])

// console.log(oldMessages?.totalpages)
// console.log(oldMessages?.messages)
// console.log(page)


// const {datas:oldData,setDatas:setOldData} =
// useInfiniteScrollTop( 
//   containerRef,
//   oldMessages?.totalpages,
//   page,
//   setPage,
//   oldMessages?.messages,

// );
// console.log("data",oldData)

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!message.trim()) return; // Check if message is empty or only whitespace
//     socket.emit("NEW_MESSAGE", { chatId, members: chatDetail.members, message });
//     setMessage("");
//   };

//   return (
//     <Homelayout>
//       <Stack
//         ref={containerRef}
//         boxSizing="border-box"
//         padding="1rem"
//         spacing="1rem"
//         bgcolor="#e4f5f5"
//         height="85%"
//         sx={{
//           overflowX: "hidden",
//           overflowY: 'scroll',
//           '&::-webkit-scrollbar': { display: 'none' },
//           msOverflowStyle: 'none',
//           scrollbarWidth: 'none'
//         }}
//       >{
//         oldMessages?.messages&& 
//         oldMessages.messages.map((i, index) => (
//           <MessageComponent key={`${i._id}-${index}`} message={i} user={data} />
//         ))
//       }
//         {messages.map((i, index) => (
//           <MessageComponent key={`${i._id}-${index}`} message={i} user={data} />
//         ))}
//       </Stack>
//       <form
//         style={{ height: "12%" }}
//         onSubmit={handleSubmit}
//       >
//         <Stack
//           direction="row"
//           height="100%"
//           padding="1rem"
//           alignItems="center"
//           position="relative"
//         >
//           <IconButton
//             sx={{
//               position: "absolute",
//               left: "1.5rem",
//             }}
//           >
//             <AttachFile />
//           </IconButton>
//           <input
//             placeholder='Type your Message....'
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             style={{
//               height: "100%",
//               width: "100%",
//               padding: "0 3rem",
//               borderRadius: "1.5rem",
//               backgroundColor: "white",
//               border: "none",
//               outline: "none",
//             }}
//           />
//           <IconButton
//             type='submit'
//             sx={{
//               backgroundColor: "#2a9cc9",
//               height: "97%",
//               width: "5%",
//               marginLeft: "0.5rem",
//             }}
//           >
//             <Send />
//           </IconButton>
//         </Stack>
//       </form>
//       <FileMemu />
//     </Homelayout>
//   );
// }

// export default React.memo(Chat);

import { AttachFile, Send } from '@mui/icons-material';
import { IconButton, Stack } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileMemu from '../Dialogs/FileMemu';
import Homelayout from '../components/Layout/Homelayout';
import MessageComponent from '../components/shared/MessageComponent';
import { chatDetails, getMessages } from '../redux/chatSlice';
import { useSocket } from '../socket';
import { useParams } from 'react-router-dom';
import { NEW_MESSAGE } from '../constants/events';
import { useInfiniteScrollTop } from '6pp';
import { setIsSetMenu } from '../redux/missSclice';
//import { useSocketEvent } from '../lib/features';

function Chat() {
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const params = useParams();
  const chatId = params.chatId;

  const { chatDetail } = useSelector((state) => state.chat);
  const { data } = useSelector((state) => state.auth);
  const { oldMessages } = useSelector((state) => state.chat);
 
  const socket = useSocket();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenu, setFileMenu] = useState(null)

  const getMessagesHandler = (chatId) => {
    dispatch(getMessages({ chatId, page }));
  };

  const getChatdetails = useCallback((chatId) => {
    dispatch(chatDetails({ chatId }));
  }, [dispatch]);

  useEffect(() => {
    getChatdetails(chatId);
    getMessagesHandler(chatId);
  }, [chatId]);

  // const {datas,setDatas}=useInfiniteScrollTop(
  //   containerRef,
  //   oldMessages?.totalpages,
  //   page,
  //   setPage,
  //   oldMessages?.messages
  // );

  // console.log("data", datas);

  useEffect(() => {
    socket.on(NEW_MESSAGE, (data) => {
      const newMessage = data.message;
      if (!messages.some((msg) => msg._id === newMessage._id)) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });
  }, [messages, socket]);

  

  const scrollToBottom = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, oldMessages?.messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return; // Check if message is empty or only whitespace
    socket.emit("NEW_MESSAGE", { chatId, members: chatDetail.members, message });
    setMessage("");
  };

  const setIsmenuHandler=(e)=>{
    dispatch(setIsSetMenu(true))
    setFileMenu(e.currentTarget)
  }

  return (
    <Homelayout>
      <Stack
        ref={containerRef}
        boxSizing="border-box"
        padding="1rem"
        spacing="1rem"
        bgcolor="#e4f5f5"
        height="85%"
        sx={{
          overflowX: "hidden",
          overflowY: 'scroll',
          '&::-webkit-scrollbar': { display: 'none' },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none'
        }}
      >
        {oldMessages?.messages &&
          oldMessages.messages.map((i, index) => (
            <MessageComponent key={`${i._id}-${index}`} message={i} user={data} />
          ))
        }
        {messages.map((i, index) => (
          <MessageComponent key={`${i._id}-${index}`} message={i} user={data} />

        ))}
      </Stack>
      <form
        style={{ height: "12%" }}
        onSubmit={handleSubmit}
      >
        <Stack
          direction="row"
          height="100%"
          padding="1rem"
          alignItems="center"
          position="relative"
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
            }}
            onClick={setIsmenuHandler}
          >
            <AttachFile />
          </IconButton>
          <input
            placeholder='Type your Message....'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{
              height: "100%",
              width: "100%",
              padding: "0 3rem",
              borderRadius: "1.5rem",
              backgroundColor: "white",
              border: "none",
              outline: "none",
            }}
          />
          <IconButton
            type='submit'
            sx={{
              backgroundColor: "#2a9cc9",
              height: "97%",
              width: "5%",
              marginLeft: "0.5rem",
            }}
          >
            <Send />
          </IconButton>
        </Stack>
      </form>
      <FileMemu anchor={fileMenu} chatId={chatId} />
    </Homelayout>
  );
}

export default React.memo(Chat);


// import { AttachFile, Send } from '@mui/icons-material';
// import { IconButton, Stack } from '@mui/material';
// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import FileMemu from '../Dialogs/FileMemu';
// import Homelayout from '../components/Layout/Homelayout';
// import MessageComponent from '../components/shared/MessageComponent';
// import { chatDetails, getMessages } from '../redux/chatSlice';
// import { useSocket } from '../socket';
// import { useParams } from 'react-router-dom';
// import { NEW_MESSAGE } from '../constants/events';

// function Chat() {
//   const containerRef = useRef(null);
//   const topRef = useRef(null);
//   const dispatch = useDispatch();
//   const params = useParams();
//   const chatId = params.chatId;

//   const { chatDetail, oldMessages } = useSelector((state) => state.chat);
//   const { data } = useSelector((state) => state.auth);

//   const socket = useSocket();

//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [page, setPage] = useState(1);

//   const getMessagesHandler = useCallback((chatId, page) => {
//     dispatch(getMessages({ chatId, page }));
//   }, [dispatch]);

//   const getChatdetails = useCallback((chatId) => {
//     dispatch(chatDetails({ chatId }));
//   }, [dispatch]);

//   useEffect(() => {
//     getChatdetails(chatId);
//     getMessagesHandler(chatId, page);
//   }, [chatId, page, getChatdetails, getMessagesHandler]);

//   useEffect(() => {
//     socket.on(NEW_MESSAGE, (data) => {
//       const newMessage = data.message;
//       if (!messages.some((msg) => msg._id === newMessage._id)) {
//         setMessages((prevMessages) => [...prevMessages, newMessage]);
//       }
//     });

//     return () => {
//       socket.off(NEW_MESSAGE);
//     };
//   }, [messages, socket]);

//   useEffect(() => {
//     const container = containerRef.current;
//     const observer = new IntersectionObserver((entries) => {
//       if (entries[0].isIntersecting && page < oldMessages?.totalpages) {
//         setPage((prevPage) => prevPage + 1);
//       }
//     }, { threshold: 1 });

//     if (topRef.current) {
//       observer.observe(topRef.current);
//     }

//     return () => {
//       if (topRef.current) {
//         observer.unobserve(topRef.current);
//       }
//     };
//   }, [page, oldMessages]);

//   useEffect(() => {
//     const container = containerRef.current;
//     if (container) {
//       container.scrollTop = container.scrollHeight;
//     }
//   }, [messages, oldMessages]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!message.trim()) return; // Check if message is empty or only whitespace
//     socket.emit("NEW_MESSAGE", { chatId, members: chatDetail.members, message });
//     setMessage("");
//   };

//   return (
//     <Homelayout>
//       <Stack
//         ref={containerRef}
//         boxSizing="border-box"
//         padding="1rem"
//         spacing="1rem"
//         bgcolor="#e4f5f5"
//         height="85%"
//         sx={{
//           overflowX: "hidden",
//           overflowY: 'scroll',
//           '&::-webkit-scrollbar': { display: 'none' },
//           msOverflowStyle: 'none',
//           scrollbarWidth: 'none'
//         }}
//       >
//         <div ref={topRef} />
//         {oldMessages?.messages &&
//           oldMessages.messages.map((i, index) => (
//             <MessageComponent key={`${i._id}-${index}`} message={i} user={data} />
//           ))
//         }
//         {messages.map((i, index) => (
//           <MessageComponent key={`${i._id}-${index}`} message={i} user={data} />
//         ))}
//       </Stack>
//       <form
//         style={{ height: "12%" }}
//         onSubmit={handleSubmit}
//       >
//         <Stack
//           direction="row"
//           height="100%"
//           padding="1rem"
//           alignItems="center"
//           position="relative"
//         >
//           <IconButton
//             sx={{
//               position: "absolute",
//               left: "1.5rem",
//             }}
//           >
//             <AttachFile />
//           </IconButton>
//           <input
//             placeholder='Type your Message....'
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             style={{
//               height: "100%",
//               width: "100%",
//               padding: "0 3rem",
//               borderRadius: "1.5rem",
//               backgroundColor: "white",
//               border: "none",
//               outline: "none",
//             }}
//           />
//           <IconButton
//             type='submit'
//             sx={{
//               backgroundColor: "#2a9cc9",
//               height: "97%",
//               width: "5%",
//               marginLeft: "0.5rem",
//             }}
//           >
//             <Send />
//           </IconButton>
//         </Stack>
//       </form>
//       <FileMemu />
//     </Homelayout>
//   );
// }

// export default React.memo(Chat);
