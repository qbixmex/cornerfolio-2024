import { Request, Response } from 'express';
import { User } from '../models';
import { users } from '../data/users';

export const seed = async (_request: Request, response: Response) => {
  //* Delete all data
  await Promise.all([
    User.deleteMany(),
  ]);

  try {
    //* Insert data to database
    await User.insertMany(users);
    return response.status(201).json({
      message: `Records saved to database successfully 🎉 !`
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      error: `❌ Could not save records to database. Check Logs ❗️`
    });
  }
};
