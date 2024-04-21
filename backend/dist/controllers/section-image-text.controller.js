"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSectionImageText = exports.uploadSectionImageText = exports.updateSectionImageText = exports.createSectionImageText = exports.getSectionImageTexts = void 0;
const models_1 = require("../models");
const helpers_1 = require("../helpers");
const mongoose_1 = require("mongoose");
const cloudinary_1 = require("cloudinary");
const getSectionImageTexts = async (req, res) => {
    try {
        const SectionImageTexts = await models_1.SectionImageText.find();
        const sections = SectionImageTexts.map(sectionImageText => {
            return {
                id: sectionImageText.id,
                imgUrl: sectionImageText.imgUrl,
                imgAlt: sectionImageText.imgAlt,
                imgCaption: sectionImageText.imgCaption,
                imgCaptionSize: sectionImageText.imgCaptionSize,
                txtHeading: sectionImageText.txtHeading,
                txtContent: sectionImageText.txtContent,
                txtHeadingSize: sectionImageText.txtHeadingSize,
                txtContentSize: sectionImageText.txtContentSize,
                position: sectionImageText.position,
            };
        });
        return res.status(200).json(sections);
    }
    catch (error) {
        throw helpers_1.CustomError.internalServer('Error while fetching Section Image Texts,\n' + error);
    }
};
exports.getSectionImageTexts = getSectionImageTexts;
const createSectionImageText = async (req, res) => {
    try {
        const { portfolioId } = req.params;
        const order = req.query.order;
        const portfolio = await models_1.Portfolio.findById(portfolioId);
        if (!portfolio) {
            return res.status(404).json({ error: 'Portfolio not found !' });
        }
        const newSectionImageText = new models_1.SectionImageText();
        await newSectionImageText.save();
        if (order && !isNaN(parseInt(order))) {
            const index = parseInt(order);
            if (index >= 0 && index <= portfolio.sections.length) {
                portfolio.sections.splice(index, 0, {
                    kind: 'SectionImageText',
                    item: newSectionImageText._id
                });
            }
            else {
                portfolio.sections.push({
                    kind: 'SectionImageText',
                    item: newSectionImageText._id
                });
            }
        }
        else {
            portfolio.sections.push({
                kind: 'SectionImageText',
                item: newSectionImageText._id
            });
        }
        await portfolio.save();
        const responseData = {
            message: 'Section text-image created successfully 👍 !',
            section: {
                id: newSectionImageText.id,
                imgUrl: newSectionImageText.imgUrl,
                imgAlt: newSectionImageText.imgAlt,
                imgCaption: newSectionImageText.imgCaption,
                imgCaptionSize: newSectionImageText.imgCaptionSize,
                txtHeading: newSectionImageText.txtHeading,
                txtContent: newSectionImageText.txtContent,
                txtHeadingSize: newSectionImageText.txtHeadingSize,
                txtContentSize: newSectionImageText.txtContentSize,
                position: newSectionImageText.position,
            }
        };
        return res.status(201).json(responseData);
    }
    catch (error) {
        throw helpers_1.CustomError.internalServer('Error while creating Section Image Text,\n' + error);
    }
};
exports.createSectionImageText = createSectionImageText;
const updateSectionImageText = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            error: `Invalid ID: ${id} !`,
        });
    }
    const sectionImageText = await models_1.SectionImageText.findById(id);
    if (!sectionImageText) {
        return res.status(404).json({ error: 'Section Image Text not found' });
    }
    try {
        const payload = req.body;
        //? Note: if you pass undefined to a field, it will not be updated.
        sectionImageText.imgUrl = payload.imgUrl !== undefined ? payload.imgUrl : sectionImageText.imgUrl;
        sectionImageText.imgAlt = payload.imgAlt !== undefined ? payload.imgAlt : sectionImageText.imgAlt;
        sectionImageText.imgCaption = payload.imgCaption !== undefined ? payload.imgCaption : sectionImageText.imgCaption;
        sectionImageText.imgCaptionSize = payload.imgCaptionSize !== undefined ? payload.imgCaptionSize : sectionImageText.imgCaptionSize;
        sectionImageText.txtHeading = payload.txtHeading !== undefined ? payload.txtHeading : sectionImageText.txtHeading;
        sectionImageText.txtContent = payload.txtContent !== undefined ? payload.txtContent : sectionImageText.txtContent;
        sectionImageText.txtHeadingSize = payload.txtHeadingSize !== undefined ? payload.txtHeadingSize : sectionImageText.txtHeadingSize;
        sectionImageText.txtContentSize = payload.txtContentSize !== undefined ? payload.txtContentSize : sectionImageText.txtContentSize;
        sectionImageText.position = payload.position !== undefined ? payload.position : sectionImageText.position;
        await sectionImageText.save();
        return res.status(200).json({
            message: 'Section text-image updated successfully 👍 !',
            section: {
                id: sectionImageText.id,
                imgUrl: sectionImageText.imgUrl,
                imgAlt: sectionImageText.imgAlt,
                imgCaption: sectionImageText.imgCaption,
                imgCaptionSize: sectionImageText.imgCaptionSize,
                txtHeading: sectionImageText.txtHeading,
                txtContent: sectionImageText.txtContent,
                txtHeadingSize: sectionImageText.txtHeadingSize,
                txtContentSize: sectionImageText.txtContentSize,
                position: sectionImageText.position,
            }
        });
    }
    catch (error) {
        throw helpers_1.CustomError.internalServer('Error while updating Section Image Text,\n' + error);
    }
};
exports.updateSectionImageText = updateSectionImageText;
const uploadSectionImageText = async (req, res) => {
    const id = req.params.id;
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            error: `Invalid ID: ${id} !`,
        });
    }
    // search sectionImage with designated id.
    const sectionImageText = await models_1.SectionImageText.findById(id);
    if (!sectionImageText) {
        return res.status(404).json({ error: 'Section image not found' });
    }
    if (sectionImageText && req.files !== null && req.files !== undefined) {
        const temporaryFile = req.files.image;
        try {
            //* Delete previous image
            if (sectionImageText.imgUrl) {
                //* Example URL from cloudinary.
                //? "https://res.cloudinary.com/qbixmex/image/upload/v1710393039/users/mwvwm92ivurc6gaovkfl.jpg",
                //* Split the URL by '/' to get in an array all url segments.
                const imageURLArray = sectionImageText.imgUrl.split('/');
                //* Then get the last segment of the array to get the image name.
                //* NOTE: The last segment is the image id with the extension.
                const imageName = imageURLArray[imageURLArray.length - 1];
                //* Split the image name by '.' to get the public image id.
                const [publicImageID] = imageName.split('.');
                //* Then we need to remove the old image from cloudinary.
                await cloudinary_1.v2.uploader.destroy(`section_image_text/${publicImageID}`);
            }
            //* Upload to Cloudinary
            const responseCloudinary = await cloudinary_1.v2.uploader.upload(temporaryFile.tempFilePath, {
                folder: 'section_image_text',
                overwrite: true,
            });
            const imageUrl = responseCloudinary.secure_url;
            sectionImageText.imgUrl = imageUrl;
            await sectionImageText.save();
            return res.status(200).json({
                message: 'Section image-text updated successfully !',
                section: {
                    id: sectionImageText.id,
                    imgUrl: sectionImageText.imgUrl,
                    imgAlt: sectionImageText.imgAlt,
                    imgCaption: sectionImageText.imgCaption,
                    imgCaptionSize: sectionImageText.imgCaptionSize,
                    txtHeading: sectionImageText.txtHeading,
                    txtContent: sectionImageText.txtContent,
                    txtHeadingSize: sectionImageText.txtHeadingSize,
                    txtContentSize: sectionImageText.txtContentSize,
                    position: sectionImageText.position
                }
            });
        }
        catch (error) {
            console.error('Cloudinary upload error:', error);
            throw helpers_1.CustomError.internalServer('Error while uploading Section Image Text,\n' + error);
        }
    }
    else {
        return res.status(400).json({ error: 'Uploading Image must be contained' });
    }
};
exports.uploadSectionImageText = uploadSectionImageText;
const deleteSectionImageText = async (req, res) => {
    const sectionId = req.params.id;
    if (!mongoose_1.Types.ObjectId.isValid(sectionId)) {
        return res.status(400).json({ error: `Invalid ID: ${sectionId} !` });
    }
    try {
        //* Delete the sectionImageText itself
        await models_1.SectionImageText.findByIdAndDelete(sectionId);
        //* Find the portfolio that contains a section with the given sectionId
        const portfolio = await models_1.Portfolio.findOne({ 'sections.item': sectionId });
        if (!portfolio) {
            return res.status(404).json({ error: 'Portfolio not found !' });
        }
        //* Find the index of the section with the given sectionId in the portfolio's sections array
        const sectionIndex = portfolio.sections.findIndex(section => section.item.toString() === sectionId);
        if (sectionIndex === -1) {
            return res.status(404).json({ error: 'Section not found in portfolio !' });
        }
        //* Remove the section from the portfolio's sections array
        portfolio.sections.splice(sectionIndex, 1);
        await portfolio.save();
        return res.status(200).json({ message: 'Section ImageText deleted successfully 👍' });
    }
    catch (error) {
        throw helpers_1.CustomError.internalServer('Error while deleting the Section ImageText,\n' + error);
    }
};
exports.deleteSectionImageText = deleteSectionImageText;
//# sourceMappingURL=section-image-text.controller.js.map