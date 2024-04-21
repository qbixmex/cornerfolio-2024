"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.updatePassword = exports.update = exports.create = exports.search = exports.profile = exports.list = exports.totalPages = void 0;
const cloudinary_1 = require("cloudinary");
const mongoose_1 = require("mongoose");
const config_1 = require("../config");
const helpers_1 = require("../helpers");
const models_1 = require("../models");
const totalPages = async (request, response) => {
    const { term, limit = 10 } = request.params;
    let totalUsers;
    if (term) {
        totalUsers = await models_1.User.countDocuments({
            $or: [
                { name: { $regex: term, $options: 'i' } },
                { email: { $regex: term, $options: 'i' } },
            ],
        });
    }
    else {
        totalUsers = await models_1.User.countDocuments();
    }
    return response.status(200).json({ total: Math.floor(totalUsers / +limit) + 1 });
};
exports.totalPages = totalPages;
const list = async (request, response) => {
    const { page = 1, limit = 10, sortBy = 'name', order = 'asc' } = request.query;
    try {
        const [usersTotal, users] = await Promise.all([
            models_1.User.countDocuments(),
            models_1.User.find()
                .populate({ path: "license", select: "type startDate endDate" })
                .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
                .limit(+limit)
                .skip((+page - 1) * +limit),
        ]);
        const usersRemap = users.map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            imageUrl: user.imageURL ?? null,
            type: user.type,
            jobTitle: user.jobTitle,
            active: user.active,
            course: user.course,
            schedule: user.schedule,
            startDate: user.startDate ?? 'not set',
            endDate: user.endDate ?? 'not set',
            license: user.license,
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
    }
    catch (error) {
        throw helpers_1.CustomError.internalServer('Error while fetching the users list,\n' + error);
    }
};
exports.list = list;
const profile = async (request, response) => {
    const id = request.params.id;
    const token = request.headers.token;
    if (!token) {
        return response.status(401).json({
            error: 'Unauthorized access !',
        });
    }
    const decodedToken = await (0, helpers_1.verifyToken)(token);
    if (!decodedToken) {
        return response.status(401).json({
            error: 'Token not valid !',
        });
    }
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return response.status(400).json({
            error: `Invalid user ID: ${id} !`,
        });
    }
    try {
        const loggedUser = await models_1.User.findById(decodedToken.id);
        if (!loggedUser) {
            return response.status(404).json({
                error: `Login User not found!`,
            });
        }
        if (loggedUser.type !== 'admin' && loggedUser.id !== id) {
            return response.status(401).json({
                error: 'unauthorized access',
            });
        }
        const userType = loggedUser.type;
        const foundUser = await models_1.User.findById(id)
            .populate({ path: "license", select: "type startDate endDate" });
        if (!foundUser || (userType !== "admin" && id !== decodedToken.id)) {
            return response.status(404).json({
                error: `User not found with ID: ${id} !`,
            });
        }
        return response.status(200).json({
            user: {
                id: foundUser.id,
                name: foundUser.name,
                email: foundUser.email,
                imageUrl: foundUser.imageURL ?? null,
                type: foundUser.type,
                jobTitle: foundUser.jobTitle,
                active: foundUser.active,
                course: foundUser.course,
                schedule: foundUser.schedule,
                startDate: foundUser.startDate ?? 'not set',
                endDate: foundUser.endDate ?? 'not set',
                license: foundUser.license,
                createdAt: foundUser.createdAt,
                updatedAt: foundUser.updatedAt,
            },
        });
    }
    catch (error) {
        throw helpers_1.CustomError.internalServer('Error while fetching the account,\n' + error);
    }
};
exports.profile = profile;
const search = async (request, response) => {
    const { term = '' } = request.params;
    const users = await models_1.User.find({
        $or: [
            { name: { $regex: term, $options: 'i' } },
            { email: { $regex: term, $options: 'i' } },
        ],
    })
        .populate({
        path: "license",
        select: "type startDate endDate"
    });
    const usersRemapped = users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        imageUrl: user.imageURL ?? null,
        type: user.type,
        jobTitle: user.jobTitle,
        active: user.active,
        course: user.course,
        schedule: user.schedule,
        startDate: user.startDate,
        endDate: user.endDate,
        license: user.license,
    }));
    return response.status(200).json({
        message: `Users found with the term: ${term}`,
        users: usersRemapped,
    });
};
exports.search = search;
const create = async (request, response) => {
    const payload = request.body;
    const emailExists = await models_1.User.countDocuments({ email: payload.email });
    if (emailExists) {
        return response.status(400).json({
            error: `Email: ${payload.email} already exists !`
        });
    }
    //* Hash the password
    const hashedPassword = config_1.bcryptAdapter.hash(payload.password);
    const license = await models_1.License.create({});
    const newUser = new models_1.User({
        name: payload.name,
        email: payload.email,
        type: payload.type,
        password: hashedPassword,
        jobTitle: payload.jobTitle,
        startDate: payload.startDate,
        endDate: payload.endDate,
        active: payload.active,
        course: payload.course,
        schedule: payload.schedule,
        license: license.id
    });
    try {
        //* Save the new user to the database
        const savedUser = await newUser.save();
        //* Upload image to cloudinary.
        if (request.files !== null && request.files !== undefined) {
            //* Get the image path
            const temporaryFilePath = request.files.image.tempFilePath;
            //* Upload the image to cloudinary.
            const responseCloudinary = await cloudinary_1.v2.uploader.upload(temporaryFilePath, {
                folder: 'users',
                overwrite: true,
            });
            //* Set the image name from cloudinary response.
            savedUser.imageURL = responseCloudinary.secure_url;
            //* Save the user with the new image name to the database.
            savedUser.save();
        }
        const license = await models_1.License.findById(savedUser.license);
        return response.status(200).json({
            message: 'User created successfully 👍',
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
                image: savedUser.imageURL ?? null,
                jobTitle: savedUser.jobTitle,
                course: savedUser.course,
                startDate: savedUser.startDate,
                endDate: savedUser.endDate,
                schedule: savedUser.schedule,
                active: savedUser.active,
                license: license?.type,
                createdAt: savedUser.createdAt,
                updatedAt: savedUser.updatedAt,
            },
        });
    }
    catch (error) {
        throw helpers_1.CustomError.internalServer('Error while registering the new account,\n' + error);
    }
};
exports.create = create;
const update = async (request, response) => {
    const id = request.params.id;
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return response.status(400).json({
            error: `Invalid user ID: ${id} !`,
        });
    }
    const payload = request.body;
    const foundUser = await models_1.User.findById(id);
    if (!foundUser) {
        return response.status(404).json({
            error: `User not found with ID: ${id} !`,
        });
    }
    try {
        const updatedUser = await models_1.User.findByIdAndUpdate(id, {
            name: payload.name,
            email: (payload.email && foundUser.email === payload.email) ? undefined : payload.email,
            type: payload.type,
            jobTitle: payload.jobTitle,
            startDate: payload.startDate,
            endDate: payload.endDate,
            active: payload.active,
            course: payload.course,
            schedule: payload.schedule,
        }, { new: true })
            .populate({ path: "license", select: "type startDate endDate" });
        //* UPLOAD IMAGE TO CLOUDINARY
        if (updatedUser && request.files !== null && request.files !== undefined) {
            const temporaryFilePath = request.files.image.tempFilePath;
            //* First we need to remove the old image from the cloudinary.
            if (updatedUser.imageURL) {
                //* Example URL from cloudinary.
                //? "https://res.cloudinary.com/qbixmex/image/upload/v1710393039/users/mwvwm92ivurc6gaovkfl.jpg",
                //* Split the URL by '/' to get in an array all url segments.
                const imageURLArray = updatedUser.imageURL.split('/');
                //* Then get the last segment of the array to get the image name.
                //* NOTE: The last segment is the image id with the extension.
                const imageName = imageURLArray[imageURLArray.length - 1];
                //* Split the image name by '.' to get the public image id.
                const [publicImageID] = imageName.split('.');
                //* Then we need to remove the old image from cloudinary.
                await cloudinary_1.v2.uploader.destroy(`users/${publicImageID}`);
            }
            //* Then we need to upload the image to cloudinary.
            const responseCloudinary = await cloudinary_1.v2.uploader.upload(temporaryFilePath, {
                folder: 'users',
                overwrite: true,
            });
            //* Then set the image name from cloudinary response.
            updatedUser.imageURL = responseCloudinary.secure_url;
            //* Then save the user with the new image name to the database.
            updatedUser.save();
        }
        return response.status(200).json({
            message: `User has been updated successfully 👍`,
            user: {
                id: updatedUser?.id,
                name: updatedUser?.name,
                email: updatedUser?.email,
                imageURL: updatedUser?.imageURL,
                jobTitle: updatedUser?.jobTitle,
                course: updatedUser?.course,
                schedule: updatedUser?.schedule,
                license: updatedUser?.license,
                createdAt: updatedUser?.createdAt,
                updatedAt: updatedUser?.updatedAt,
            }
        });
    }
    catch (error) {
        throw helpers_1.CustomError.internalServer('Error while deleting the account,\n' + error);
    }
};
exports.update = update;
const updatePassword = async (request, response) => {
    const id = request.params.id;
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return response.status(400).json({
            error: `Invalid user ID: ${id} !`,
        });
    }
    const payload = request.body;
    const foundUser = await models_1.User.findById(id);
    if (!foundUser) {
        return response.status(404).json({
            error: `User not found with ID: ${id} !`,
        });
    }
    if (config_1.bcryptAdapter.compare(payload.password, foundUser.password)) {
        return response.status(400).json({
            error: `New password is the same as the old one !`,
        });
    }
    try {
        await models_1.User.findByIdAndUpdate(id, { password: config_1.bcryptAdapter.hash(payload.password) });
        return response.status(200).json({ message: `User password has been updated successfully 👍` });
    }
    catch (error) {
        throw helpers_1.CustomError.internalServer('Error while deleting the account,\n' + error);
    }
};
exports.updatePassword = updatePassword;
const remove = async (request, response) => {
    const id = request.params.id;
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return response.status(400).json({
            error: `Invalid user ID: ${id} !`,
        });
    }
    try {
        const userFound = await models_1.User.findById(id);
        if (!userFound) {
            return response.status(404).json({
                error: `User not found with ID: ${id} !`,
            });
        }
        //* First we need to remove the old image from the cloudinary.
        if (userFound.imageURL) {
            //* Example URL from cloudinary.
            //? "https://res.cloudinary.com/qbixmex/image/upload/v1710393039/users/mwvwm92ivurc6gaovkfl.jpg",
            //* Split the URL by '/' to get in an array all url segments.
            const imageURLArray = userFound.imageURL.split('/');
            //* Then get the last segment of the array to get the image name.
            //* NOTE: The last segment is the image id with the extension.
            const imageName = imageURLArray[imageURLArray.length - 1];
            //* Split the image name by '.' to get the public image id.
            const [publicImageID] = imageName.split('.');
            //* Then we need to remove the old image from cloudinary.
            await cloudinary_1.v2.uploader.destroy(`users/${publicImageID}`);
        }
        await models_1.User.findByIdAndDelete(id);
        return response.status(200).json({
            message: `User with ID: ${id} has been removed successfully 👍`,
        });
    }
    catch (error) {
        throw helpers_1.CustomError.internalServer('Error while deleting the account,\n' + error);
    }
};
exports.remove = remove;
//# sourceMappingURL=users.controller.js.map