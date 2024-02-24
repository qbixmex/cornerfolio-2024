import { Request, Response } from 'express';

export const list = async (
  request: Request,
  response: Response
) => {
  response.status(200).json('Users List');
};

export const profile = async (
  request: Request<{ id: string }>,
  response: Response
) => {
  const id = request.params.id;
  return response.status(200).json(`User Profile: ${id}`);
};

export const update = async (
  request: Request<{ id: string }>,
  response: Response
) => {
  const id = request.params.id;
  return response.status(200).json(`User Update: ${id}`);
};

export const remove = async (
  request: Request<{ id: string }>,
  response: Response
) => {
  const id = request.params.id;
  return response.status(200).json(`User Delete: ${id}`);
};
