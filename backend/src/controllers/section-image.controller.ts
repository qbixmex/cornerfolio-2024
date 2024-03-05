import { Request, Response } from 'express';
import { SectionImage} from '../models';
import { CustomError } from '../helpers';
import { Types } from 'mongoose';

export const getSectionImages = async (req: Request, res: Response) => {
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
        return res.status(200).json(sections);
    } catch (error) {
        throw CustomError.internalServer('Error while fetching Section Images,\n' + error);
    }
};

export const createSectionImage = async (req: Request, res: Response) => {
    try {
        const newSectionImage = new SectionImage();
        await newSectionImage.save();

        return res.status(201).json({
            message: 'Section image created successfully !',
            section: {
                id: newSectionImage.id,
                url: newSectionImage.url,
                alt: newSectionImage.alt,
                caption: newSectionImage.caption,
                position: newSectionImage.position,
            }
        });

    } catch (error) {
        throw CustomError.internalServer('Error while creating Section Image,\n' + error);
    }
};

export const updateSectionImage = async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          error: `Invalid ID: ${id} !`,
        });
    }

    // search sectionImage with designated id.
    const sectionImage = await SectionImage.findById(id);
    
    if (!sectionImage) {
        return res.status(404).json({ error: 'Section image not found' });
    }

    try {
        const payload = req.body;

        //? Note: if you pass undefined to a field, it will not be updated.
        sectionImage.url = payload.url ?? undefined;
        sectionImage.alt = payload.alt ?? undefined;
        sectionImage.caption = payload.caption ?? undefined;
        sectionImage.position = payload.position ?? undefined;

        await sectionImage.save();

        return res.status(200).json({
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
        throw CustomError.internalServer('Error while updating Section Image,\n' + error);
    }
};

export const deleteSectionImage = async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          error: `Invalid ID: ${id} !`,
        });
    }

    const sectionImage = await SectionImage.countDocuments({ _id: id });

    if (!sectionImage) {
        return res.status(404).json({ error: 'Section Image not found !' });
    }

    try {
        await SectionImage.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Section image deleted successfully' });
    } catch (error) {
        throw CustomError.internalServer('Error while deleting Section Image,\n' + error);
    }
};
