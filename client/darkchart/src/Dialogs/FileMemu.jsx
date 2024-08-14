// import { ListItemText, Menu, MenuItem, MenuList, Tooltip } from '@mui/material'
// import React, { useRef } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { setIsSetMenu, setUploading } from '../redux/missSclice'
// import { AudioFile, Image, UploadFile, VideoFile } from '@mui/icons-material'
// import toast from 'react-hot-toast'
// import { sendAttachments } from '../redux/chatSlice'


// const FileMemu = ({anchor}) => {
//   const {isSetMenu}=useSelector((state)=>state.miss)
//  const dispatch = useDispatch()
// const onCloseMenu=()=>dispatch(setIsSetMenu(false))

// const imageRef= useRef();
// const fileRef= useRef();
// const videoRef= useRef();
// const audioRef= useRef();

// const selectImage=()=> imageRef.current?.click()

// const selectVideo=()=> videoRef.current?.click()

// const selectAudio=()=> audioRef.current?.click()

// const selectFile=()=> fileRef.current?.click()

// const fileChangeHandler=async(e,key)=>{
//     const files = Array.from(e.target.files);

//     if(files.length<=0)return

//     if(files.length>10)return toast.error(`you only select 10 ${key} files`);

//     dispatch(setUploading(true))
//     const toastId = toast.loading(`sending ${key}...`)
//     onCloseMenu()
//     try{

//       const myForm = new FormData();

//       myForm.append("chatId",chatId);
//       files.forEach((file)=>myForm.append("files",file));
//       const res=await dispatch(sendAttachments(myForm))

//       if(res.data) toastId.success(`${key} send successfully`,{id:toastId})
//       else toastId.error(`Error while sending ${key}`,{id:toastId})

//     }catch(error){
//       toast.error(error,{id:toastId});
//     }finally{
//       dispatch(setUploading(false))
//     }
// }   

//   return <Menu anchorEl={anchor} open={isSetMenu} onClose={onCloseMenu}>
//     <div
//     style={{
//       width:"10rem",
//       margin:"0%",
//     }}>
//     <MenuList>
//       <MenuItem onClick={selectImage}>
//         <Tooltip title="image">
//           <Image/>
//         </Tooltip>
//         <ListItemText style={{marginLeft:"0.5rem",marginRight:"1rem"}}>Image</ListItemText>
//         <input type="file"
//          multiple 
//          accept='image/png,image/jpeg,image/gif'
//          style={{display:"none"}}
//          onChange={(e)=>fileChangeHandler(e,"image")}
//          ref={imageRef}
//          />
//       </MenuItem>
//       <MenuItem onClick={selectFile}>
//         <Tooltip title="file">
//           <UploadFile/>
//         </Tooltip>
//         <ListItemText style={{marginLeft:"0.5rem",marginRight:"1rem"}}>Files</ListItemText>
//         <input type="file"
//          multiple 
//          accept='*'
//          style={{display:"none"}}
//          onChange={(e)=>fileChangeHandler(e,"Files")}
//          ref={fileRef}
//          />
//       </MenuItem>
//       <MenuItem onClick={selectAudio}>
//         <Tooltip title="audio">
//           <AudioFile/>
//         </Tooltip>
//         <ListItemText style={{marginLeft:"0.5rem",marginRight:"1rem"}}>audio</ListItemText>
//         <input type="file"
//          multiple 
//          accept='audio/mpeg,audio/wav'
//          style={{display:"none"}}
//          onChange={(e)=>fileChangeHandler(e,"Audios")}
//          ref={audioRef}
//          />
//       </MenuItem>
//       <MenuItem onClick={selectVideo}>
//         <Tooltip title="video">
//           <VideoFile/>
//         </Tooltip>
//         <ListItemText style={{marginLeft:"0.5rem",marginRight:"1rem"}}>Videos</ListItemText>
//         <input type="file"
//          multiple 
//          accept='video/mp4,video/webm,video/ogg'
//          style={{display:"none"}}
//          onChange={(e)=>fileChangeHandler(e,"videos")}
//          ref={videoRef}
//          />
//       </MenuItem>
//     </MenuList>
    
//     </div>
    
//   </Menu>
// }

// export default FileMemu

import { ListItemText, Menu, MenuItem, MenuList, Tooltip } from '@mui/material'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsSetMenu, setUploading } from '../redux/missSclice'
import { AudioFile, Image, UploadFile, VideoFile } from '@mui/icons-material'
import toast from 'react-hot-toast'
import { sendAttachments } from '../redux/chatSlice'

const FileMemu = ({ anchor,chatId }) => {
  const { isSetMenu } = useSelector((state) => state.miss)
  const dispatch = useDispatch()

  const onCloseMenu = () => dispatch(setIsSetMenu(false))

  const imageRef = useRef();
  const fileRef = useRef();
  const videoRef = useRef();
  const audioRef = useRef();

  const selectImage = () => imageRef.current?.click()
  const selectVideo = () => videoRef.current?.click()
  const selectAudio = () => audioRef.current?.click()
  const selectFile = () => fileRef.current?.click()

  const fileChangeHandler = async (e, key) => {
    const files = Array.from(e.target.files);

    if (files.length <= 0) return

    if (files.length > 10) return toast.error(`You can only select up to 10 ${key} files`);

    dispatch(setUploading(true))
    const toastId = toast.loading(`Sending ${key}...`)
    onCloseMenu()
    try {
      const myForm = new FormData();
      myForm.append("chatId", chatId);
      files.forEach((file) => myForm.append("files", file));
  console.log("files",files)
      const res = await dispatch(sendAttachments(myForm)).unwrap()

      if (res.data) {
        toast.success(`${key} sent successfully`, { id: toastId })
      } else {
        toast.error(`Error while sending ${key}`, { id: toastId })
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`, { id: toastId });
    } finally {
      dispatch(setUploading(false))
    }
  }

  return (
    <Menu anchorEl={anchor} open={isSetMenu} onClose={onCloseMenu}>
      <div style={{ width: "10rem", margin: "0%" }}>
        <MenuList>
          <MenuItem onClick={selectImage}>
            <Tooltip title="image">
              <Image />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem", marginRight: "1rem" }}>Image</ListItemText>
            <input
              type="file"
              multiple
              accept='image/png,image/jpeg,image/gif'
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "image")}
              ref={imageRef}
            />
          </MenuItem>
          <MenuItem onClick={selectFile}>
            <Tooltip title="file">
              <UploadFile />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem", marginRight: "1rem" }}>Files</ListItemText>
            <input
              type="file"
              multiple
              accept='*'
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Files")}
              ref={fileRef}
            />
          </MenuItem>
          <MenuItem onClick={selectAudio}>
            <Tooltip title="audio">
              <AudioFile />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem", marginRight: "1rem" }}>Audio</ListItemText>
            <input
              type="file"
              multiple
              accept='audio/mpeg,audio/wav'
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Audios")}
              ref={audioRef}
            />
          </MenuItem>
          <MenuItem onClick={selectVideo}>
            <Tooltip title="video">
              <VideoFile />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem", marginRight: "1rem" }}>Videos</ListItemText>
            <input
              type="file"
              multiple
              accept='video/mp4,video/webm,video/ogg'
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "videos")}
              ref={videoRef}
            />
          </MenuItem>
        </MenuList>
      </div>
    </Menu>
  )
}

export default FileMemu
