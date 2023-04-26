import cloud, { v2 } from "cloudinary";
const cloudinary: typeof v2 = cloud.v2;
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
	secure: true,
});

export default cloudinary;
