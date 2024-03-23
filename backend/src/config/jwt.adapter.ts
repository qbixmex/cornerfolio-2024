import jwt from 'jsonwebtoken';
import envs from './envs';

export type JWTAdapterType = {
  id: string;
  name: string;
  email: string;
  imageUrl?: string;
};

const JWT_SEED = envs.JWT_SECRET

class JWTAdapter {
  static async generateToken(payload: JWTAdapterType, duration = '1h'): Promise<string | null> {
    return new Promise((resolve) => {
      jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (error, token) => {
        return error ? resolve(null) : resolve(token as string);
      });
    });
  }

  static validateToken(token: string): Promise<JWTAdapterType | null> {
    return new Promise((resolve) => {
      jwt.verify(token, JWT_SEED, (error, decoded) => {
        return error ? resolve(null) : resolve(decoded as JWTAdapterType);
      });
    });
  }
}

export default JWTAdapter;
