interface CloudinaryConfigOptions {
  cloud_name: string;
  api_key: string;
  api_secret: string;
  // Add other properties as needed
}

import cloudinary from "cloudinary";
import { CLOUD_NAME, API_ID, API_SECRET } from "../secrets";

export const cloud = () => {
  return cloudinary.v2.config({
    cloud_name: CLOUD_NAME,
    api_key: API_ID,
    api_secret: API_SECRET,
  });
};
