import { Request, Response } from 'express';
import { User } from '../models';
import { bcryptAdapter } from '../config';
import { CustomError } from '../helpers';
import { Types } from 'mongoose';

type UsersQuery = {
  limit: number;
  page: number;
  order: string;
  sortBy: string;
};

export const list = async (
  request: Request<never, never, UsersQuery>,
  response: Response
) => {
  const {
    page = 1,
    limit = 10,
    sortBy = 'name',
    order = 'asc'
  } = request.query;

  try {
    const [ usersTotal, users ] = await Promise.all([
      User.countDocuments(),
      User.find()
        .sort({ [sortBy as string]: order === 'desc' ? -1 : 1 })
        .limit(+limit)
        .skip((+page - 1) * +limit),
    ]);
  
    const usersRemap = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      type: user.type,
      jobTitle: user.jobTitle,
      active: user.active,
      course: user.course,
      schedule: user.schedule,
      startDate: user.startDate ?? 'not set',
      endDate: user.endDate ?? 'not set',
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
  
    return response.status(200).json({
      pagination: {
        total: usersTotal,
        limit: +limit,
        next: ((+page * +limit) < usersTotal) ? `page=${(+page + 1)}` : null,
        previous: (+page - 1 !== 0) ? `page=${(+page - 1)}` : null,
        page: +page,
      },
      users: usersRemap,
    });
  } catch (error) {
    throw CustomError.internalServer('Error while fetching the users list,\n' + error);
  }

};

export const profile = async (
  request: Request<{ id: string }>,
  response: Response
) => {
  const id = request.params.id;

  if (!Types.ObjectId.isValid(id)) {
    return response.status(400).json({
      error: `Invalid user ID: ${id} !`,
    });
  }

  try {
    const foundUser = await User.findById(id);

    if (!foundUser) {
      return response.status(404).json({
        error: `User not found with ID: ${id} !`,
      });
    }

    return response.status(200).json({
      user: {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        type: foundUser.type,
        jobTitle: foundUser.jobTitle,
        active: foundUser.active,
        course: foundUser.course,
        schedule: foundUser.schedule,
        startDate: foundUser.startDate ?? 'not set',
        endDate: foundUser.endDate ?? 'not set',
        createdAt: foundUser.createdAt,
        updatedAt: foundUser.updatedAt,
      },
    });  
  } catch (error) {
    throw CustomError.internalServer('Error while fetching the account,\n' + error);
  }

};

export const create = async (
  request: Request,
  response: Response
) => {
  const payload = request.body;

  const emailExists = await User.countDocuments({ email: payload.email });

  if (emailExists) {
    return response.status(400).json({
      error: `Email: ${payload.email} already exists !`
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

    return response.status(200).json({
      message: 'User created successfully 👍',
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
    });
  } catch (error) {
    throw CustomError.internalServer('Error while registering the new account,\n' + error);
  }

};

export const update = async (
  request: Request<{ id: string }>,
  response: Response
) => {
  const id = request.params.id;

  if (!Types.ObjectId.isValid(id)) {
    return response.status(400).json({
      error: `Invalid user ID: ${id} !`,
    });
  }

  const payload = request.body;

  const foundUser = await User.findById(id);

  if (!foundUser) {
    return response.status(404).json({
      error: `User not found with ID: ${id} !`,
    });
  }

  try {

    const updatedUser = await User.findByIdAndUpdate(id, {
      name: payload.name,
      email: (payload.email && foundUser.email === payload.email) ? undefined : payload.email,
      type: payload.type,
      jobTitle: payload.jobTitle,
      startDate: payload.startDate,
      endDate: payload.endDate,
      active: payload.active,
      course: payload.course,
      schedule: payload.schedule,
    }, { new: true });

    return response.status(200).json({
      message: `User has been updated successfully 👍`,
      user: {
        id: updatedUser?.id,
        name: updatedUser?.name,
        email: updatedUser?.email,
        jobTitle: updatedUser?.jobTitle,
        course: updatedUser?.course,
        schedule: updatedUser?.schedule,
        createdAt: updatedUser?.createdAt,
        updatedAt: updatedUser?.updatedAt,
      }
    });  
  } catch (error) {
    throw CustomError.internalServer('Error while deleting the account,\n' + error);
  }
};

export const updatePassword = async (
  request: Request<{ id: string }, never, { password: string }>,
  response: Response
) => {

  const id = request.params.id;

  if (!Types.ObjectId.isValid(id)) {
    return response.status(400).json({
      error: `Invalid user ID: ${id} !`,
    });
  }

  const payload = request.body;

  const foundUser = await User.findById(id);

  if (!foundUser) {
    return response.status(404).json({
      error: `User not found with ID: ${id} !`,
    });
  }

  if (bcryptAdapter.compare(payload.password, foundUser.password)) {
    return response.status(400).json({
      error: `New password is the same as the old one !`,
    });
  }

  try {
    await User.findByIdAndUpdate(id, { password: bcryptAdapter.hash(payload.password) });
    return response.status(200).json({ message: `User password has been updated successfully 👍` });
  } catch (error) {
    throw CustomError.internalServer('Error while deleting the account,\n' + error);
  }
};

export const remove = async (
  request: Request<{ id: string }>,
  response: Response
) => {
  const id = request.params.id;

  if (!Types.ObjectId.isValid(id)) {
    return response.status(400).json({
      error: `Invalid user ID: ${id} !`,
    });
  }

  try {
    const userExists = await User.countDocuments({ _id: id });

    if (!userExists) {
      return response.status(404).json({
        error: `User not found with ID: ${id} !`,
      });
    }

    await User.findByIdAndDelete(id);

    return response.status(200).json({
      message: `User with ID: ${id} has been removed successfully 👍`,
    });  
  } catch (error) {
    throw CustomError.internalServer('Error while deleting the account,\n' + error);
  }
};
