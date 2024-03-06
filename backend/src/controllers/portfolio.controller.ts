import { Request, Response } from 'express';
import { CustomError } from '../helpers';
import { Types } from 'mongoose';
import { prototype } from 'events';
import { Portfolio,SectionDivider,SectionEmbeddedMedia,SectionImage,SectionImageText,SectionText} from '../models';
import { format } from 'path';


const { ObjectId } = require('mongodb');

export const getPortfolios = async (req: Request, res: Response) => {
    try {
        const Portfolios = await Portfolio.find();
        const portfolios = Portfolios.map(portfolio => {
            return {
                id: portfolio.id,
                header: portfolio.header,
                status: portfolio.status,
                footer: portfolio.footer,
                template: portfolio.template,
                sections: portfolio.sections,
            };
        });
        return res.status(200).json(portfolios);
    } catch (error) {
        throw CustomError.internalServer('Error while fetching the Portfolios,\n' + error);
    }
};

export const getPortfolioById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const portfolio = await Portfolio.findById(id);
        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio not found' });
        }

        const populatedSections = [];
        for (const sectionId of portfolio.sections) {
            let section = await SectionDivider.findById(sectionId);

            if (!section) {
                section = await SectionEmbeddedMedia.findById(sectionId);
            }
            if (!section) {
                section = await SectionImage.findById(sectionId);
            }
            if (!section) {
                section = await SectionImageText.findById(sectionId);
            }
            if (!section) {
                section = await SectionText.findById(sectionId);
            }
            if (!section) {
                continue;
            }
            const populatedSection = { ...section.toJSON(), id: section._id };
            delete populatedSection._id;
            delete populatedSection.__v;
            populatedSections.push(section);
        }
        
        const responsePortfolio ={
            id:portfolio.id,
            header: portfolio.header,
            status: portfolio.status,
            footer: portfolio.footer,
            template: portfolio.template,
            sections: populatedSections,
        }
        return res.status(200).json(responsePortfolio);
    } catch (error) {
        throw CustomError.internalServer('Error while fetching the Portfolio,\n' + error);
    }
};

export const createPortfolio = async (req: Request, res: Response) => {
    try {

        // temporary templateId
        const templateId= new ObjectId()

        // temporary loginUser 
        const loginUser ={
            id:"12345",
            name: "Taisei Yamaguchi",
            email: "aries0326taisei@gmail.com",
            jobTitle: "",
        }
        const header = {
            title: `Hi, I'm ${loginUser.name} software engineer`,
            subHeading: "Currently at Cornerstone, based in Vancouver"
        }

        const footer = {
            links: [`${loginUser.email}`],
            text: `© 2024 ${loginUser.name}. All rights reserved.`
        }

        const newPortfolio = new Portfolio({header,footer,template:templateId});
        await newPortfolio.save()

        return res.status(201).json({
            message: 'Portfolio created successfully !',
            portfolio: {
                id: newPortfolio.id,
                header: newPortfolio.header,
                status: newPortfolio.status,
                footer: newPortfolio.footer,
                template: newPortfolio.template,
                sections: newPortfolio.sections,
            }
        });
    } catch (error) {
        throw CustomError.internalServer('Error while creating the Portfolio,\n' + error);
    }
};

export const updatePortfolio = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                error: `Invalid ID: ${id} !`,
            });
        }
        
        const portfolio = await Portfolio.findById(id);
        
        if (!portfolio) {
            return res.status(404).json({ error: 'Portfolio not found' });
        }

        const payload = req.body;
        
        //? Note: if you pass undefined to a field, it will not be updated.
        portfolio.header = payload.header ?? undefined;
        portfolio.footer = payload.footer ?? undefined;
        
        await portfolio.save();

        return res.status(200).json({
            message: 'portfolio updated successfully !',
            section: {
                id: portfolio.id,
                header: portfolio.header,
                footer: portfolio.footer,
            }
        });
    } catch (error) {
        throw CustomError.internalServer('Error while updating the Portfolio,\n' + error);
    }
};

export const deletePortfolio = async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            error: `Invalid ID: ${id} !`,
        });
    }

    const portfolio = await Portfolio.countDocuments({ _id: id });

    if (!portfolio) {
        return res.status(404).json({ error: 'Portfolio not found !' });
    }

    try {
        await Portfolio.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Portfolio deleted successfully' });
    } catch (error) {
        throw CustomError.internalServer('Error while deleting the Portfolio,\n' + error);
    }
};

