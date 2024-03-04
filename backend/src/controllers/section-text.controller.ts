import { Request, Response } from 'express';
import { SectionText} from '../models';
import { from } from 'env-var';

export const getSectionTexts = async (req: Request, res: Response)
: Promise<{id:string; heading:string; content:string; position: "left" | "center" | "right"}[]> => {
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
        return sections
    } catch (error) {
        if (error instanceof Error){
            res.status(500).json({ error: error.message });
        }
        throw error
        
    }
};

export const createSectionText = async (req: Request, res: Response)
: Promise<{message:string; section: {id:string; heading:string; content:string; position: "left" | "center" | "right"}}> => {
    try {
        const newSectionText = new SectionText();
        await newSectionText.save();
        const responseData = {
            message: 'Section text created successfully !',
            section: {
                id: newSectionText.id,
                heading: newSectionText.heading,
                content: newSectionText.content,
                position: newSectionText.position,
            }
        }
        res.status(201).json(responseData);
        return responseData
    } catch (error) {
        if (error instanceof Error){
            res.status(400).json({ error: error.message });
        }
        throw error
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

    } catch (error) {
        if (error instanceof Error){
            res.status(400).json({ error: error.message });
        }
        throw error
    }
};

export const deleteSectionText = async (req: Request, res: Response): Promise<void> => {
    try {
        const sectionTextId = req.params.id;
        await SectionText.findByIdAndDelete(sectionTextId);
        res.status(200).json({ message: 'Section text deleted successfully' });
    } catch (error) {
        if (error instanceof Error){
            res.status(400).json({ error: error.message });
        }
        throw error
    }
};