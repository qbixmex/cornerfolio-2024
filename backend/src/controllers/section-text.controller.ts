import { Request, Response } from 'express';
import { SectionText} from '../models';
import { CustomError } from '../helpers';
import { Types } from 'mongoose';

export const getSectionTexts = async (req: Request, res: Response) => {
    try {
        const sectionTexts = await SectionText.find();
        const sections = sectionTexts.map(sectionText => {
            return {
                id: sectionText.id,
                heading: sectionText.heading,
                content: sectionText.content,
                position: sectionText.position
            };
        });
        return res.status(200).json(sections);
    } catch (error) {
        throw CustomError.internalServer('Error while fetching Section Texts,\n' + error);
    }
};

export const createSectionText = async (req: Request, res: Response) => {
    try {
        const newSectionText = new SectionText();
        await newSectionText.save();
        return res.status(201).json({
            message: 'Section text created successfully !',
            section: {
                id: newSectionText.id,
                heading: newSectionText.heading,
                content: newSectionText.content,
                position: newSectionText.position,
            }
        });
    } catch (error) {
        throw CustomError.internalServer('Error while creating Section Text,\n' + error);
    }
};

export const updateSectionText = async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          error: `Invalid ID: ${id} !`,
        });
    }

    const sectionText = await SectionText.findById(id);

    if (!sectionText) {
        return res.status(404).json({ error: 'Section text not found' });
    }

    try {
        const payload = req.body;

        //? Note: if you pass undefined to a field, it will not be updated.
        sectionText.heading = payload.heading ?? undefined;
        sectionText.content = payload.content ?? undefined;
        sectionText.position = payload.position ?? undefined;

        await sectionText.save();

        return res.status(200).json({
            message: 'Section text updated successfully !',
            section: {
                id: sectionText.id,
                heading: sectionText.heading,
                content: sectionText.content,
                position: sectionText.position,
            }
        });

    } catch (error) {
        throw CustomError.internalServer('Error while updating Section Text,\n' + error);
    }
};

export const deleteSectionText = async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          error: `Invalid ID: ${id} !`,
        });
    }

    const sectionTextExists = await SectionText.countDocuments({ _id: id });

    if (!sectionTextExists) {
        return res.status(404).json({ error: 'Section text not found !' });
    }

    try {
        await SectionText.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Section text deleted successfully' });
    } catch (error) {
        throw CustomError.internalServer('Error while deleting Section Text,\n' + error);
    }
};