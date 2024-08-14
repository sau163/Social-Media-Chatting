import React from 'react'
import { transformImage } from '../lib/features'
import { FileOpen } from '@mui/icons-material'

const RenderContent = (file,url) => {
  switch(file){
    case 'image':
      return <img src={transformImage(url,200)} alt="attachments" width={"200px"} height={"150px"} style={{objectFit:"contain"}} />
    case 'video':
      return <video src={url} preload='none' width={"200px"} controls />

    case 'audio':
    return <audio  src={url} preload='none' controls />

    default:
      return <FileOpen/>
  }
}

export default RenderContent
