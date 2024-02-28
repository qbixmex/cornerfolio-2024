import { Request, Response } from 'express';
import { User } from '../models';

type RegisterRequestBody = {
  name: string;
  email: string;
  password: string;
  jobTitle: string;
  course: string;
  schedule: string;
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

  const newUser = new User({
    name: payload.name,
    email: payload.email,
    password: payload.password,
    jobTitle: payload.jobTitle,
    course: payload.course,
    schedule: payload.schedule,
  });

  const savedUser = await newUser.save();

  return response.status(200).json({
    message: 'Account registered successfully !',
    user: {
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
      type: savedUser.type,
      jobTitle: savedUser.jobTitle,
      active: savedUser.active,
      course: savedUser.course,
      schedule: savedUser.schedule,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt,
    },
  });
};

export const login = async (request: Request, response: Response) => {
  return response.status(200).json('Login Endpoint');
};
