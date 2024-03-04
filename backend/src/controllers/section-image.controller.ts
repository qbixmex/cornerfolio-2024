import { Request, Response } from 'express';
import { SectionImage} from '../models';
import { from } from 'env-var';

export const getSectionImages = async (req: Request, res: Response)
: Promise<{id:string; url:string; alt:string; caption:string; position: "left" | "center" | "right"}[]> => {
    try {
        const sectionImages = await SectionImage.find();
        const sections = sectionImages.map(sectionImage => {
            return {
                id: sectionImage.id,
                url: sectionImage.url,
                alt: sectionImage.alt,
                caption: sectionImage.caption,
                position: sectionImage.position,
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

export const createSectionImage = async (req: Request, res: Response)
: Promise<{message:string; section: {id:string; url:string; alt:string; caption:string; position: "left" | "center" | "right"}}> => {
    try {
        const newSectionImage = new SectionImage();
        await newSectionImage.save();

        const responseData = {
            message: 'Section image created successfully !',
            section: {
                id: newSectionImage.id,
                url: newSectionImage.url,
                alt: newSectionImage.alt,
                caption: newSectionImage.caption,
                position: newSectionImage.position,
            }
        }

        res.status(201).json( responseData);
        return responseData
    } catch (error) {
        if (error instanceof Error){
            res.status(400).json({ error: error.message });
        }
        throw error
    }
};

export const updateSectionImage = async (req: Request, res: Response): Promise<void> => {
    try {
        const sectionImageId = req.params.id;
        const payload = req.body;
        
        // search sectionImage with designated id.
        const sectionImage = await SectionImage.findById(sectionImageId);
        
        if (!sectionImage) {
            res.status(404).json({ message: 'Section image not found' });
            return;
        }

        //? Note: if you pass undefined to a field, it will not be updated.
        sectionImage.url = payload.url ?? undefined;
        sectionImage.alt = payload.alt ?? undefined;
        sectionImage.caption = payload.caption ?? undefined;
        sectionImage.position = payload.position ?? undefined;

        await sectionImage.save();

        res.status(200).json({
            message: 'Section image updated successfully !',
            section:{
                id:sectionImage.id,
                url: sectionImage.url,
                alt: sectionImage.alt,
                caption: sectionImage.caption,
                position: sectionImage.position
            }
        });
    } catch (error) {
        if (error instanceof Error){
            res.status(400).json({ error: error.message });
        }
        throw error
    }
};

export const deleteSectionImage = async (req: Request, res: Response): Promise<void> => {
    try {
        const sectionImageId = req.params.id;
        await SectionImage.findByIdAndDelete(sectionImageId);
        res.status(200).json({ message: 'Section image deleted successfully' });
    } catch (error) {
        if (error instanceof Error){
            res.status(400).json({ error: error.message });
        }
        throw error
    }
};