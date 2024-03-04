import { Request, Response } from 'express';
import { SectionDivider} from '../models';
import { from } from 'env-var';

export const getSectionDividers = async (req: Request, res: Response): Promise<{id:string; title:string}[]> => {
    try {
        const SectionDividers = await SectionDivider.find();
        const sections = SectionDividers.map(sectionDivider => {
            return {
                id: sectionDivider.id,
                title: sectionDivider.title,
            };
        });
        res.status(200).json(sections);
        return sections
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        throw error
    }
};

export const createSectionDivider = async (req: Request, res: Response): Promise<{ message: string; section: { id: string; title: string; } }> => {
    try {
        const newSectionDivider = new SectionDivider();
        await newSectionDivider.save();

        const responseData = {
            message: 'Section divider created successfully !',
            section: {
                id: newSectionDivider.id,
                title: newSectionDivider.title,
            }
        };

        res.status(201).json(responseData);

        return responseData;
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }

        throw error;
    }
};

export const updateSectionDivider = async (req: Request, res: Response): Promise<void> => {
    try {
        const sectionDividerId = req.params.id;
        const payload = req.body;
        
        const sectionDivider = await SectionDivider.findById(sectionDividerId);
        
        if (!sectionDivider) {
            res.status(404).json({ error: 'Section divider not found' });
            return;
        }
        
        //? Note: if you pass undefined to a field, it will not be updated.
        sectionDivider.title = payload.title ?? undefined;
        
        await sectionDivider.save();

        res.status(200).json({
            message: 'Section divider updated successfully !',
            section: {
                id: sectionDivider.id,
                title: sectionDivider.title,
            }
        });
    } catch (error) {
        if(error instanceof Error){
            res.status(400).json({ error: error.message });
        }

        throw error
    }
};

export const deleteSectionDivider = async (req: Request, res: Response): Promise<void> => {
    try {
        const sectionDividerId = req.params.id;
        await SectionDivider.findByIdAndDelete(sectionDividerId);
        res.status(200).json({ message: 'Section divider deleted successfully' });
    } catch (error) {
        if(error instanceof Error){
            res.status(400).json({ error: error.message });
        }

        throw error
    }
};