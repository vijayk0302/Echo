import User from "../model/User.js";

export const followUser = async (req, res) => {
  try {
    const { id: loggedInUser } = req.user;
    const { targetUserID } = req.params;

    if (loggedInUser.toString() === targetUserID) {
      return res.status(400).json({
        message: "You can not follow yourself",
      });
    }

    const targetUser = await User.findById({ _id: targetUserID });

    if (!targetUser) {
      return res.status(400).json({
        message: "user not found",
      });
    }
    await User.findByIdAndUpdate(loggedInUser, {
      $addToSet: { following: targetUserID },
    });

    await User.findByIdAndUpdate(targetUserID, {
      $addToSet: { followers: loggedInUser },
    });

    res.status(200).json({
      success:true,
      message: "user followed successfuly",
    });
  } catch (error) {
    console.log("Error while following :", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const { id: loggedInUser } = req.user;
    const { targetUserID } = req.params;

    if (loggedInUser.toString() === targetUserID) {
      return res.status(400).json({
        message: "You can not unfollow yourself",
      });
    }

    const targetUser = await User.findById({ _id: targetUserID });

    if (!targetUser) {
      return res.status(400).json({
        message: "user not found",
      });
    }

    await User.findByIdAndUpdate(loggedInUser, {
      $pull: { following: targetUserID },
    });

    await User.findByIdAndUpdate(targetUserID, {
      $pull: { followers: loggedInUser },
    });

    res.status(200).json({
      success:true,
      message: "user unfollowed successfuly",
    });
  } catch (error) {
    console.log("Error while following :", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};



