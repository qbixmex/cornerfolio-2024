import path from 'path';
import { Request, Response } from 'express';

type Image = {
  name: string;
};

export const upload = async (
  request: Request,
  response: Response
) => {

  const image = request.files?.image;

  if (Array.isArray(image)) {
    return response.status(400).json({
      error: 'Multiple files are not supported !'
    });
  }

  const uploadPath = path.join(__dirname, `../uploads/${image!.name}`);

  image!.mv(uploadPath, (error) => {
    if (error) {
      return response.status(500).json({ error });
    }

    return response.status(200).json({
      message: `File uploaded to: ${uploadPath}`
    });
  });

};
