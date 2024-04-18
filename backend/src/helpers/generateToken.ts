import { JWTAdapter } from '../config';
import CustomError from './errors';

export type TokenType = { id: string };

export const generateToken = async (options: TokenType, duration?: string | number) => {

  const newToken = await JWTAdapter.generateToken(
    { id: options.id },
    duration
  );

  if (!newToken) {
    throw CustomError.internalServer('Error while generating token !');
  }

  return newToken;
};
