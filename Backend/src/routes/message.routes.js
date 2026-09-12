import express from "express";

const messageRoutes = express.Router();

messageRoutes.get("/send", (req, res) => {
  res.send("msg send endpoint");
});


export default messageRoutes;
