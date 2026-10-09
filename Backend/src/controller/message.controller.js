import { getReceiverSocketId } from "../../index.js";
import { areMutualFollowers } from "../lib/areMutualFollowers.js";
import Conversation from "../model/conversation.js";
import Message from "../model/Message.js";
import User from "../model/User.js";
import sendImage from "../Service/Storage.services.js";
import {io} from '../../index.js'

export const getInbox = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;

    const conversations = await Conversation.find({
      participants: loggedInUserId,
    })
      .populate({
        path: "participants",
        select: "username profilepic ",
      })
      .populate({
        path: "lastMessage",
        select: "text image senderId receiverId createdAt",
      })
      .sort({ updatedAt: -1 });

    const inbox = conversations.map((conversation) => {
      const otherUser = conversation.participants.find((participant) => {
        return participant._id.toString() !== loggedInUserId.toString();
      });

      return {
        conversationId: conversation._id,
        user: otherUser,
        lastMessage: conversation.lastMessage,
        updatedAt: conversation.updatedAt,
      };
    });

    res.status(200).json({
      message: "Inbox fetched successfully",
      inbox,
    });
  } catch (error) {
    console.log("Error in getAllcontact :", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getMessageById = async (req, res) => {
  try {
    const loggedInId = req.user.id;
    const { senderId } = req.params;

    const conversation = await Conversation.findOne({
      participants: { $all: [loggedInId, senderId] },
    });

    if (!conversation) {
      return res.status(400).json({
        message: "unable to get messages",
      });
    }

    const messages = await Message.find({
      conversationId: conversation._id,
    }).sort({ createdAt: 1 });
    res.status(200).json({
      message: "messages fetch successfully",
      messages,
    });
  } catch (error) {
    console.log("Error in getting chat :", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const image = req.file;

    const senderId = req.user.id;

    const receiverId = req.params.id;

    const receiverExists = await User.exists({ _id: receiverId });

    if (!receiverExists) {
      return res.status(404).json({
        message: "receiver not found",
      });
    }

    if (!text && !image) {
      return res.status(400).json({
        message: "Text or image is required",
      });
    }

    if (senderId.toString() === receiverId.toString()) {
      return res.status(400).json({
        message: "you can not send message to you",
      });
    }

    let imageUrl = null;

    if (image) {
      const result = await sendImage(image.buffer.toString("base64"));
      imageUrl=result.url
    }

    const isMutual = await areMutualFollowers(senderId, receiverId);

    if (!isMutual) {
      return res.status(400).json({
        message: "You must follow each other",
      });
    }

    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      conversationId: conversation._id,
      senderId,
      receiverId,
      text: text,
      image: imageUrl,
    });

    conversation.lastMessage = newMessage._id;

    await conversation.save();

    // TODO: Send message in real time using Socket.IO

    const receiverSocketId=getReceiverSocketId(receiverId)
    
    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage",newMessage)
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in send chat :", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
