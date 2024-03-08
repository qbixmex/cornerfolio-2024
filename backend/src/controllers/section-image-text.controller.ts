import { Request, Response } from 'express';
import { Portfolio, SectionImageText} from '../models';
import { CustomError } from '../helpers';
import { Types } from 'mongoose';

export const getSectionImageTexts = async (req: Request, res: Response) => {
    try {
        const SectionImageTexts = await SectionImageText.find();
        const sections =SectionImageTexts.map(sectionImageText =>{
            return{
                id: sectionImageText.id,
                imgUrl: sectionImageText.imgUrl,
                imgAlt: sectionImageText.imgAlt,
                imgCaption: sectionImageText.imgCaption,
                txtHeading: sectionImageText.txtHeading,
                txtContent: sectionImageText.txtContent,
                position: sectionImageText.position,
            }
        })
        return res.status(200).json(sections);
    } catch (error) {
        throw CustomError.internalServer('Error while fetching Section Image Texts,\n' + error);
    }
};

export const createSectionImageText = async (
    req: Request<never, never, never, { order?: string }>,
    res: Response
) => {
    try {
        const {portfolioId} = req.params;
        const order = req.query.order;
        const portfolio = await Portfolio.findById(portfolioId);

        if (!portfolio) {
            return res.status(404).json({ error: 'Portfolio not found !' });
        }

        const newSectionImageText = new SectionImageText();
        await newSectionImageText.save();

        if (order && !isNaN(parseInt(order))) {
            const index = parseInt(order);
            if (index >= 0 && index <= portfolio.sections.length) {
                portfolio.sections.splice(index, 0, {
                    kind: 'SectionImageText',
                    item: newSectionImageText._id
                });
            } else {
                portfolio.sections.push({
                    kind: 'SectionImageText',
                    item: newSectionImageText._id
                });
            }
        } else {
            portfolio.sections.push({
                kind: 'SectionImageText',
                item: newSectionImageText._id
            });
        }

        await portfolio.save()

        const responseData ={
            message: 'Section text-image created successfully 👍 !',
            section: {
                id: newSectionImageText.id,
                imgUrl: newSectionImageText.imgUrl,
                imgAlt: newSectionImageText.imgAlt,
                imgCaption: newSectionImageText.imgCaption,
                txtHeading: newSectionImageText.txtHeading,
                txtContent: newSectionImageText.txtContent,
                position: newSectionImageText.position,
            }
        }

        return res.status(201).json(responseData);
    } catch (error) {
        throw CustomError.internalServer('Error while creating Section Image Text,\n' + error);
    }
};

export const updateSectionImageText = async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          error: `Invalid ID: ${id} !`,
        });
    }

    const sectionImageText = await SectionImageText.findById(id);
    
    if (!sectionImageText) {
        return res.status(404).json({ error: 'Section Image Text not found' });
    }

    try {
        const payload = req.body;
        
        //? Note: if you pass undefined to a field, it will not be updated.
        sectionImageText.imgUrl = payload.imgUrl ?? undefined;
        sectionImageText.imgAlt = payload.imgAlt ?? undefined;
        sectionImageText.imgCaption = payload.imgCaption ?? undefined;
        sectionImageText.txtHeading = payload.txtHeading ?? undefined;
        sectionImageText.txtContent = payload.txtContent ?? undefined;
        sectionImageText.position = payload.position ?? undefined;

        await sectionImageText.save();

        return res.status(200).json({
            message: 'Section text-image updated successfully 👍 !',
            section: {
                id: sectionImageText.id,
                imgUrl: sectionImageText.imgUrl,
                imgAlt: sectionImageText.imgAlt,
                imgCaption: sectionImageText.imgCaption,
                txtHeading: sectionImageText.txtHeading,
                txtContent: sectionImageText.txtContent,
                position: sectionImageText.position,
            }
        });

    } catch (error) {
        throw CustomError.internalServer('Error while updating Section Image Text,\n' + error);
    }
};

export const deleteSectionImageText = async (req: Request, res: Response) => {
    const sectionId = req.params.id;

    if (!Types.ObjectId.isValid(sectionId)) {
        return res.status(400).json({ error: `Invalid ID: ${sectionId} !` });
    }

    try {
        // Delete the sectionImageText itself
        await SectionImageText.findByIdAndDelete(sectionId);
        
        // Find the portfolio that contains a section with the given sectionId
        const portfolio = await Portfolio.findOne({ 'sections.item': sectionId });

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

        return res.status(200).json({ message: 'Section ImageText deleted successfully 👍' });
    } catch (error) {
        throw CustomError.internalServer('Error while deleting the Section ImageText,\n' + error);
    }
};