import { generateToken } from "../config/token.js";
import User from "../model/User.js";
import bcrypt from "bcryptjs";
import uploadFile from "../Service/Storage.service.js";
import EmailVerification from "../model/EmailVerification.js";
import { sendVerifcationCode } from "../Email/emailHandler.js";

export const signup = async (req, res) => {
  const { fullname, email, password, username } = req.body;
  try {
    if (!fullname || !email || !password || !username) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password should be atleast 6 characters long",
      });
    }

    const cleanusername = username.trim().toLowerCase();
    const cleanemail = email.trim();

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(cleanemail)) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }

    const isusernameexists = await User.findOne({
      $or: [{ username: cleanusername }, { email: cleanemail }],
    });

    if (isusernameexists) {
      return res.status(400).json({
        message: "Username or email already exists",
      });
    }

    await EmailVerification.deleteMany({
      $or: [{ username: cleanusername }, { email: cleanemail }],
    });

    const hashedpassword = await bcrypt.hash(password, 10);

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    const hashedcode = await bcrypt.hash(code, 10);

    const newUser = await EmailVerification.create({
      fullname,
      username: cleanusername,
      email: cleanemail,
      password: hashedpassword,
      code: hashedcode,
      expiresAt: new Date(Date.now() + 3 * 60 * 1000),
    });

    let url = "hello";

    try {
      await sendVerifcationCode(newUser.email, newUser.fullname, code);
    } catch (error) {
      console.log("fail to send welcome email", error);
      return;
    }

    res.status(201).json({
      success: true,
      message: "Verification code sent to your email",
    });
  } catch (error) {
    console.log("Error while signup :", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const verifySignup = async (req, res) => {
  const { email, code } = req.body;

  const verification = await EmailVerification.findOne({ email });

  if (!verification) {
    return res.status(400).json({
      message: "Verification request not found",
    });
  }

  if (verification.expiresAt < new Date()) {
    await EmailVerification.deleteOne({
      _id: verification._id,
    });

    return res.status(400).json({
      message: "Verification code expired",
    });
  }

  const isValid = await bcrypt.compare(code, verification.code);

  if (!isValid) {
    return res.status(400).json({
      message: "Invalid verification code",
    });
  }

  const user = await User.create({
    fullname: verification.fullname,
    username: verification.username,
    email: verification.email,
    password: verification.password,
    isVerified: true,
  });

  if (user) {
    generateToken(user._id, res);
  } else {
    return res.status(400).json({
      message: "Error while creating token",
    });
  }

  await EmailVerification.deleteOne({
    _id: verification._id,
  });

  const userWithoutPassword = await User.findById(user._id).select("-password");

  return res.status(201).json({
    success: true,
    message: "Email verified and account created successfully",
    user: userWithoutPassword,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!password || !email) {
      return res.status(400).json({
        message: "all fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    generateToken(user._id, res);

    res.status(201).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      profilepic: user.profilepic,
      username: user.username,
      following: user.following,
      followers: user.followers,
    });
  } catch (error) {
    console.log("Error while login :", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("token", "", {
      maxAge: 0,
    });
    res.status(200).json({
      message: "logged off successfully",
    });
  } catch (error) {
    console.log("Error while signup :", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const profilepic = req.file;
    const { fullname, username, gender, bio } = req.body;
    const userId = req.user._id;

    const updateData = {};

    if (gender !== undefined) {
      if (!gender.trim()) {
        return res.status(400).json({
          message: "Gender cannot be empty",
        });
      }

      updateData.gender = gender.trim();
    }

    if (bio !== undefined) {
      updateData.bio = bio.trim();
    }

    if (fullname !== undefined) {
      const cleanFullname = fullname.trim();
      if (!cleanFullname) {
        return res.status(400).json({
          message: "Fullname cannot be empty",
        });
      }
      updateData.fullname = cleanFullname;
    }

    if (username !== undefined) {
      const cleanusername = username.trim();
      if (!cleanusername) {
        return res.status(400).json({
          message: "Username cannot be empty",
        });
      }

      const existingUsername = await User.findOne({
        username: cleanusername,
        _id: { $ne: userId },
      });

      if (existingUsername) {
        return res.status(409).json({
          message: "Username already exists",
        });
      }
      updateData.username = cleanusername;
    }

    if (profilepic) {
      const result = await uploadFile(profilepic.buffer.toString("base64"));
      updateData.profilepic = result.url;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        message: "Please provide something to update",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true },
    ).select("-password");
    return res.status(200).json({
      success: true,
      updatedUser,
      message: "Details are updated",
    });
  } catch (error) {
    console.log("Error while updating profile :", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
