import express from "express";
// import arcjetProtection from "../middleware/arcjet.middleware.js";
import {
  getInbox,
  getMessageById,
  sendMessage,
} from "../controller/message.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
import multer, { memoryStorage } from "multer";
const upload = multer({
  storage: memoryStorage(),
});

const messageRoutes = express.Router();

messageRoutes.use(protectRoute);

messageRoutes.get("/inbox", getInbox);
messageRoutes.get("/inbox/:senderId", getMessageById);
messageRoutes.post("/send/:id", upload.single("image"), sendMessage);

export default messageRoutes;
