import { Router } from "express";
import { acceptRequest, getFriends, getNotification, loginUser, logoutUser, myProfile, newUser, searchUser, sendRequest } from "../contrllers/userController.js";
import {upload} from "../middlewares/multer.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/login", loginUser);
router.post("/signup",upload.single("avatar"), newUser);
router.get("/profile",authMiddleware, myProfile);
router.post("/logout",authMiddleware,logoutUser);

router.get("/search",authMiddleware,searchUser);//4:29
router.put("/sendrequest",authMiddleware,sendRequest);//4:45:50
router.put("/acceptrequest",authMiddleware,acceptRequest);//4:59
router.get("/notification",authMiddleware,getNotification);//4:56
router.get("/friends",authMiddleware,getFriends);
export default router;