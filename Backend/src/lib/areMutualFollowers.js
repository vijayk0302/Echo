import User from "../model/User.js";

export const areMutualFollowers = async (userAId, userBId) => {
  const [aFollowsB, bFollowsA] = await Promise.all([
    User.exists({ _id: userAId, following: userBId }),
    User.exists({ _id: userBId, following: userAId }),
  ]);
  return aFollowsB && bFollowsA;
};
