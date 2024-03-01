import { Request, Response } from 'express';
import { SectionText} from '../models';
import { from } from 'env-var';

export const getSectionTexts = async (req: Request, res: Response): Promise<void> => {
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
        res.status(200).json(sections);
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
};

export const createSectionText = async (req: Request, res: Response): Promise<void> => {
    try {
        const newSectionText = new SectionText();
        await newSectionText.save();

        res.status(201).json({
            message: 'Section text created successfully !',
            section: {
                id: newSectionText.id,
                heading: newSectionText.heading,
                content: newSectionText.content,
                position: newSectionText.position,
            }
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updateSectionText = async (req: Request, res: Response): Promise<void> => {
    try {
        const sectionTextId = req.params.id;
        const payload = req.body;
        
        const sectionText = await SectionText.findById(sectionTextId);

        if (!sectionText) {
            res.status(404).json({ message: 'Section text not found' });
            return;
        }

        //? Note: if you pass undefined to a field, it will not be updated.
        sectionText.heading = payload.heading ?? undefined;
        sectionText.content = payload.content ?? undefined;
        sectionText.position = payload.position ?? undefined;

        await sectionText.save();

        res.status(200).json({
            message: 'Section text updated successfully !',
            section: {
                id: sectionText.id,
                heading: sectionText.heading,
                content: sectionText.content,
                position: sectionText.position,
            }
        });

    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteSectionText = async (req: Request, res: Response): Promise<void> => {
    try {
        const sectionTextId = req.params.id;
        await SectionText.findByIdAndDelete(sectionTextId);
        res.status(200).json({ message: 'Section text deleted successfully' });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};