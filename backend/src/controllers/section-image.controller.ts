import { Request, Response } from 'express';
import { Portfolio, SectionImage} from '../models';
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

export const createSectionImage = async (
    req: Request<never, never, never, { order?: string }>,
    res: Response
) => {
    try {
        const {portfolioId} = req.params;
        const order = req.query.order;

        const portfolio = await Portfolio.findById(portfolioId);

        if (!portfolio) {
            return res.status(404).json({ error: 'Portfolio not found !' });
        }

        const newSectionImage = new SectionImage();
        await newSectionImage.save();
        
        if (order && !isNaN(parseInt(order))) {
            const index = parseInt(order);
            if (index >= 0 && index <= portfolio.sections.length) {
                portfolio.sections.splice(index, 0, {
                    kind: 'SectionImage',
                    item: newSectionImage._id
                });
            } else {
                portfolio.sections.push({
                    kind: 'SectionImage',
                    item: newSectionImage._id
                });
            }
        } else {
            portfolio.sections.push({
                kind: 'SectionImage',
                item: newSectionImage._id
            });
        }

        await portfolio.save()

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
    const sectionId = req.params.id;

    if (!Types.ObjectId.isValid(sectionId)) {
        return res.status(400).json({ error: `Invalid ID: ${sectionId} !` });
    }

    try {
        // Delete the sectionImage itself
        await SectionImage.findByIdAndDelete(sectionId);
        
        // Find the portfolio that contains a section with the given sectionId
        const portfolio = await Portfolio.findOne({ 'sections.item': sectionId });

        if (!portfolio) {
            return res.status(404).json({ error: 'Portfolio not found !' });
        }

        // Find the index of the section with the given sectionId in the portfolio's sections array
        const sectionIndex = portfolio.sections.findIndex(section => section.item.toString() === sectionId);
        if (sectionIndex === -1) {
            return res.status(404).json({ error: 'Section not found in portfolio !' });
        }

        // Remove the section from the portfolio's sections array
        portfolio.sections.splice(sectionIndex, 1);
        await portfolio.save();

        return res.status(200).json({ message: 'Section Image deleted successfully 👍' });
    } catch (error) {
        throw CustomError.internalServer('Error while deleting the Section Image,\n' + error);
    }
};
