"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const config_1 = require("../config");
const helpers_1 = require("../helpers");
const models_1 = require("../models");
const register = async (request, response) => {
    const payload = request.body;
    const emailExists = await models_1.User.countDocuments({ email: payload.email });
    if (emailExists) {
        return response.status(400).json({
            error: 'Email already exists !'
        });
    }
    //* Hash the password
    const hashedPassword = config_1.bcryptAdapter.hash(payload.password);
    const license = await models_1.License.create({});
    const newUser = new models_1.User({
        name: payload.name,
        email: payload.email,
        password: hashedPassword,
        jobTitle: payload.jobTitle,
        course: payload.course,
        schedule: payload.schedule,
        license: license.id
    });
    try {
        //* Save the new user to the database
        const savedUser = await newUser.save();
        //* Generate a new token
        const newToken = await (0, helpers_1.generateToken)({ id: savedUser.id }, '1h' //* token expires in 1 hour.
        );
        return response.status(200).json({
            message: 'Account registered successfully !',
            token: newToken,
        });
    }
    catch (error) {
        throw helpers_1.CustomError.internalServer('Error while registering the new account, \n' + error);
    }
};
exports.register = register;
const login = async (request, response) => {
    const payload = request.body;
    //* Find user by email and check if exists.
    const foundUser = await models_1.User.findOne({ email: payload.email });
    if (!foundUser) {
        return response.status(400).json({
            error: `User with "${payload.email}" not found !`
        });
    }
    //* If email matches compare passwords.
    const passwordMatches = config_1.bcryptAdapter.compare(payload.password, foundUser.password);
    if (!passwordMatches) {
        return response.status(400).json({ error: `Invalid password !` });
    }
    //* Generate token with JSON Web Token (JWT)
    const newToken = await (0, helpers_1.generateToken)({ id: foundUser.id }, "365d" //* token expires in 1 year.
    );
    //* return authenticated user and token.
    return response.status(200).json({
        message: 'User logged in successfully !',
        token: newToken,
    });
};
exports.login = login;
//# sourceMappingURL=auth.controller.js.map