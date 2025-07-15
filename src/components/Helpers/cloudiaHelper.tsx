// utils/uploadVideoToCloudinary.ts
import axios from 'axios';

export const uploadVideoToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'unsigned_preset'); // Replace with your preset

  const cloudName = 'dywzuwr6z'; // Replace with your Cloudinary cloud name

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
    formData
  );

  return response.data.secure_url; // This is your video URL
};
