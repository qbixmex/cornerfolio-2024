import { Request, Response } from 'express';
import { loadImage } from '../helpers';

export const upload = async (
  request: Request,
  response: Response
) => {

  try {

    const imageName = await loadImage(request.files, 'users');

    response.json({
      message: 'Image uploaded successfully !',
      image: imageName,
    });

  } catch (error) {
    response.status(400).json({ error });
  }
};
