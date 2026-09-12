import express from "express";

const authRoutes = express.Router();

authRoutes.get("/signup", (req, res) => {
  res.send("sign up endpoint");
});
authRoutes.get("/login", (req, res) => {
    res.send("login endpiont")
});

authRoutes.get("/logout", (req, res) => {
    res.send("logout endpoint")
});

export default authRoutes;
