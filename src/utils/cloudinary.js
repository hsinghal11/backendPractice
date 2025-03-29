import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploaOnCloudinary = async (localPath) => {
  try {
    if (!localPath) {
      console.error("Could not locate the file path, at line 12 cloudinary.js");
      return null;
    }

    const response = await cloudinary.uploader.upload(localPath, {
      resource_type: "auto",
      folder: "youtube-backend",
      use_filename: true,
    });
    // file has been uploaded sucessfully

    fs.unlinkSync(localPath);
    console.log("What is the response see that : ", response);
    console.log("url of file uploaded : ", response.url);

    return response;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    fs.unlinkSync(localPath);
    return null;
  }
};

export { uploaOnCloudinary };
