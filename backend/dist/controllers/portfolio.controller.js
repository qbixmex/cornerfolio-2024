"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveSectionUpDown = exports.setPortfolioTheme = exports.deletePortfolio = exports.updatePortfolio = exports.createPortfolio = exports.getPortfolioByTinyUrlId = exports.getPortfolioById = exports.getPortfolios = void 0;
const mongodb_1 = require("mongodb");
const mongoose_1 = require("mongoose");
const helpers_1 = require("../helpers");
const Models = __importStar(require("../models"));
const getPortfolios = async (req, res) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({
            error: 'Unauthorized access !',
        });
    }
    const decodedToken = await (0, helpers_1.verifyToken)(token);
    if (!decodedToken) {
        return res.status(401).json({
            error: 'Token not valid !',
        });
    }
    try {
        const Portfolios = await Models.Portfolio.find({ user: decodedToken.id });
        const portfolios = Portfolios.map((portfolio) => {
            return {
                id: portfolio.id,
                portfolioTitle: portfolio.portfolioTitle,
                header: portfolio.header,
                status: portfolio.status,
                footer: portfolio.footer,
                template: portfolio.template,
                sections: portfolio.sections,
                theme: portfolio.theme,
                tinyUrlId: portfolio.tinyUrlId,
            };
        });
        return res.status(200).json(portfolios);
    }
    catch (error) {
        throw helpers_1.CustomError.internalServer('Error while fetching the Portfolios,\n' + error);
    }
};
exports.getPortfolios = getPortfolios;
const getPortfolioById = async (req, res) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({
            error: 'Unauthorized access !',
        });
    }
    const decodedToken = await (0, helpers_1.verifyToken)(token);
    if (!decodedToken) {
        return res.status(401).json({
            error: 'Token not valid !',
        });
    }
    try {
        const { id } = req.params;
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "Invalid Portfolio ID" });
        }
        const portfolio = await Models.Portfolio
            .findById(id)
            .where('user')
            .equals(decodedToken.id)
            .populate({ path: "user", select: "id name email license" })
            .populate({ path: "sections.item" });
        if (!portfolio) {
            return res.status(404).json({ error: "Portfolio not found !" });
        }
        return res.status(200).json({
            id: portfolio.id,
            header: portfolio.header,
            status: portfolio.status,
            user: portfolio.user,
            sections: portfolio.sections,
            footer: portfolio.footer,
            template: portfolio.template,
            theme: portfolio.theme,
            tinyUrlId: portfolio.tinyUrlId,
        });
    }
    catch (error) {
        throw helpers_1.CustomError.internalServer("Error while fetching the Portfolio,\n" + error);
    }
};
exports.getPortfolioById = getPortfolioById;
const getPortfolioByTinyUrlId = async (req, res) => {
    try {
        const { tinyUrlId } = req.params;
        const portfolio = await Models.Portfolio.findOne({ tinyUrlId })
            .populate({ path: 'user', select: 'id name email license' })
            .populate({ path: 'sections.item' });
        if (!portfolio) {
            return res.status(404).json({ error: 'Portfolio not found !' });
        }
        return res.status(200).json({
            id: portfolio.id,
            header: portfolio.header,
            status: portfolio.status,
            user: portfolio.user,
            sections: portfolio.sections,
            footer: portfolio.footer,
            template: portfolio.template,
            theme: portfolio.theme,
            tinyUrlId: portfolio.tinyUrlId,
        });
    }
    catch (error) {
        throw helpers_1.CustomError.internalServer('Error while fetching the Portfolio,\n' + error);
    }
};
exports.getPortfolioByTinyUrlId = getPortfolioByTinyUrlId;
const createPortfolio = async (request, response) => {
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
    const userDB = await Models.User.findById(decodedToken.id)
        .select('id name jobTitle email')
        .populate({ path: 'portfolios' })
        .populate({ path: 'license' });
    if (!userDB) {
        return response.status(400).json({
            error: `User with id: ${decodedToken.id}, not found !`,
        });
    }
    if (userDB?.portfolios.length > 0 &&
        (userDB?.license).type === 'free') {
        return response.status(400).json({
            error: 'Sorry, you only allow to create 1 portfolio as Free license 😢',
        });
    }
    try {
        // Temporary Template Id
        const templateId = new mongodb_1.ObjectId();
        const portfolioTitle = `${userDB.jobTitle} portfolio`;
        const header = {
            title: `Hi, I'm ${userDB.name}, I am ${userDB.jobTitle}`,
            subHeading: 'Currently at Cornerstone, based in Vancouver',
        };
        const footer = {
            links: `https://www.linkedin.com/in/username`,
            text: `Cornerfolio © ${new Date().getFullYear()}. All rights reserved.`,
        };
        const tinyUrlId = await (0, helpers_1.generateUniqueTinyUrlId)();
        const newPortfolio = new Models.Portfolio({
            portfolioTitle,
            header,
            footer,
            user: userDB.id,
            template: templateId,
            tinyUrlId,
        });
        await newPortfolio.save();
        //* Add portfolio to user's portfolio list
        await Models.User.findByIdAndUpdate(userDB.id, {
            $push: { portfolios: newPortfolio },
        });
        return response.status(201).json({
            message: 'Portfolio created successfully 👍 !',
            portfolio: {
                id: newPortfolio.id,
                portfolioTitle: newPortfolio.portfolioTitle,
                header: newPortfolio.header,
                status: newPortfolio.status,
                user: {
                    id: userDB.id,
                    name: userDB.name,
                    jobTitle: userDB.jobTitle,
                    email: userDB.email,
                },
                sections: newPortfolio.sections,
                footer: newPortfolio.footer,
                template: newPortfolio.template,
                theme: newPortfolio.theme,
                tinyUrlId: newPortfolio.tinyUrlId,
            },
        });
    }
    catch (error) {
        throw helpers_1.CustomError.internalServer('Error while creating the Portfolio,\n' + error);
    }
};
exports.createPortfolio = createPortfolio;
const updatePortfolio = async (request, response) => {
    try {
        const id = request.params.id;
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            return response.status(400).json({
                error: `Invalid ID: ${id} !`,
            });
        }
        const portfolio = await Models.Portfolio.findById(id);
        if (!portfolio) {
            return response.status(404).json({ error: 'Portfolio not found' });
        }
        const payload = request.body;
        // update portfolio
        await Models.Portfolio.findByIdAndUpdate(id, {
            portfolioTitle: payload.portfolioTitle ?? undefined,
            header: payload.header ?? undefined,
            sections: payload.sections ?? undefined,
            status: payload.status ?? undefined,
            footer: payload.footer ?? undefined,
            template: payload.template ?? undefined,
            theme: payload.theme ?? undefined,
        }).populate({ path: 'sections.item' });
        const updatedPortfolio = await Models.Portfolio
            .findById(id)
            .populate({ path: 'sections.item' });
        //? Note: if you pass undefined to a field, it will not be updated.
        if (updatedPortfolio) {
            updatedPortfolio.header = payload.header !== undefined ? payload.header : updatedPortfolio.header;
            updatedPortfolio.footer = payload.footer !== undefined ? payload.footer : updatedPortfolio.footer;
            await updatedPortfolio.save();
        }
        // get user
        const userId = portfolio.user;
        const user = await Models.User.findById(userId);
        if (!user) {
            return response.status(404).json({ error: 'User not found' });
        }
        // Get license
        const licenseId = user.license;
        const license = await Models.License.findById(licenseId);
        if (!license) {
            return response.status(404).json({ error: 'License not found' });
        }
        if (license.type === "free" && payload.status === "published") {
            const portfolios = await Models.Portfolio.find({ user: userId });
            const published_count = portfolios.filter(portfolio => portfolio.status === 'published').length;
            if (published_count > 1) {
                await Models.Portfolio.findByIdAndUpdate(id, {
                    status: "draft",
                });
                return response.status(401).json({ error: 'Sorry, the limit of portfolios that can be published is 1 😢' });
            }
        }
        return response.status(200).json({
            message: 'Portfolio updated successfully 👍 !',
            portfolio: updatedPortfolio,
        });
    }
    catch (error) {
        throw helpers_1.CustomError.internalServer('Error while updating the Portfolio,\n' + error);
    }
};
exports.updatePortfolio = updatePortfolio;
const deletePortfolio = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            error: `Invalid ID: ${id} !`,
        });
    }
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({
            error: 'Unauthorized access !',
        });
    }
    const decodedToken = await (0, helpers_1.verifyToken)(token);
    if (!decodedToken) {
        return res.status(401).json({
            error: 'Token not valid !',
        });
    }
    const portfolio = await Models.Portfolio.countDocuments({ _id: id });
    if (!portfolio) {
        return res.status(404).json({ error: 'Portfolio not found !' });
    }
    const userDB = await Models.User.findById(decodedToken.id)
        .select('id name jobTitle email')
        .populate('portfolios');
    try {
        await Models.Portfolio.findOneAndDelete({ _id: id });
        //* Remove portfolio from user's portfolio list
        await Models.User.findByIdAndUpdate(userDB?.id, {
            $pull: { portfolios: id },
        });
        // do the same as logic in .post method....
        return res.status(200).json({ message: 'Portfolio deleted successfully 👍 !' });
    }
    catch (error) {
        throw helpers_1.CustomError.internalServer('Error while deleting the Portfolio,\n' + error);
    }
};
exports.deletePortfolio = deletePortfolio;
const setPortfolioTheme = async (req, res) => {
    try {
        const id = req.params.id;
        const theme = req.body.theme;
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                error: `Invalid ID: ${id} !`,
            });
        }
        const portfolio = await Models.Portfolio.findByIdAndUpdate(id, {
            theme: theme ?? undefined,
        }).populate({ path: 'sections.item' });
        if (!portfolio) {
            return res.status(404).json({ error: 'Portfolio not found !' });
        }
        return res.status(200).json({
            message: 'Portfolio theme updated successfully 👍 !',
            portfolio: {
                id: portfolio.id,
                portfolioTitle: portfolio.portfolioTitle,
                header: portfolio.header,
                sections: portfolio.sections,
                status: portfolio.status,
                footer: portfolio.footer,
                template: portfolio.template,
                theme: portfolio.theme,
                tinyUrlId: portfolio.tinyUrlId,
            },
        });
    }
    catch (error) {
        throw helpers_1.CustomError.internalServer('Error while updating the Portfolio theme,\n' + error);
    }
};
exports.setPortfolioTheme = setPortfolioTheme;
const moveSectionUpDown = async (req, res) => {
    try {
        const { portfolioId, sectionId } = req.params;
        const { action } = req.query;
        // Validate action
        if (typeof action !== 'string' || (action !== 'up' && action !== 'down')) {
            return res.status(400).json({ message: 'Invalid action specified' });
        }
        // Find portfolio by ID
        const portfolio = await Models.Portfolio.findById(portfolioId);
        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio not found' });
        }
        // Find index of the section in the sections array
        const index = portfolio.sections.findIndex((section) => section.item.toString() === sectionId.toString());
        if (index === -1) {
            return res.status(404).json({ message: 'Section not found in portfolio' });
        }
        // Move section up or down based on action
        if (action === 'up') {
            // Move section up if index is greater than 0
            if (index > 0) {
                const temp = portfolio.sections[index];
                portfolio.sections[index] = portfolio.sections[index - 1];
                portfolio.sections[index - 1] = temp;
            }
        }
        else if (action === 'down') {
            // Move section down if index is less than sections.length - 1
            if (index < portfolio.sections.length - 1) {
                const temp = portfolio.sections[index];
                portfolio.sections[index] = portfolio.sections[index + 1];
                portfolio.sections[index + 1] = temp;
            }
        }
        // Save the updated portfolio
        await portfolio.save();
        res.status(200).json({ message: 'Section moved successfully' });
    }
    catch (error) {
        console.error('Error moving section:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.moveSectionUpDown = moveSectionUpDown;
//# sourceMappingURL=portfolio.controller.js.map