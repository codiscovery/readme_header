import dotenv from "dotenv";
dotenv.config();
import Cloudinary from "cloudinary";
const cloudinary = Cloudinary.v2;

// console.log("process.env", process.env);
// console.log("process.env.CLOUDINARY_APP_NAME", process.env.CLOUDINARY_APP_NAME);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_APP_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;
