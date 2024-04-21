"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSectionGallery = exports.uploadSectionGallery = exports.updateSectionGallery = exports.createSectionGallery = exports.getSectionGalleries = void 0;
const mongoose_1 = require("mongoose");
const cloudinary_1 = require("cloudinary");
const models_1 = require("../models");
const helpers_1 = require("../helpers");
const getSectionGalleries = async (req, res) => {
    try {
        const SectionGalleries = await models_1.SectionGallery.find();
        const sections = SectionGalleries.map(sectionGallery => {
            return {
                id: sectionGallery.id,
                url1: sectionGallery.url1,
                alt1: sectionGallery.alt1,
                caption1: sectionGallery.caption1,
                captionSize1: sectionGallery.captionSize1,
                url2: sectionGallery.url2,
                alt2: sectionGallery.alt2,
                caption2: sectionGallery.caption2,
                captionSize2: sectionGallery.captionSize2,
                url3: sectionGallery.url3,
                alt3: sectionGallery.alt3,
                caption3: sectionGallery.caption3,
                captionSize3: sectionGallery.captionSize3,
            };
        });
        return res.status(200).json(sections);
    }
    catch (error) {
        throw helpers_1.CustomError.internalServer('Error while fetching Section Galleries,\n' + error);
    }
};
exports.getSectionGalleries = getSectionGalleries;
const createSectionGallery = async (req, res) => {
    try {
        const { portfolioId } = req.params;
        const order = req.query.order;
        const portfolio = await models_1.Portfolio.findById(portfolioId);
        if (!portfolio) {
            return res.status(404).json({ error: 'Portfolio not found !' });
        }
        const newSectionGallery = new models_1.SectionGallery();
        await newSectionGallery.save();
        if (order && !isNaN(parseInt(order))) {
            const index = parseInt(order);
            if (index >= 0 && index <= portfolio.sections.length) {
                portfolio.sections.splice(index, 0, {
                    kind: 'SectionGallery',
                    item: newSectionGallery._id
                });
            }
            else {
                portfolio.sections.push({
                    kind: 'SectionGallery',
                    item: newSectionGallery._id
                });
            }
        }
        else {
            portfolio.sections.push({
                kind: 'SectionGallery',
                item: newSectionGallery._id
            });
        }
        await portfolio.save();
        return res.status(201).json({
            message: 'Section Gallery created successfully !',
            section: {
                id: newSectionGallery.id,
                url1: newSectionGallery.url1,
                alt1: newSectionGallery.alt1,
                caption1: newSectionGallery.caption1,
                captionSize1: newSectionGallery.captionSize1,
                url2: newSectionGallery.url2,
                alt2: newSectionGallery.alt2,
                caption2: newSectionGallery.caption2,
                captionSize2: newSectionGallery.captionSize2,
                url3: newSectionGallery.url3,
                alt3: newSectionGallery.alt3,
                caption3: newSectionGallery.caption3,
                captionSize3: newSectionGallery.captionSize3,
            }
        });
    }
    catch (error) {
        throw helpers_1.CustomError.internalServer('Error while creating Section Gallery,\n' + error);
    }
};
exports.createSectionGallery = createSectionGallery;
const updateSectionGallery = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            error: `Invalid ID: ${id} !`,
        });
    }
    // search sectionGallery with designated id.
    const sectionGallery = await models_1.SectionGallery.findById(id);
    if (!sectionGallery) {
        return res.status(404).json({ error: 'Section gallery not found' });
    }
    try {
        const payload = req.body;
        //? Note: if you pass undefined to a field, it will not be updated.
        sectionGallery.url1 = payload.url1 !== undefined ? payload.url1 : sectionGallery.url1;
        sectionGallery.alt1 = payload.alt1 !== undefined ? payload.alt1 : sectionGallery.alt1;
        sectionGallery.caption1 = payload.caption1 !== undefined ? payload.caption1 : sectionGallery.caption1;
        sectionGallery.captionSize1 = payload.captionSize1 !== undefined ? payload.captionSize1 : sectionGallery.captionSize1;
        sectionGallery.url2 = payload.url2 !== undefined ? payload.url2 : sectionGallery.url2;
        sectionGallery.alt2 = payload.alt2 !== undefined ? payload.alt2 : sectionGallery.alt2;
        sectionGallery.caption2 = payload.caption2 !== undefined ? payload.caption2 : sectionGallery.caption2;
        sectionGallery.captionSize2 = payload.captionSize2 !== undefined ? payload.captionSize2 : sectionGallery.captionSize2;
        sectionGallery.url3 = payload.url3 !== undefined ? payload.url3 : sectionGallery.url3;
        sectionGallery.alt3 = payload.alt3 !== undefined ? payload.alt3 : sectionGallery.alt3;
        sectionGallery.caption3 = payload.caption3 !== undefined ? payload.caption3 : sectionGallery.caption3;
        sectionGallery.captionSize3 = payload.captionSize3 !== undefined ? payload.captionSize3 : sectionGallery.captionSize3;
        await sectionGallery.save();
        return res.status(200).json({
            message: 'Section gallery updated successfully !',
            section: {
                id: sectionGallery.id,
                url1: sectionGallery.url1,
                alt1: sectionGallery.alt1,
                caption1: sectionGallery.caption1,
                captionSize1: sectionGallery.captionSize1,
                url2: sectionGallery.url2,
                alt2: sectionGallery.alt2,
                caption2: sectionGallery.caption2,
                captionSize2: sectionGallery.captionSize2,
                url3: sectionGallery.url3,
                alt3: sectionGallery.alt3,
                caption3: sectionGallery.caption3,
                captionSize3: sectionGallery.captionSize3,
            }
        });
    }
    catch (error) {
        throw helpers_1.CustomError.internalServer('Error while updating Section Gallery,\n' + error);
    }
};
exports.updateSectionGallery = updateSectionGallery;
const uploadSectionGallery = async (req, res) => {
    const id = req.params.id;
    const position = req.params.position;
    let UrlKey;
    (function (UrlKey) {
        UrlKey["Url1"] = "url1";
        UrlKey["Url2"] = "url2";
        UrlKey["Url3"] = "url3";
    })(UrlKey || (UrlKey = {}));
    let urlKey = UrlKey.Url1;
    if (!['1', '2', '3'].includes(position)) {
        return res.status(400).json({ error: 'Position must be 1, 2, or 3' });
    }
    else {
        switch (position) {
            case '1':
                urlKey = UrlKey.Url1;
                break;
            case '2':
                urlKey = UrlKey.Url2;
                break;
            case '3':
                urlKey = UrlKey.Url3;
                break;
            default:
                break;
        }
    }
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            error: `Invalid ID: ${id} !`,
        });
    }
    // search sectionGallery with designated id.
    const sectionGallery = await models_1.SectionGallery.findById(id);
    if (!sectionGallery) {
        return res.status(404).json({ error: 'Section gallery not found' });
    }
    if (sectionGallery && req.files !== null && req.files !== undefined) {
        const temporaryFile = req.files.image;
        try {
            let imageUrl;
            // If 'url' parameter is provided, update the corresponding property
            if (sectionGallery[urlKey]) {
                const imageURLArray = sectionGallery[urlKey].split('/');
                const imageName = imageURLArray[imageURLArray.length - 1];
                const [publicImageID] = imageName.split('.');
                await cloudinary_1.v2.uploader.destroy(`section_gallery/${publicImageID}`);
            }
            // Upload to Cloudinary
            const responseCloudinary = await cloudinary_1.v2.uploader.upload(temporaryFile.tempFilePath, {
                folder: 'section_gallery',
                overwrite: true,
            });
            imageUrl = responseCloudinary.secure_url;
            sectionGallery[urlKey] = imageUrl;
            await sectionGallery.save();
            return res.status(200).json({
                message: 'Section gallery updated successfully !',
                section: {
                    id: sectionGallery.id,
                    url1: sectionGallery.url1,
                    alt1: sectionGallery.alt1,
                    caption1: sectionGallery.caption1,
                    captionSize1: sectionGallery.captionSize1,
                    url2: sectionGallery.url2,
                    alt2: sectionGallery.alt2,
                    caption2: sectionGallery.caption2,
                    captionSize2: sectionGallery.captionSize2,
                    url3: sectionGallery.url3,
                    alt3: sectionGallery.alt3,
                    caption3: sectionGallery.caption3,
                    captionSize3: sectionGallery.captionSize3,
                }
            });
        }
        catch (error) {
            console.error('Cloudinary upload error:', error);
            throw helpers_1.CustomError.internalServer('Error while uploading Section Gallery,\n' + error);
        }
    }
    else {
        return res.status(400).json({ error: 'Uploading Image must be included' });
    }
};
exports.uploadSectionGallery = uploadSectionGallery;
const deleteSectionGallery = async (req, res) => {
    const sectionId = req.params.id;
    if (!mongoose_1.Types.ObjectId.isValid(sectionId)) {
        return res.status(400).json({ error: `Invalid ID: ${sectionId} !` });
    }
    try {
        // Delete the sectionGallery itself
        // search sectionImage with designated id.
        const sectionGallery = await models_1.SectionGallery.findById(sectionId);
        if (!sectionGallery) {
            return res.status(404).json({ error: 'Section gallery not found' });
        }
        // delete previous image
        const urls = [sectionGallery.url1, sectionGallery.url2, sectionGallery.url3];
        for (const url of urls) {
            if (url) {
                const imageURLArray = url.split('/');
                const imageName = imageURLArray[imageURLArray.length - 1];
                const [publicImageID] = imageName.split('.');
                await cloudinary_1.v2.uploader.destroy(`section_gallery/${publicImageID}`);
            }
        }
        await models_1.SectionGallery.findByIdAndDelete(sectionId);
        // Find the portfolio that contains a section with the given sectionId
        const portfolio = await models_1.Portfolio.findOne({ 'sections.item': sectionId });
        if (!portfolio) {
            return res.status(404).json({ error: 'Portfolio not found !' });
        }
        // Find the index of the section with the given sectionId in the portfolio's sections array
        const sectionIndex = portfolio.sections.findIndex(section => section.item.toString() === sectionId);
        if (sectionIndex === -1) {
            return res.status(404).json({ error: 'Section not found in portfolio !' });
        }
        // Remove the section from the portfolio's sections array
        portfolio.sections.splice(sectionIndex, 1);
        await portfolio.save();
        return res.status(200).json({ message: 'Section Gallery deleted successfully 👍' });
    }
    catch (error) {
        throw helpers_1.CustomError.internalServer('Error while deleting the Section Gallery,\n' + error);
    }
};
exports.deleteSectionGallery = deleteSectionGallery;
//# sourceMappingURL=section-gallery.controller.js.map