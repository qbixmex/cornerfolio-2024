import {v2 as cloudinary} from 'cloudinary';
import { envs } from '../config';

//* Cloudinary configuration (for image upload)
cloudinary.config(envs.CLOUDINARY_URL);

export const uploadImage = async (value: any) => {
  // TODO: Clear previous image
  cloudinary.uploader.upload(value, (error: any, result: any) => {});
  console.log('uploadImage', value);
};