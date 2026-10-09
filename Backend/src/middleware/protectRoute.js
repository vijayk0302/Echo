import jwt from "jsonwebtoken";
import { ENV } from "../lib/env.js";
import User from "../model/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    const  {token}  = req.cookies;
    
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized-Token invalid  exprired",
      });
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        message: "Unauthorized-Token invalid or exprired",
      });
    }

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    req.user=user

    next();

  } catch (error) {
    console.log("error in protect route middleware :",error)
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
