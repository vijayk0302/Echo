import User from "../model/User.js";
export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    const { id } = req.user;

    if (!query || query == "") {
      return res.status(400).json({
        success: false,
        message: "Please add words to get results",
      });
    }

    const sanitizedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const users = await User.find({
      _id: { $ne: id },
      $or: [
        { username: { $regex: sanitizedQuery, $options: "i" } },
        { fullname: { $regex: sanitizedQuery, $options: "i" } },
      ],
    })
      .select("_id username fullname profilepic bio followers following")
      .limit(10);

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log("searching user in database :", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getFollowersAndFollowing = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id)
      .populate("followers", "_id username profilepic fullname")
      .populate("following", "_id username profilepic fullname");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      followers: user.followers,
      following: user.following,
    });
  } catch (error) {
    console.log("Error in getting list of followers and following:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
