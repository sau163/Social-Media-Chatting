import { useEffect } from "react";


export const fileFormat = (url) => {
    const fileExtension = url.split('.').pop().toLowerCase();
    if (fileExtension === 'mp4' || fileExtension === 'ogg' || fileExtension === 'webm') return 'video';
    if (fileExtension === 'mp3' || fileExtension === 'wav') return 'audio';
    if (fileExtension === 'jpg' || fileExtension === 'png' || fileExtension === 'gif' || fileExtension === 'jpeg') return 'image';
    return 'file';
  };
  
  export const transformImage = (url = '', width = 100) => url;

  // export const useSocketEvent=(socket ,eventHandler) =>{
  //   useEffect(()=>{
  //     Object.entries(eventHandler).forEach(([event,hendler])=>{
  //        socket.on(event,hendler);
  //     })
 
  //     return ()=>{
  //        Object.entries(eventHandler).forEach((event,hendler)=>{
  //          socket.off(event,hendler);
  //        })
  //     }
  //    },[socket,eventHandler]);
  // }
  