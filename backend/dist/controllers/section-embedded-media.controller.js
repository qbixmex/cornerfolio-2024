"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSectionEmbeddedMedia = exports.updateSectionEmbeddedMedia = exports.createSectionEmbeddedMedia = exports.getSectionEmbeddedMedias = void 0;
const models_1 = require("../models");
const helpers_1 = require("../helpers");
const mongoose_1 = require("mongoose");
const getSectionEmbeddedMedias = async (req, res) => {
    try {
        const SectionEmbeddedMedias = await models_1.SectionEmbeddedMedia.find();
        const sections = SectionEmbeddedMedias.map(SectionEmbeddedMedia => {
            return {
                id: SectionEmbeddedMedia.id,
                code: SectionEmbeddedMedia.code,
            };
        });
        return res.status(200).json(sections);
    }
    catch (error) {
        throw helpers_1.CustomError.internalServer('Error while fetching the Section Embedded Medias,\n' + error);
    }
};
exports.getSectionEmbeddedMedias = getSectionEmbeddedMedias;
const createSectionEmbeddedMedia = async (req, res) => {
    try {
        const { portfolioId } = req.params;
        const order = req.query.order;
        const portfolio = await models_1.Portfolio.findById(portfolioId);
        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio not found' });
        }
        const { code } = req.body;
        if (!code) {
            return res.status(400).json({ error: 'Code is required !' });
        }
        const newSectionEmbeddedMedia = new models_1.SectionEmbeddedMedia({ code });
        await newSectionEmbeddedMedia.save();
        console.log('embeddedmedia: ', order);
        if (order && !isNaN(parseInt(order))) {
            const index = parseInt(order);
            if (index >= 0 && index <= portfolio.sections.length) {
                portfolio.sections.splice(index, 0, {
                    kind: 'SectionEmbeddedMedia',
                    item: newSectionEmbeddedMedia._id
                });
            }
            else {
                portfolio.sections.push({
                    kind: 'SectionEmbeddedMedia',
                    item: newSectionEmbeddedMedia._id
                });
            }
        }
        else {
            portfolio.sections.push({
                kind: 'SectionEmbeddedMedia',
                item: newSectionEmbeddedMedia._id
            });
        }
        await portfolio.save();
        return res.status(201).json({
            message: 'Section Embedded Media created successfully !',
            section: {
                id: newSectionEmbeddedMedia.id,
                code: newSectionEmbeddedMedia.code,
            }
        });
    }
    catch (error) {
        throw helpers_1.CustomError.internalServer('Error while creating the Section Embedded Media,\n' + error);
    }
};
exports.createSectionEmbeddedMedia = createSectionEmbeddedMedia;
const updateSectionEmbeddedMedia = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            error: `Invalid ID: ${id} !`,
        });
    }
    const sectionEmbeddedMedia = await models_1.SectionEmbeddedMedia.findById(id);
    if (!sectionEmbeddedMedia) {
        return res.status(404).json({ error: 'Section Embedded Media not found' });
    }
    const payload = req.body;
    try {
        //? Note: if you pass undefined to a field, it will not be updated.
        sectionEmbeddedMedia.code = payload.code !== undefined ? payload.code : sectionEmbeddedMedia.code;
        await sectionEmbeddedMedia.save();
        return res.status(200).json({
            message: 'Section embedded media updated successfully 👍 !',
            section: {
                id: sectionEmbeddedMedia.id,
                code: sectionEmbeddedMedia.code,
            }
        });
    }
    catch (error) {
        throw helpers_1.CustomError.internalServer('Error while updating the Section Embedded Media,\n' + error);
    }
};
exports.updateSectionEmbeddedMedia = updateSectionEmbeddedMedia;
const deleteSectionEmbeddedMedia = async (req, res) => {
    const sectionId = req.params.id;
    if (!mongoose_1.Types.ObjectId.isValid(sectionId)) {
        return res.status(400).json({
            error: `Invalid ID: ${sectionId} !`,
        });
    }
    try {
        // Delete the sectionEmbeddedMedia itself
        await models_1.SectionEmbeddedMedia.findByIdAndDelete(sectionId);
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
        return res.status(200).json({ message: 'Section EmbeddedMedia deleted successfully 👍' });
    }
    catch (error) {
        throw helpers_1.CustomError.internalServer('Error while deleting the Section EmbeddedMedia,\n' + error);
    }
};
exports.deleteSectionEmbeddedMedia = deleteSectionEmbeddedMedia;
//# sourceMappingURL=section-embedded-media.controller.js.map