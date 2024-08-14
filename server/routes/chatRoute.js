import { Router } from "express";
import { addMembers, deleteChat, getChatDetails, getMessages, getMyChat, getMyGroup, leaveGroup, newGroupChat, removeMember, renameGroup, sendAttachment } from "../contrllers/chatController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multer.js";

const router=Router();
router.post('/new',authMiddleware,newGroupChat);
router.get('/my',authMiddleware,getMyChat);
router.get('/my/group',authMiddleware,getMyGroup);
router.put('/addmenbers',authMiddleware, addMembers) 
router.delete('/removemenbers',authMiddleware,removeMember)//2:57
router.delete('/leave/:id',authMiddleware,leaveGroup) //2:59
router.get('/message/:id',authMiddleware,getMessages)//3:41//3:48
router.post('/message',authMiddleware,upload.array("files",10),sendAttachment);//3:12

router.route("/:id")
.get(authMiddleware,getChatDetails)//3:19
.put(authMiddleware,renameGroup)//3:24
.delete(authMiddleware,deleteChat);//3:33
export default router;