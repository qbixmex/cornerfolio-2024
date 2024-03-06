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

export const createSectionImageText = async (req: Request, res: Response) => {
    try {
        const {portfolioId} =req.params;
        const portfolio = await Portfolio.findById(portfolioId);
        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio not found' });
        }

        const newSectionImageText = new SectionImageText();
        await newSectionImageText.save();

        portfolio.sections.push(
            newSectionImageText.id
        );
        await portfolio.save()

        const responseData ={
            message: 'Section text-image created successfully !',
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
        return res.status(404).json({ error: 'Section image-text not found' });
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
            message: 'Section text-image updated successfully !',
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
    const id = req.params.id;

    if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          error: `Invalid ID: ${id} !`,
        });
    }

    const sectionImageText = await SectionImageText.countDocuments({ _id: id });

    if (!sectionImageText) {
        return res.status(404).json({ error: 'Section Image Text not found !' });
    }

    try {
        await SectionImageText.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Section Image Text deleted successfully' });
    } catch (error) {
        throw CustomError.internalServer('Error while deleting Section Image Text,\n' + error);
    }
};