import jwt from "jsonwebtoken";
import { ENV } from "../lib/env.js";

export const generateToken = (id,res) => {
  const { JWT_SECRET } = ENV;

  try {
    const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 601000,
      httpOnly: true,
      sameSite: "strict",
      secure: ENV.NODE_ENV === "production",
    });

    return token;
  } catch (error) {
    console.log(error);
  }
};
