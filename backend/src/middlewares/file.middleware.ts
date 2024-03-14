import { Request, Response, NextFunction } from 'express';

const fileMiddleware = (request: Request, response: Response, next: NextFunction) => {

  if (!request.files || Object.keys(request.files).length === 0) {
    return response.status(400).json({ error: 'No files were uploaded !' });
  }

  if (!request.files.image) {
    return response.status(400).json({ error: 'No file was uploaded !' });
  }

  next();

};

export default fileMiddleware;
