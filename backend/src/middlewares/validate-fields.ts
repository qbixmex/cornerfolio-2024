import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

const validateFields = (request: Request, response: Response, next: NextFunction) => {

  const validationErrors = validationResult(request);

  if ( !validationErrors.isEmpty() ) {
    return response.status(400).json({
      error: validationErrors.array()[0].msg
    });
  }

  next();

};

export default validateFields;
