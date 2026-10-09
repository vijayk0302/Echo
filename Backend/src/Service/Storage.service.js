import ImageKit from "@imagekit/nodejs";
import {ENV} from "../lib/env.js";

const imagekit = new ImageKit({
  privateKey: ENV.IMAGE_KIT_KEY,
});

const uploadFile = async (file) => {
  const response = await imagekit.files.upload({
    file,
    fileName: `profile`,
    folder: "Echo/profiles",
  });
  return response;
};

export default uploadFile
