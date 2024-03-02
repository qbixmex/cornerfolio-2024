import { Request, Response } from 'express';
import { SectionImageText} from '../models';
import { from } from 'env-var';

export const getSectionImageTexts = async (req: Request, res: Response): Promise<void> => {
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
        res.status(200).json(sections);
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
};

export const createSectionImageText = async (req: Request, res: Response): Promise<void> => {
    try {
        const newSectionImageText = new SectionImageText();
        await newSectionImageText.save();

        res.status(201).json({
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
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updateSectionImageText = async (req: Request, res: Response): Promise<void> => {
    try {
        const sectionImageTextId = req.params.id;
        const payload = req.body;
        
        const sectionImageText = await SectionImageText.findById(sectionImageTextId);
        
        if (!sectionImageText) {
            res.status(404).json({ message: 'Section image-text not found' });
            return;
        }
        
        //? Note: if you pass undefined to a field, it will not be updated.
        sectionImageText.imgUrl = payload.imgUrl ?? undefined;
        sectionImageText.imgAlt = payload.imgAlt ?? undefined;
        sectionImageText.imgCaption = payload.imgCaption ?? undefined;
        sectionImageText.txtHeading = payload.txtHeading ?? undefined;
        sectionImageText.txtContent = payload.txtContent ?? undefined;
        sectionImageText.position = payload.position ?? undefined;

        await sectionImageText.save();

        res.status(200).json({
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

    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteSectionImageText = async (req: Request, res: Response): Promise<void> => {
    try {
        const sectionImageTextId = req.params.id;
        await SectionImageText.findByIdAndDelete(sectionImageTextId);
        res.status(200).json({ message: 'Section image-text deleted successfully' });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};