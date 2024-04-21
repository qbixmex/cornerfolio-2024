"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSectionText = exports.updateSectionText = exports.createSectionText = exports.getSectionTexts = void 0;
const mongoose_1 = require("mongoose");
const helpers_1 = require("../helpers");
const models_1 = require("../models");
const getSectionTexts = async (req, res) => {
    try {
        const sectionTexts = await models_1.SectionText.find();
        const sections = sectionTexts.map(sectionText => {
            return {
                id: sectionText.id,
                heading: sectionText.heading,
                content: sectionText.content,
                headingSize: sectionText.headingSize,
                contentSize: sectionText.contentSize,
                position: sectionText.position
            };
        });
        return res.status(200).json(sections);
    }
    catch (error) {
        throw helpers_1.CustomError.internalServer('Error while fetching Section Texts,\n' + error);
    }
};
exports.getSectionTexts = getSectionTexts;
const createSectionText = async (req, res) => {
    try {
        const { portfolioId } = req.params;
        const order = req.query.order;
        const portfolio = await models_1.Portfolio.findById(portfolioId);
        if (!portfolio) {
            return res.status(404).json({ error: "Portfolio not found !" });
        }
        const newSectionText = new models_1.SectionText();
        await newSectionText.save();
        if (order && !isNaN(parseInt(order))) {
            const index = parseInt(order);
            if (index >= 0 && index <= portfolio.sections.length) {
                portfolio.sections.splice(index, 0, {
                    kind: "SectionText",
                    item: newSectionText._id,
                });
            }
            else {
                portfolio.sections.push({
                    kind: "SectionText",
                    item: newSectionText._id,
                });
            }
        }
        else {
            portfolio.sections.push({
                kind: "SectionText",
                item: newSectionText._id,
            });
        }
        await portfolio.save();
        return res.status(201).json({
            message: 'Section text created successfully !',
            section: {
                id: newSectionText.id,
                heading: newSectionText.heading,
                content: newSectionText.content,
                headingSize: newSectionText.headingSize,
                contentSize: newSectionText.contentSize,
                position: newSectionText.position,
            }
        });
    }
    catch (error) {
        throw helpers_1.CustomError.internalServer('Error while creating Section Text,\n' + error);
    }
};
exports.createSectionText = createSectionText;
const updateSectionText = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: `Invalid ID: ${id} !` });
    }
    const sectionText = await models_1.SectionText.findById(id);
    if (!sectionText) {
        return res.status(404).json({ error: "Section text not found !" });
    }
    try {
        const payload = req.body;
        //? Note: if you pass undefined to a field, it will not be updated.
        sectionText.heading = payload.heading !== undefined ? payload.heading : sectionText.heading;
        sectionText.content = payload.content !== undefined ? payload.content : sectionText.content;
        sectionText.headingSize = payload.headingSize !== undefined ? payload.headingSize : sectionText.headingSize;
        sectionText.contentSize = payload.contentSize !== undefined ? payload.contentSize : sectionText.contentSize;
        sectionText.position = payload.position !== undefined ? payload.position : sectionText.position;
        await sectionText.save();
        return res.status(200).json({
            message: 'Section text updated successfully !',
            section: {
                id: sectionText.id,
                heading: sectionText.heading,
                content: sectionText.content,
                headingSize: sectionText.headingSize,
                contentSize: sectionText.contentSize,
                position: sectionText.position,
            }
        });
    }
    catch (error) {
        throw helpers_1.CustomError.internalServer('Error while updating Section Text,\n' + error);
    }
};
exports.updateSectionText = updateSectionText;
const deleteSectionText = async (req, res) => {
    const sectionId = req.params.id;
    if (!mongoose_1.Types.ObjectId.isValid(sectionId)) {
        return res.status(400).json({
            error: `Invalid ID: ${sectionId} !`,
        });
    }
    try {
        // Delete the sectionText itself
        await models_1.SectionText.findByIdAndDelete(sectionId);
        // Find the portfolio that contains a section with the given sectionId
        const portfolio = await models_1.Portfolio.findOne({ "sections.item": sectionId });
        if (!portfolio) {
            return res.status(404).json({ error: "Portfolio not found !" });
        }
        // Find the index of the section with the given sectionId in the portfolio's sections array
        const sectionIndex = portfolio.sections.findIndex((section) => section.item.toString() === sectionId);
        if (sectionIndex === -1) {
            return res.status(404).json({ error: "Section not found in portfolio !" });
        }
        // Remove the section from the portfolio's sections array
        portfolio.sections.splice(sectionIndex, 1);
        await portfolio.save();
        return res.status(200).json({ message: "Section Text deleted successfully 👍" });
    }
    catch (error) {
        throw helpers_1.CustomError.internalServer("Error while deleting the Section Text,\n" + error);
    }
};
exports.deleteSectionText = deleteSectionText;
//# sourceMappingURL=section-text.controller.js.map