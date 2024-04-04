import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../../helpers';

const validateToken = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {

  const token = request.headers.token;

	if (!token) {
		return response.status(401).json({
			error: "Unauthorized access !",
		});
	}

  try {
    const tokenVerified = await verifyToken(token as string);
    
    if (!tokenVerified) {
      return response.status(401).json({
        error: "Token not valid !",
      });
    }

    next();
  } catch (error) {
    if (error instanceof Error) {
      return response.status(401).json({
        error: error.message,
      });
    }
  }
};

export default validateToken;
