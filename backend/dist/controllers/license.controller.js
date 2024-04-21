"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.show = void 0;
const mongoose_1 = require("mongoose");
const errors_1 = __importDefault(require("../helpers/errors"));
const license_model_1 = __importDefault(require("../models/license.model"));
const show = async (request, response) => {
    const id = request.params.id;
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return response.status(400).json({
            error: `Invalid license ID: ${id} !`,
        });
    }
    try {
        const licenseFound = await license_model_1.default.findById(id);
        if (!licenseFound) {
            return response.status(404).json({
                error: `License with id: ${id}, does not exist!`
            });
        }
        return response.status(200).json({
            license: licenseFound
        });
    }
    catch (error) {
        throw errors_1.default.internalServer('Error while updating the license,\n' + error);
    }
};
exports.show = show;
const create = async (request, response) => {
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
        const license = await license_model_1.default.create({
            type: payload.type,
            startDate: currentDate,
            endDate: licenseEndDate
        });
        return response.status(200).json({
            message: "License created successfully 👍",
            license
        });
    }
    catch (error) {
        throw errors_1.default.internalServer('Error while creating the license,\n' + error);
    }
};
exports.create = create;
const update = async (request, response) => {
    const id = request.params.id;
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return response.status(400).json({
            error: `Invalid license ID: ${id} !`,
        });
    }
    const payload = request.body;
    const license = await license_model_1.default.findById(id);
    if (!license) {
        return response.status(404).json({
            error: `License: ${id}, does not exist !`
        });
    }
    try {
        const updatedLicense = await license_model_1.default.findOneAndUpdate({ _id: id }, {
            type: payload.type ?? undefined,
            startDate: payload.startDate !== undefined ? payload.startDate : null,
            endDate: payload.endDate !== undefined ? payload.endDate : null,
        }, { new: true });
        return response.status(200).json({
            message: "License updated successfully 👍",
            license: updatedLicense
        });
    }
    catch (error) {
        throw errors_1.default.internalServer('Error while updating the license,\n' + error);
    }
};
exports.update = update;
const remove = async (request, response) => {
    const id = request.params.id;
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return response.status(400).json({
            error: `Invalid license ID: ${id} !`,
        });
    }
    const licenseExists = await license_model_1.default.countDocuments({ _id: id });
    if (!licenseExists) {
        return response.status(404).json({
            error: `License with id: ${id}, does not exist!`
        });
    }
    try {
        await license_model_1.default.findByIdAndDelete(id);
        return response.status(200).json({
            message: `License with id: ${id}, removed successfully 👍`
        });
    }
    catch (error) {
        throw errors_1.default.internalServer('Error while updating the license,\n' + error);
    }
};
exports.remove = remove;
//# sourceMappingURL=license.controller.js.map