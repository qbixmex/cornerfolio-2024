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

export const createSectionDivider = async (
    req: Request<never, never, never, { order?: string; }>,
    res: Response
) => {
    try {
        const { portfolioId } = req.params;
        const order = req.query.order;

        const portfolio = await Portfolio.findById(portfolioId);

        if (!portfolio) {
            return res.status(404).json({ error: 'Portfolio not found !' });
        }

        const newSectionDivider = new SectionDivider();
        await newSectionDivider.save();

        if (order && !isNaN(parseInt(order))) {
            const index = parseInt(order);
            if (index >= 0 && index <= portfolio.sections.length) {
                portfolio.sections.splice(index, 0, {
                    kind: 'SectionDivider',
                    item: newSectionDivider._id
                });
            } else {
                portfolio.sections.push({
                    kind: 'SectionDivider',
                    item: newSectionDivider._id
                });
            }
        } else {
            portfolio.sections.push({
                kind: 'SectionDivider',
                item: newSectionDivider._id
            });
        }

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
    const sectionId = req.params.id;

    if (!Types.ObjectId.isValid(sectionId)) {
        return res.status(400).json({
          error: `Invalid ID: ${sectionId} !`,
        });
    }

    try {
        // Delete the sectionDivider itself
        await SectionDivider.findByIdAndDelete(sectionId);

        // Find the portfolio that contains a section with the given sectionId
        const portfolio = await Portfolio.findOne({ 'sections.item': sectionId });
        if (!portfolio) {
            return res.status(404).json({ error: 'Portfolio not found !' });
        }
        console.log("debug portfolio",portfolio.id)

        // Find the index of the section with the given sectionId in the portfolio's sections array
        const sectionIndex = portfolio.sections.findIndex(section => section.item.toString() === sectionId);
        if (sectionIndex === -1) {
            return res.status(404).json({ error: 'Section not found in portfolio !' });
        }

        // Remove the section from the portfolio's sections array
        portfolio.sections.splice(sectionIndex, 1);
        await portfolio.save();

        return res.status(200).json({ message: 'Section Divider deleted successfully 👍' });
    } catch (error) {
        throw CustomError.internalServer('Error while deleting the Section Divider,\n' + error);
    }
};