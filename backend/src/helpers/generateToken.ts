import { JWTAdapter } from '../config';
import CustomError from './errors';

export type TokenType = {
  id: string;
  name: string;
  email: string;
  imageUrl?: string;
};

export const generateToken = async (options: TokenType, duration = '1h') => {

  const newToken = await JWTAdapter.generateToken(
    {
      id: options.id,
      name: options.name,
      email: options.email,
      imageUrl: options.imageUrl,
    },
    duration
  );

  if (!newToken) {
    throw CustomError.internalServer('Error while generating token !');
  }

  return newToken;
};
