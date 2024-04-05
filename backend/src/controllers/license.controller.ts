import { Request, Response } from "express";
import { Types } from "mongoose";
import CustomError from '../helpers/errors';
import License from "../models/license.model";


export const show = async (request: Request<{ id: string }>, response: Response) => {
  const id = request.params.id;

  if (!Types.ObjectId.isValid(id)) {
    return response.status(400).json({
      error: `Invalid license ID: ${id} !`,
    });
  }

  try {
    const licenseFound = await License.findById(id);

    if (!licenseFound) {
      return response.status(404).json({
        error: `License with id: ${id}, does not exist!`
      });
    }

    return response.status(200).json({
      license: licenseFound
    });
  } catch (error) {
    throw CustomError.internalServer('Error while updating the license,\n' + error);
  }
}

type RequestCreateBody = {
  type: "free" | "premium";
};

export const create = async (
  request: Request<never, never, RequestCreateBody>,
  response: Response
) => {
  const payload = request.body;
  const currentDate = new Date();

  const allowedTypes = ["free", "premium"];

  if (!allowedTypes.includes(payload.type)) {
    return response.status(400).json({
      error: 'License must be "premium" or "free"',
    });
  }

  const licenseEndDate = new Date(currentDate);
  licenseEndDate.setFullYear(currentDate.getFullYear() + 1);

  try {
    const license = await License.create({
      type: payload.type,
      startDate: currentDate,
      endDate: licenseEndDate
    })

    return response.status(200).json({
      message: "License created successfully 👍",
      license
    });
  } catch (error) {
    throw CustomError.internalServer('Error while creating the license,\n' + error);
  }
};

type RequestUpdateBody = {
  type: "free" | "premium",
  startDate: Date,
  endDate: Date,
}

export const update = async (
  request: Request<{ id: string }, never, RequestUpdateBody>,
  response: Response
) => {

  const id = request.params.id;

  if (!Types.ObjectId.isValid(id)) {
    return response.status(400).json({
      error: `Invalid license ID: ${id} !`,
    });
  }
  const payload = request.body;

  const license = await License.findById(id);

  if (!license) {
    return response.status(404).json({
      error: `License: ${id}, does not exist !`
    });
  }

  try {
    const updatedLicense = await License.findOneAndUpdate(
      { _id: id },
      {
        type: payload.type ?? undefined,
        startDate: payload.startDate ?? undefined,
        endDate: payload.endDate ?? undefined,
      }, { new: true })

    return response.status(200).json({
      message: "License updated successfully 👍",
      license: updatedLicense
    });
  } catch (error) {
    throw CustomError.internalServer('Error while updating the license,\n' + error);
  }
};

export const remove = async (request: Request<{ id: string }>, response: Response) => {
  const id = request.params.id;

  if (!Types.ObjectId.isValid(id)) {
    return response.status(400).json({
      error: `Invalid license ID: ${id} !`,
    });
  }

  const licenseExists = await License.countDocuments({ _id: id });

  if (!licenseExists) {
    return response.status(404).json({
      error: `License with id: ${id}, does not exist!`
    });
  }

  try {

    await License.findByIdAndDelete(id)

    return response.status(200).json({
      message: `License with id: ${id}, removed successfully 👍`
    });
  } catch (error) {
    throw CustomError.internalServer('Error while updating the license,\n' + error);
  }
}
