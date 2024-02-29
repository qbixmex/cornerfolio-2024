import { Request, Response } from 'express';
import { SectionText} from '../models';
import { from } from 'env-var';

// section text list
export const getSectionTexts = async (req: Request, res: Response): Promise<void> => {
    // auth middleware
    try {
        const sectionTexts = await SectionText.find();
        res.status(200).json(sectionTexts);
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
};

// create section text
export const createSectionText = async (req: Request, res: Response): Promise<void> => {
    // auth middleware
    try {
        const newSectionText = new SectionText();
        await newSectionText.save();

        // here, add newSectionText.id in portfolio.sections:[].
        res.status(201).json(newSectionText);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// update section text
export const updateSectionText = async (req: Request, res: Response): Promise<void> => {
    // auth middleware
    try {
        const sectionTextId = req.params.id;
        const { heading, content, position } = req.body;
        
        // search sectionText with designated id.
        const sectionText = await SectionText.findById(sectionTextId);
        if (!sectionText) {
            res.status(404).json({ message: 'Section text not found' });
            return;
        }
        //change data
        sectionText.heading = heading ? heading : sectionText.heading;
        sectionText.content = content ? content : sectionText.content;
        sectionText.position = position ? position : sectionText.position;

        // save update
        await sectionText.save();
        res.status(200).json(sectionText);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};


// delete section text
export const deleteSectionText = async (req: Request, res: Response): Promise<void> => {
    try {
        const sectionTextId = req.params.id;
        // delete section with sectionTextId
        await SectionText.findByIdAndDelete(sectionTextId);
        res.status(200).json({ message: 'Section text deleted successfully' });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};