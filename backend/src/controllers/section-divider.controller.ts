import { Request, Response } from 'express';
import { CustomError } from '../helpers';
import { Types } from 'mongoose';
import { Portfolio , SectionDivider}from '../models';

export const getSectionDividers = async (req: Request, res: Response) => {
    try {
        const SectionDividers = await SectionDivider.find();
        const sections = SectionDividers.map(sectionDivider => {
            return {
                id: sectionDivider.id,
                title: sectionDivider.title,
            };
        });
        return res.status(200).json(sections);
    } catch (error) {
        throw CustomError.internalServer('Error while fetching the Section Dividers,\n' + error);
    }
};

export const createSectionDivider = async (req: Request, res: Response) => {
    try {
        const {portfolioId} =req.params;
        const portfolio = await Portfolio.findById(portfolioId);
        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio not found' });
        }

        const newSectionDivider = new SectionDivider();
        await newSectionDivider.save();

        portfolio.sections.push({
            kind: 'SectionDivider',
            item: newSectionDivider.id
        });

        await portfolio.save()

        return res.status(201).json({
            message: 'Section divider created successfully 👍 !',
            section: {
                id: newSectionDivider.id,
                title: newSectionDivider.title,
            }
        });
    } catch (error) {
        throw CustomError.internalServer('Error while creating the Section Divider,\n' + error);
    }
};

export const updateSectionDivider = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).json({
              error: `Invalid ID: ${id} !`,
            });
        }
        
        const sectionDivider = await SectionDivider.findById(id);
        
        if (!sectionDivider) {
            return res.status(404).json({ error: 'Section Divider not found' });
        }

        const payload = req.body;
        
        //? Note: if you pass undefined to a field, it will not be updated.
        sectionDivider.title = payload.title ?? undefined;
        
        await sectionDivider.save();

        return res.status(200).json({
            message: 'Section divider updated successfully 👍 !',
            section: {
                id: sectionDivider.id,
                title: sectionDivider.title,
            }
        });
    } catch (error) {
        throw CustomError.internalServer('Error while deleting the Section Divider,\n' + error);
    }
};

export const deleteSectionDivider = async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          error: `Invalid ID: ${id} !`,
        });
    }

    const sectionDivider = await SectionDivider.countDocuments({ _id: id });

    if (!sectionDivider) {
        return res.status(404).json({ error: 'Section Divider not found !' });
    }

    try {
        await SectionDivider.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Section Divider deleted successfully 👍' });
    } catch (error) {
        throw CustomError.internalServer('Error while deleting the Section Divider,\n' + error);
    }
};