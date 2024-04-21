"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSectionColumn = exports.updateSectionColumn = exports.createSectionColumn = exports.getSectionColumns = void 0;
const mongoose_1 = require("mongoose");
const helpers_1 = require("../helpers");
const models_1 = require("../models");
const getSectionColumns = async (req, res) => {
    try {
        const sectionColumns = await models_1.SectionColumn.find();
        const sections = sectionColumns.map(sectionColumn => {
            return {
                id: sectionColumn.id,
                heading1: sectionColumn.heading1,
                content1: sectionColumn.content1,
                headingSize1: sectionColumn.headingSize1,
                contentSize1: sectionColumn.contentSize1,
                heading2: sectionColumn.heading2,
                content2: sectionColumn.content2,
                headingSize2: sectionColumn.headingSize2,
                contentSize2: sectionColumn.contentSize2,
                heading3: sectionColumn.heading3,
                content3: sectionColumn.content3,
                headingSize3: sectionColumn.headingSize3,
                contentSize3: sectionColumn.contentSize3,
            };
        });
        return res.status(200).json(sections);
    }
    catch (error) {
        throw helpers_1.CustomError.internalServer('Error while fetching Section Columns,\n' + error);
    }
};
exports.getSectionColumns = getSectionColumns;
const createSectionColumn = async (req, res) => {
    try {
        const { portfolioId } = req.params;
        const order = req.query.order;
        const portfolio = await models_1.Portfolio.findById(portfolioId);
        if (!portfolio) {
            return res.status(404).json({ error: "Portfolio not found !" });
        }
        const newSectionColumn = new models_1.SectionColumn();
        await newSectionColumn.save();
        if (order && !isNaN(parseInt(order))) {
            const index = parseInt(order);
            if (index >= 0 && index <= portfolio.sections.length) {
                portfolio.sections.splice(index, 0, {
                    kind: "SectionColumn",
                    item: newSectionColumn._id,
                });
            }
            else {
                portfolio.sections.push({
                    kind: "SectionColumn",
                    item: newSectionColumn._id,
                });
            }
        }
        else {
            portfolio.sections.push({
                kind: "SectionColumn",
                item: newSectionColumn._id,
            });
        }
        await portfolio.save();
        return res.status(201).json({
            message: 'Section column created successfully !',
            section: {
                id: newSectionColumn.id,
                heading1: newSectionColumn.heading1,
                content1: newSectionColumn.content1,
                headingSize1: newSectionColumn.headingSize1,
                contentSize1: newSectionColumn.contentSize1,
                heading2: newSectionColumn.heading2,
                content2: newSectionColumn.content2,
                headingSize2: newSectionColumn.headingSize2,
                contentSize2: newSectionColumn.contentSize2,
                heading3: newSectionColumn.heading3,
                content3: newSectionColumn.content3,
                headingSize3: newSectionColumn.headingSize3,
                contentSize3: newSectionColumn.contentSize3,
            }
        });
    }
    catch (error) {
        throw helpers_1.CustomError.internalServer('Error while creating Section Column,\n' + error);
    }
};
exports.createSectionColumn = createSectionColumn;
const updateSectionColumn = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: `Invalid ID: ${id} !` });
    }
    const sectionColumn = await models_1.SectionColumn.findById(id);
    if (!sectionColumn) {
        return res.status(404).json({ error: "Section Column not found !" });
    }
    try {
        const payload = req.body;
        //? Note: if you pass undefined to a field, it will not be updated.
        sectionColumn.heading1 = payload.heading1 !== undefined ? payload.heading1 : sectionColumn.heading1;
        sectionColumn.content1 = payload.content1 !== undefined ? payload.content1 : sectionColumn.content1;
        sectionColumn.headingSize1 = payload.headingSize1 !== undefined ? payload.headingSize1 : sectionColumn.headingSize1;
        sectionColumn.contentSize1 = payload.contentSize1 !== undefined ? payload.contentSize1 : sectionColumn.contentSize1;
        sectionColumn.heading2 = payload.heading2 !== undefined ? payload.heading2 : sectionColumn.heading2;
        sectionColumn.content2 = payload.content2 !== undefined ? payload.content2 : sectionColumn.content2;
        sectionColumn.headingSize2 = payload.headingSize2 !== undefined ? payload.headingSize2 : sectionColumn.headingSize2;
        sectionColumn.contentSize2 = payload.contentSize2 !== undefined ? payload.contentSize2 : sectionColumn.contentSize2;
        sectionColumn.heading3 = payload.heading3 !== undefined ? payload.heading3 : sectionColumn.heading3;
        sectionColumn.content3 = payload.content3 !== undefined ? payload.content3 : sectionColumn.content3;
        sectionColumn.headingSize3 = payload.headingSize3 !== undefined ? payload.headingSize3 : sectionColumn.headingSize3;
        sectionColumn.contentSize3 = payload.contentSize3 !== undefined ? payload.contentSize3 : sectionColumn.contentSize3;
        await sectionColumn.save();
        return res.status(200).json({
            message: 'Section column updated successfully !',
            section: {
                id: sectionColumn.id,
                heading1: sectionColumn.heading1,
                content1: sectionColumn.content1,
                headingSize1: sectionColumn.headingSize1,
                contentSize1: sectionColumn.contentSize1,
                heading2: sectionColumn.heading2,
                content2: sectionColumn.content2,
                headingSize2: sectionColumn.headingSize2,
                contentSize2: sectionColumn.contentSize2,
                heading3: sectionColumn.heading3,
                content3: sectionColumn.content3,
                headingSize3: sectionColumn.headingSize3,
                contentSize3: sectionColumn.contentSize3,
            }
        });
    }
    catch (error) {
        throw helpers_1.CustomError.internalServer('Error while updating Section Column,\n' + error);
    }
};
exports.updateSectionColumn = updateSectionColumn;
const deleteSectionColumn = async (req, res) => {
    const sectionId = req.params.id;
    if (!mongoose_1.Types.ObjectId.isValid(sectionId)) {
        return res.status(400).json({
            error: `Invalid ID: ${sectionId} !`,
        });
    }
    try {
        // Delete the sectionColumn itself
        await models_1.SectionColumn.findByIdAndDelete(sectionId);
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
        return res.status(200).json({ message: "Section Column deleted successfully 👍" });
    }
    catch (error) {
        throw helpers_1.CustomError.internalServer("Error while deleting the Section Column,\n" + error);
    }
};
exports.deleteSectionColumn = deleteSectionColumn;
//# sourceMappingURL=section-column.controller.js.map