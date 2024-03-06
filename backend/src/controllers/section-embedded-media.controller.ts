import { Request, Response } from 'express';
import {Portfolio, SectionEmbeddedMedia} from '../models';
import { CustomError } from '../helpers';
import { Types } from 'mongoose';

export const getSectionEmbeddedMedias = async (req: Request, res: Response) => {
    try {
        const SectionEmbeddedMedias = await SectionEmbeddedMedia.find();
        const sections = SectionEmbeddedMedias.map(SectionEmbeddedMedia => {
            return {
                id: SectionEmbeddedMedia.id,
                code: SectionEmbeddedMedia.code,
            };
        });
        return res.status(200).json(sections);
    } catch (error) {
        throw CustomError.internalServer('Error while fetching the Section Embedded Medias,\n' + error);
    }
};

export const createSectionEmbeddedMedia = async (req: Request, res: Response) => {
    try {
        const {portfolioId} =req.params;
        const { code } = req.body;
        const portfolio = await Portfolio.findById(portfolioId);
        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio not found' });
        }
        
        const newSectionEmbeddedMedia = new SectionEmbeddedMedia({code});
        await newSectionEmbeddedMedia.save();

        portfolio.sections.push(
            newSectionEmbeddedMedia.id
        );
        await portfolio.save()

        return res.status(201).json({
            message: 'Section Embedded Media created successfully !',
            section: {
                id: newSectionEmbeddedMedia.id,
                code: newSectionEmbeddedMedia.code,
            }
        });
    } catch (error) {
        throw CustomError.internalServer('Error while creating the Section Embedded Media,\n' + error);
    }
};

export const updateSectionEmbeddedMedia = async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          error: `Invalid ID: ${id} !`,
        });
    }

    const sectionEmbeddedMedia = await SectionEmbeddedMedia.findById(id);
    
    if (!sectionEmbeddedMedia) {
        return res.status(404).json({ error: 'Section Embedded Media not found' });
    }

    try {
        const payload = req.body;

        //? Note: if you pass undefined to a field, it will not be updated.
        sectionEmbeddedMedia.code = payload.code ?? undefined;
        
        await sectionEmbeddedMedia.save();
        
        return res.status(200).json({
            message: 'Section embedded media updated successfully !',
            section: {
                id: sectionEmbeddedMedia.id,
                code: sectionEmbeddedMedia.code,
            }
        });

    } catch (error) {
        throw CustomError.internalServer('Error while updating the Section Embedded Media,\n' + error);
    }
};

export const deleteSectionEmbeddedMedia = async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          error: `Invalid ID: ${id} !`,
        });
    }

    const sectionEmbeddedMedia = await SectionEmbeddedMedia.countDocuments({ _id: id });

    if (!sectionEmbeddedMedia) {
        return res.status(404).json({ error: 'Section Embedded Media not found !' });
    }

    try {
        await SectionEmbeddedMedia.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Section embebed media deleted successfully' });
    } catch (error) {
        throw CustomError.internalServer('Error while deleting the Section Embedded Media,\n' + error);
    }
};