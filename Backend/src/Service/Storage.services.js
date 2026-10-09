import ImageKit from "@imagekit/nodejs";
import {ENV} from "../lib/env.js";

const imagekit = new ImageKit({
  privateKey: ENV.IMAGE_KIT_KEY,
});

const sendImage = async (file) => {
  const response = await imagekit.files.upload({
    file,
    fileName: `imageAsMessage`,
    folder: "Echo/userMessages",
  });
  return response;
};

export default sendImage
