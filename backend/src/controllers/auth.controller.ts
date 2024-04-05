import { Request, Response } from 'express';
import { User } from '../models';
import { bcryptAdapter } from '../config';
import { CustomError, generateToken } from '../helpers';

type RegisterRequestBody = {
  name: string;
  email: string;
  password: string;
  jobTitle: string;
  course: string;
  schedule: string;
};

type LoginRequestBody = {
  email: string;
  password: string;
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
      imageUrl: savedUser.imageURL ?? '',
    }, '365d');

    return response.status(200).json({
      message: 'Account registered successfully !',
      token: newToken,
    });

  } catch (error) {
    throw CustomError.internalServer('Error while registering the new account, \n' + error);
  }
};

export const login = async (
  request: Request<never, never, LoginRequestBody>,
  response: Response
) => {

  const payload = request.body;

  //* Find user by email and check if exists.
  const foundUser = await User.findOne({ email: payload.email });
    
  if (!foundUser) {
    return response.status(400).json({
      error: `User with "${payload.email}" not found !`
    });
  }
  
  //* If email matches compare passwords.
  const passwordMatches = bcryptAdapter.compare(payload.password, foundUser.password);

  if (!passwordMatches) {
    return response.status(400).json({ error: `Invalid password !` });
  }

  //* Generate token with JSON Web Token (JWT)
  const newToken = await generateToken(
    {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      imageUrl: foundUser.imageURL ?? '',
    },
    '1h' //* token expires in 1 hour
  );

  //* return authenticated user and token.
  return response.status(200).json({
    message: 'User logged in successfully !',
    token: newToken,
  });
};
