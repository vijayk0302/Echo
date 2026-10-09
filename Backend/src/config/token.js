import jwt from "jsonwebtoken";
import { ENV } from "../lib/env.js";

export const generateToken = (id, res) => {
  const { JWT_SECRET } = ENV;

  try {
    const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
      secure: ENV.NODE_ENV === "production",
      path: "/",
    });

    return token;
  } catch (error) {
    console.log(error);
  }
};
