"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSectionImage = exports.uploadSectionImage = exports.updateSectionImage = exports.createSectionImage = exports.getSectionImages = void 0;
const mongoose_1 = require("mongoose");
const cloudinary_1 = require("cloudinary");
const models_1 = require("../models");
const helpers_1 = require("../helpers");
const getSectionImages = async (req, res) => {
    try {
        const sectionImages = await models_1.SectionImage.find();
        const sections = sectionImages.map(sectionImage => {
            return {
                id: sectionImage.id,
                url: sectionImage.url,
                alt: sectionImage.alt,
                caption: sectionImage.caption,
                captionSize: sectionImage.captionSize,
                position: sectionImage.position,
            };
        });
        return res.status(200).json(sections);
    }
    catch (error) {
        throw helpers_1.CustomError.internalServer('Error while fetching Section Images,\n' + error);
    }
};
exports.getSectionImages = getSectionImages;
const createSectionImage = async (req, res) => {
    try {
        const { portfolioId } = req.params;
        const order = req.query.order;
        const portfolio = await models_1.Portfolio.findById(portfolioId);
        if (!portfolio) {
            return res.status(404).json({ error: 'Portfolio not found !' });
        }
        const newSectionImage = new models_1.SectionImage();
        await newSectionImage.save();
        if (order && !isNaN(parseInt(order))) {
            const index = parseInt(order);
            if (index >= 0 && index <= portfolio.sections.length) {
                portfolio.sections.splice(index, 0, {
                    kind: 'SectionImage',
                    item: newSectionImage._id
                });
            }
            else {
                portfolio.sections.push({
                    kind: 'SectionImage',
                    item: newSectionImage._id
                });
            }
        }
        else {
            portfolio.sections.push({
                kind: 'SectionImage',
                item: newSectionImage._id
            });
        }
        await portfolio.save();
        return res.status(201).json({
            message: 'Section image created successfully !',
            section: {
                id: newSectionImage.id,
                url: newSectionImage.url,
                alt: newSectionImage.alt,
                caption: newSectionImage.caption,
                captionSize: newSectionImage.captionSize,
                position: newSectionImage.position,
            }
        });
    }
    catch (error) {
        throw helpers_1.CustomError.internalServer('Error while creating Section Image,\n' + error);
    }
};
exports.createSectionImage = createSectionImage;
const updateSectionImage = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            error: `Invalid ID: ${id} !`,
        });
    }
    // search sectionImage with designated id.
    const sectionImage = await models_1.SectionImage.findById(id);
    if (!sectionImage) {
        return res.status(404).json({ error: 'Section image not found' });
    }
    try {
        const payload = req.body;
        //? Note: if you pass undefined to a field, it will not be updated.
        sectionImage.url = payload.url !== undefined ? payload.url : sectionImage.url;
        sectionImage.alt = payload.alt !== undefined ? payload.alt : sectionImage.alt;
        sectionImage.caption = payload.caption !== undefined ? payload.caption : sectionImage.caption;
        sectionImage.captionSize = payload.captionSize !== undefined ? payload.captionSize : sectionImage.captionSize;
        sectionImage.position = payload.position !== undefined ? payload.position : sectionImage.position;
        await sectionImage.save();
        return res.status(200).json({
            message: 'Section image updated successfully !',
            section: {
                id: sectionImage.id,
                url: sectionImage.url,
                alt: sectionImage.alt,
                caption: sectionImage.caption,
                captionSize: sectionImage.captionSize,
                position: sectionImage.position
            }
        });
    }
    catch (error) {
        throw helpers_1.CustomError.internalServer('Error while updating Section Image,\n' + error);
    }
};
exports.updateSectionImage = updateSectionImage;
const uploadSectionImage = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            error: `Invalid ID: ${id} !`,
        });
    }
    // search sectionImage with designated id.
    const sectionImage = await models_1.SectionImage.findById(id);
    if (!sectionImage) {
        return res.status(404).json({ error: 'Section image not found' });
    }
    if (sectionImage && req.files !== null && req.files !== undefined) {
        const temporaryFile = req.files.image;
        try {
            // delete previous image
            if (sectionImage.url) {
                //* Example URL from cloudinary.
                //? "https://res.cloudinary.com/qbixmex/image/upload/v1710393039/users/mwvwm92ivurc6gaovkfl.jpg",
                //* Split the URL by '/' to get in an array all url segments.
                const imageURLArray = sectionImage.url.split('/');
                //* Then get the last segment of the array to get the image name.
                //* NOTE: The last segment is the image id with the extension.
                const imageName = imageURLArray[imageURLArray.length - 1];
                //* Split the image name by '.' to get the public image id.
                const [publicImageID] = imageName.split('.');
                //* Then we need to remove the old image from cloudinary.
                await cloudinary_1.v2.uploader.destroy(`section_image/${publicImageID}`);
            }
            // upload to Cloudinary
            const responseCloudinary = await cloudinary_1.v2.uploader.upload(temporaryFile.tempFilePath, {
                folder: 'section_image',
                overwrite: true,
            });
            const imageUrl = responseCloudinary.secure_url;
            sectionImage.url = imageUrl;
            await sectionImage.save();
            return res.status(200).json({
                message: 'Section image updated successfully !',
                section: {
                    id: sectionImage.id,
                    url: sectionImage.url,
                    alt: sectionImage.alt,
                    caption: sectionImage.caption,
                    captionSize: sectionImage.captionSize,
                    position: sectionImage.position
                }
            });
        }
        catch (error) {
            console.error('Cloudinary upload error:', error);
            throw helpers_1.CustomError.internalServer('Error while uploading Section Image,\n' + error);
        }
    }
    else {
        return res.status(400).json({ error: 'Uploading Image must be included' });
    }
};
exports.uploadSectionImage = uploadSectionImage;
const deleteSectionImage = async (req, res) => {
    const sectionId = req.params.id;
    if (!mongoose_1.Types.ObjectId.isValid(sectionId)) {
        return res.status(400).json({ error: `Invalid ID: ${sectionId} !` });
    }
    try {
        // Delete the sectionImage itself
        // search sectionImage with designated id.
        const sectionImage = await models_1.SectionImage.findById(sectionId);
        if (!sectionImage) {
            return res.status(404).json({ error: 'Section image not found' });
        }
        // delete previous image
        if (sectionImage.url) {
            //* Example URL from cloudinary.
            //? "https://res.cloudinary.com/qbixmex/image/upload/v1710393039/users/mwvwm92ivurc6gaovkfl.jpg",
            //* Split the URL by '/' to get in an array all url segments.
            const imageURLArray = sectionImage.url.split('/');
            //* Then get the last segment of the array to get the image name.
            //* NOTE: The last segment is the image id with the extension.
            const imageName = imageURLArray[imageURLArray.length - 1];
            //* Split the image name by '.' to get the public image id.
            const [publicImageID] = imageName.split('.');
            //* Then we need to remove the old image from cloudinary.
            await cloudinary_1.v2.uploader.destroy(`section_image/${publicImageID}`);
        }
        await models_1.SectionImage.findByIdAndDelete(sectionId);
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
        return res.status(200).json({ message: 'Section Image deleted successfully 👍' });
    }
    catch (error) {
        throw helpers_1.CustomError.internalServer('Error while deleting the Section Image,\n' + error);
    }
};
exports.deleteSectionImage = deleteSectionImage;
//# sourceMappingURL=section-image.controller.js.map