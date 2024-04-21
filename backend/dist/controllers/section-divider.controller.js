"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSectionDivider = exports.updateSectionDivider = exports.createSectionDivider = exports.getSectionDividers = void 0;
const helpers_1 = require("../helpers");
const mongoose_1 = require("mongoose");
const models_1 = require("../models");
const getSectionDividers = async (req, res) => {
    try {
        const SectionDividers = await models_1.SectionDivider.find();
        const sections = SectionDividers.map(sectionDivider => ({
            id: sectionDivider.id,
            title: sectionDivider.title,
            titleSize: sectionDivider.titleSize,
        }));
        return res.status(200).json(sections);
    }
    catch (error) {
        throw helpers_1.CustomError.internalServer('Error while fetching the Section Dividers,\n' + error);
    }
};
exports.getSectionDividers = getSectionDividers;
const createSectionDivider = async (req, res) => {
    try {
        const { portfolioId } = req.params;
        const order = req.query.order;
        const portfolio = await models_1.Portfolio.findById(portfolioId);
        if (!portfolio) {
            return res.status(404).json({ error: 'Portfolio not found !' });
        }
        const newSectionDivider = new models_1.SectionDivider();
        await newSectionDivider.save();
        if (order && !isNaN(parseInt(order))) {
            const index = parseInt(order);
            if (index >= 0 && index <= portfolio.sections.length) {
                portfolio.sections.splice(index, 0, {
                    kind: 'SectionDivider',
                    item: newSectionDivider._id
                });
            }
            else {
                portfolio.sections.push({
                    kind: 'SectionDivider',
                    item: newSectionDivider._id
                });
            }
        }
        else {
            portfolio.sections.push({
                kind: 'SectionDivider',
                item: newSectionDivider._id
            });
        }
        await portfolio.save();
        return res.status(201).json({
            message: 'Section divider created successfully 👍 !',
            section: {
                id: newSectionDivider.id,
                title: newSectionDivider.title,
                titleSize: newSectionDivider.titleSize,
            }
        });
    }
    catch (error) {
        throw helpers_1.CustomError.internalServer('Error while creating the Section Divider,\n' + error);
    }
};
exports.createSectionDivider = createSectionDivider;
const updateSectionDivider = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                error: `Invalid ID: ${id} !`,
            });
        }
        const sectionDivider = await models_1.SectionDivider.findById(id);
        if (!sectionDivider) {
            return res.status(404).json({ error: 'Section Divider not found' });
        }
        const payload = req.body;
        //? Note: if you pass undefined to a field, it will not be updated.
        sectionDivider.title = payload.title !== undefined ? payload.title : sectionDivider.title;
        sectionDivider.titleSize = payload.titleSize !== undefined ? payload.titleSize : sectionDivider.titleSize;
        await sectionDivider.save();
        return res.status(200).json({
            message: 'Section divider updated successfully 👍 !',
            section: {
                id: sectionDivider.id,
                title: sectionDivider.title,
                titleSize: sectionDivider.titleSize,
            }
        });
    }
    catch (error) {
        throw helpers_1.CustomError.internalServer('Error while deleting the Section Divider,\n' + error);
    }
};
exports.updateSectionDivider = updateSectionDivider;
const deleteSectionDivider = async (req, res) => {
    const sectionId = req.params.id;
    if (!mongoose_1.Types.ObjectId.isValid(sectionId)) {
        return res.status(400).json({
            error: `Invalid ID: ${sectionId} !`,
        });
    }
    try {
        // Delete the sectionDivider itself
        await models_1.SectionDivider.findByIdAndDelete(sectionId);
        // Find the portfolio that contains a section with the given sectionId
        const portfolio = await models_1.Portfolio.findOne({ 'sections.item': sectionId });
        if (!portfolio) {
            return res.status(404).json({ error: 'Portfolio not found !' });
        }
        console.log("debug portfolio", portfolio.id);
        // Find the index of the section with the given sectionId in the portfolio's sections array
        const sectionIndex = portfolio.sections.findIndex(section => section.item.toString() === sectionId);
        if (sectionIndex === -1) {
            return res.status(404).json({ error: 'Section not found in portfolio !' });
        }
        // Remove the section from the portfolio's sections array
        portfolio.sections.splice(sectionIndex, 1);
        await portfolio.save();
        return res.status(200).json({ message: 'Section Divider deleted successfully 👍' });
    }
    catch (error) {
        throw helpers_1.CustomError.internalServer('Error while deleting the Section Divider,\n' + error);
    }
};
exports.deleteSectionDivider = deleteSectionDivider;
//# sourceMappingURL=section-divider.controller.js.map