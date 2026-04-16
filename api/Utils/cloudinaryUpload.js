import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
// we need this becuase we uplaod file directy via buffer/Ram not file/diskStorage

export const uploadCloudnary = async (file) => {
  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "products" },

        // function
        (error, success) => {
          if (error) return reject(error); // reject full error
          resolve(success); // success contains cloudinary response
        },
      );

      // use streamifier to upload the file
      // file.buffer contain img raw data and pipe contain stream where file goes
      streamifier.createReadStream(file.buffer).pipe(stream);
    });

    return {
      url: result.secure_url, // use url inside image (FIXED)
      id: result.public_id, // use to delete the image from cloudinary
    };
  } catch (error) {
    throw new Error("cloudnary Error Failed " + error.message);
  }
};
