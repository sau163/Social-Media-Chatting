import { Router } from "express";

import { adminLogin, adminLogout, getAdminData, getAllChat, getAllMessages, getAllStatus, getAllUsers } from "../contrllers/adminController.js";
import { adminAuthMiddleware } from "../middlewares/authMiddleware.js";


const router=Router();
router.post('/verify', adminLogin);
router.get('/logout',adminLogout);

router.get('/',adminAuthMiddleware,getAdminData);
router.get('/users',adminAuthMiddleware,getAllUsers);
router.get('/chats',adminAuthMiddleware,getAllChat);
router.get('/messages',adminAuthMiddleware,getAllMessages);
router.get('/status',adminAuthMiddleware,getAllStatus);


export default router;