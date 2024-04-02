import { JWTAdapter } from "../config";
import { DecodedToken } from "../interfaces";
import CustomError from "./errors";

export const verifyToken = async (token: string): Promise<DecodedToken> => {
  
  const decodedToken = await JWTAdapter.validateToken(token) as DecodedToken | null;

  if (!decodedToken) {
    throw CustomError.forbidden('Invalid token !');
  }

  return decodedToken;
};
