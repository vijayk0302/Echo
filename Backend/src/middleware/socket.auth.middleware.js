import jwt from "jsonwebtoken";
import { ENV } from "../lib/env.js";
import User from "../model/User.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    const rawCookies = socket.handshake.headers.cookie;
    const token = rawCookies.split("token=")[1];

    if (!token) {
      console.log("Socket connection rejected: No token provided");
      return next(new Error("Unauthorized - No token provided"));
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded) {
      console.log("socket connection rejected:invalid token");
      return next(new Error("unAuthorized - invalid token"));
    }

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      console.log("socket connection rejected:User not found");
      return next(new Error("User not found"));
    }

    socket.user = user;
    socket.userID = user._id.toString();

    console.log(
      `socket authenticated  for user ${user.fullname} and id ${user._id}`,
    );

    next();
  } catch (error) {
    console.log("Error in socket authentication :", error.message);
    next(new Error("unAuthorized:authenticated failed"));
  }
};
