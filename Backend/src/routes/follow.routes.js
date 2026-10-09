import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { followUser, unfollowUser } from "../controller/follow.controller.js";

const followRoutes = express.Router();

followRoutes.use(protectRoute)

followRoutes.put("/follow/:targetUserID",followUser)
followRoutes.put("/unfollow/:targetUserID",unfollowUser)


export default followRoutes;
