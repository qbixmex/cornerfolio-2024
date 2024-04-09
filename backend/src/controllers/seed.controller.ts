import { Request, Response } from 'express';
import { bcryptAdapter, envs } from "../config";
import { users } from '../data/users';
import { License, User } from '../models';

export const seed = async (_request: Request, response: Response) => {
  if (envs.NODE_ENV === 'production') {
    return response.status(403).json({
      error: `❌ You are not authorized to seed data in production environment ❗️`
    });
  }

  //* Delete all data
  await Promise.all([
    License.deleteMany(),
    User.deleteMany()
  ]);

  const usersForSeeding = users.map((user) => {
    return {
      ...user,
      password: bcryptAdapter.hash(user.password),
    }
  });

  try {
    //* Insert users to database
    const usersDB = await User.insertMany(usersForSeeding);

    //* Attach license for every user
    usersDB.forEach(async (user) => {
      const license = await License.create({});
      user.license = license.id;
      await user.save();
    });

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
