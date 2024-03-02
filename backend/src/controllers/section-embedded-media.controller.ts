import { Request, Response } from 'express';
import { SectionEmbeddedMedia} from '../models';
import { from } from 'env-var';

export const getSectionEmbeddedMedias = async (req: Request, res: Response): Promise<void> => {
    try {
        const SectionEmbeddedMedias = await SectionEmbeddedMedia.find();
        const sections = SectionEmbeddedMedias.map(SectionEmbeddedMedia => {
            return {
                id: SectionEmbeddedMedia.id,
                code: SectionEmbeddedMedia.code,
            };
        });
        res.status(200).json(sections);
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
};

export const createSectionEmbeddedMedia = async (req: Request, res: Response): Promise<void> => {
    try {
        const { code } = req.body;
        const newSectionEmbeddedMedia = new SectionEmbeddedMedia({code});
        await newSectionEmbeddedMedia.save();

        res.status(201).json({
            message: 'Section embedded media created successfully !',
            section: {
                id: newSectionEmbeddedMedia.id,
                code: newSectionEmbeddedMedia.code,
            }
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updateSectionEmbeddedMedia = async (req: Request, res: Response): Promise<void> => {
    try {
        const sectionEmbeddedMediaId = req.params.id;
        const payload = req.body;
        
        const sectionEmbeddedMedia = await SectionEmbeddedMedia.findById(sectionEmbeddedMediaId);
        
        if (!sectionEmbeddedMedia) {
            res.status(404).json({ message: 'Section embedded media not found' });
            return;
        }

        //? Note: if you pass undefined to a field, it will not be updated.
        sectionEmbeddedMedia.code = payload.code ?? undefined;
        
        await sectionEmbeddedMedia.save();
        
        res.status(200).json({
            message: 'Section embedded media updated successfully !',
            section: {
                id: sectionEmbeddedMedia.id,
                code: sectionEmbeddedMedia.code,
            }
        });

    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteSectionEmbeddedMedia = async (req: Request, res: Response): Promise<void> => {
    try {
        const sectionEmbeddedMediaId = req.params.id;
        await SectionEmbeddedMedia.findByIdAndDelete(sectionEmbeddedMediaId);
        res.status(200).json({ message: 'Section embeded media deleted successfully' });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};