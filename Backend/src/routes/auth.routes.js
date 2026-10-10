import express from "express";
import {
  forgetPassword,
  login,
  logout,
  resetPassword,
  signup,
  updateProfile,
  verifySignup,
} from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
// import arcjetProtection from "../middleware/arcjet.middleware.js";

import multer, { memoryStorage } from "multer";
const upload = multer({
  storage: memoryStorage(),
});

const authRoutes = express.Router();
// authRoutes.use(arcjetProtection)

authRoutes.post("/signup", signup);
authRoutes.post("/verify", verifySignup);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.post("/forget-password", forgetPassword);
authRoutes.post("/forget-password/:token", resetPassword);

authRoutes.put(
  "/update-profile",
  protectRoute,
  upload.single("profilepic"),
  updateProfile,
);
authRoutes.get("/me", protectRoute, (req, res) => {
  const user = req.user;
  res.status(200).json({
    user,
  });
});

export default authRoutes;
