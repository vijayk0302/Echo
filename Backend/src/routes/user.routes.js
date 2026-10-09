import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {getFollowersAndFollowing, getProfile, searchUsers} from '../controller/user.controller.js'


const userRoutes = express.Router();

userRoutes.use(protectRoute);
// authRoutes.use(arcjetProtection)

userRoutes.get("/search", searchUsers);
userRoutes.get("/getfollower/:id",getFollowersAndFollowing)
userRoutes.get("/getprofile-details/:id", getProfile);

export default userRoutes;
