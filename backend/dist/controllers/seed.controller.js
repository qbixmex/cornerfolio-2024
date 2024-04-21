"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const config_1 = require("../config");
const users_1 = require("../data/users");
const models_1 = require("../models");
const seed = async (_request, response) => {
    if (config_1.envs.NODE_ENV === 'production') {
        return response.status(403).json({
            error: `❌ You are not authorized to seed data in production environment ❗️`
        });
    }
    //* Delete all data
    await Promise.all([
        models_1.License.deleteMany(),
        models_1.User.deleteMany()
    ]);
    const usersForSeeding = users_1.users.map((user) => {
        return {
            ...user,
            password: config_1.bcryptAdapter.hash(user.password),
        };
    });
    try {
        //* Insert users to database
        const usersDB = await models_1.User.insertMany(usersForSeeding);
        //* Attach license for every user
        usersDB.forEach(async (user) => {
            const license = await models_1.License.create({});
            user.license = license.id;
            await user.save();
        });
        return response.status(201).json({
            message: `Records saved to database successfully 🎉 !`
        });
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({
            error: `❌ Could not save records to database. Check Logs ❗️`
        });
    }
};
exports.seed = seed;
//# sourceMappingURL=seed.controller.js.map