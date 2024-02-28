import { Request, Response } from 'express';
import { User } from '../models';
import { JWTAdapter, bcryptAdapter } from '../config';
import { CustomError } from '../helpers';

type RegisterRequestBody = {
  name: string;
  email: string;
  password: string;
  jobTitle: string;
  course: string;
  schedule: string;
};

type TokenType = {
  id: string;
  name: string;
  email: string;
};

export const register = async (
  request: Request<never, never, RegisterRequestBody>,
  response: Response
) => {

  const payload = request.body;
  const emailExists = await User.countDocuments({ email: payload.email });

  if (emailExists) {
    return response.status(400).json({
      error: 'Email already exists !'
    });
  }

  //* Hash the password
  const hashedPassword = bcryptAdapter.hash(payload.password);

  const newUser = new User({
    name: payload.name,
    email: payload.email,
    password: hashedPassword,
    jobTitle: payload.jobTitle,
    course: payload.course,
    schedule: payload.schedule,
  });

  try {
    //* Save the new user to the database
    const savedUser = await newUser.save();

    //* Generate a new token
    const newToken = await generateToken({
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
    });

    return response.status(200).json({
      message: 'Account registered successfully !',
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        jobTitle: savedUser.jobTitle,
        course: savedUser.course,
        schedule: savedUser.schedule,
        createdAt: savedUser.createdAt,
        updatedAt: savedUser.updatedAt,
      },
      token: newToken,
    });

  } catch (error) {
    throw CustomError.internalServer('Error while registering the new account, \n' + error);
  }
};

export const login = async (request: Request, response: Response) => {
  return response.status(200).json('Login Endpoint');
};

const generateToken = async (options: TokenType, duration = '1h') => {

  const newToken = await JWTAdapter.generateToken(
    {
      id: options.id,
      name: options.name,
      email: options.email
    },
    duration
  );

  if (!newToken) {
    throw CustomError.internalServer('Error while generating token !');
  }

  return newToken;
};

