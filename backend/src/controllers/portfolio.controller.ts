import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';
import { CustomError, generateUniqueTinyUrlId, verifyToken } from '../helpers';
import * as Models from '../models';

export const getPortfolios = async (req: Request, res: Response) => {
	try {
		const Portfolios = await Models.Portfolio.find();
		const portfolios = Portfolios.map((portfolio) => {
			return {
				id: portfolio.id,
				portfolioTitle: portfolio.portfolioTitle,
				header: portfolio.header,
				status: portfolio.status,
				footer: portfolio.footer,
				template: portfolio.template,
				sections: portfolio.sections,
				theme: portfolio.theme,
				tinyUrlId: portfolio.tinyUrlId,
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
        if (!Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "Invalid Portfolio ID" });
        }
        const portfolio = await Models.Portfolio
            .findById(id)
            .populate({ path: "user", select: "id name email license"})
            .populate({ path: "sections.item" });
        if (!portfolio) {
            return res.status(404).json({ error: "Portfolio not found !" });
        }
        return res.status(200).json({
            id: portfolio.id,
            header: portfolio.header,
            status: portfolio.status,
            user: portfolio.user,
            sections: portfolio.sections,
            footer: portfolio.footer,
            template: portfolio.template,
            theme: portfolio.theme,
            tinyUrlId: portfolio.tinyUrlId,
        });
    } catch (error) {
        throw CustomError.internalServer("Error while fetching the Portfolio,\n" + error);
    }
};

export const getPortfolioByTinyUrlId = async (req: Request, res: Response) => {
	try {
		const { tinyUrlId } = req.params;

		const portfolio = await Models.Portfolio.findOne({ tinyUrlId })
			.populate({ path: 'user', select: 'id name email license' })
			.populate({ path: 'sections.item' });

		if (!portfolio) {
			return res.status(404).json({ error: 'Portfolio not found !' });
		}

		return res.status(200).json({
			id: portfolio.id,
			header: portfolio.header,
			status: portfolio.status,
			user: portfolio.user,
			sections: portfolio.sections,
			footer: portfolio.footer,
			template: portfolio.template,
			theme: portfolio.theme,
			tinyUrlId: portfolio.tinyUrlId,
		});
	} catch (error) {
		throw CustomError.internalServer('Error while fetching the Portfolio,\n' + error);
	}
};

export const createPortfolio = async (request: Request, response: Response) => {
	const token = request.headers.token;

	if (!token) {
		return response.status(401).json({
			error: 'Unauthorized access !',
		});
	}

	const decodedToken = await verifyToken(token as string);

	if (!decodedToken) {
		return response.status(401).json({
			error: 'Token not valid !',
		});
	}

	const userDB = await Models.User.findById(decodedToken.id).select('id name jobTitle email');

	if (!userDB) {
		return response.status(400).json({
			error: `User with id: ${decodedToken.id}, not found !`,
		});
	}

	try {
		// Temporary Template Id
		const templateId = new ObjectId();

		const portfolioTitle = `${userDB.jobTitle} portfolio`;

		const header = {
			title: `Hi, I'm ${userDB.name}, I am ${userDB.jobTitle}`,
			subHeading: 'Currently at Cornerstone, based in Vancouver',
		};

		const footer = {
			links: `${userDB.email}`,
			text: `© 2024 ${userDB?.name}. All rights reserved.`,
		};

		const tinyUrlId = await generateUniqueTinyUrlId();

		const newPortfolio = new Models.Portfolio({
			portfolioTitle,
			header,
			footer,
			user: userDB.id,
			template: templateId,
			tinyUrlId,
		});

		await newPortfolio.save();

		return response.status(201).json({
			message: 'Portfolio created successfully 👍 !',
			portfolio: {
				id: newPortfolio.id,
				portfolioTitle: newPortfolio.portfolioTitle,
				header: newPortfolio.header,
				status: newPortfolio.status,
				user: {
					id: userDB.id,
					name: userDB.name,
					jobTitle: userDB.jobTitle,
					email: userDB.email,
				},
				sections: newPortfolio.sections,
				footer: newPortfolio.footer,
				template: newPortfolio.template,
				theme: newPortfolio.theme,
				tinyUrlId: newPortfolio.tinyUrlId,
			},
		});
	} catch (error) {
		throw CustomError.internalServer('Error while creating the Portfolio,\n' + error);
	}
};

export const updatePortfolio = async (request: Request<{ id: string }>, response: Response) => {
	try {
		const id = request.params.id;

		if (!Types.ObjectId.isValid(id)) {
			return response.status(400).json({
				error: `Invalid ID: ${id} !`,
			});
		}
		const payload = request.body;

		const portfolio = await Models.Portfolio.findByIdAndUpdate(id, {
			portfolioTitle: payload.portfolioTitle ?? undefined,
			header: payload.header ?? undefined,
			sections: payload.sections ?? undefined,
			status: payload.status ?? undefined,
			footer: payload.footer ?? undefined,
			template: payload.template ?? undefined,
			theme: payload.theme ?? undefined,
		}).populate({ path: 'sections.item' });

		if (!portfolio) {
			return response.status(404).json({ error: 'Portfolio not found' });
		}

		//? Note: if you pass undefined to a field, it will not be updated.
		portfolio.header = payload.header !== undefined ? payload.header : portfolio.header;
		portfolio.footer = payload.footer !== undefined ? payload.footer : portfolio.footer;

		await portfolio.save();

		return response.status(200).json({
			message: 'Portfolio updated successfully 👍 !',
			portfolio: {
				id: portfolio.id,
				portfolioTitle: portfolio.portfolioTitle,
				header: portfolio.header,
				sections: portfolio.sections,
				status: portfolio.status,
				footer: portfolio.footer,
				template: portfolio.template,
				theme: portfolio.theme,
				tinyUrlId: portfolio.tinyUrlId,
			},
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

	const portfolio = await Models.Portfolio.countDocuments({ _id: id });

	if (!portfolio) {
		return res.status(404).json({ error: 'Portfolio not found !' });
	}

	try {
		await Models.Portfolio.findOneAndDelete({ _id: id });

		// do the same as logic in .post method....
		return res.status(200).json({ message: 'Portfolio deleted successfully 👍 !' });
	} catch (error) {
		throw CustomError.internalServer('Error while deleting the Portfolio,\n' + error);
	}
};

export const setPortfolioTheme = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const theme = req.body.theme;

		if (!Types.ObjectId.isValid(id)) {
			return res.status(400).json({
				error: `Invalid ID: ${id} !`,
			});
		}

		const portfolio = await Models.Portfolio.findByIdAndUpdate(id, {
			theme: theme ?? undefined,
		}).populate({ path: 'sections.item' });

		if (!portfolio) {
			return res.status(404).json({ error: 'Portfolio not found !' });
		}
		return res.status(200).json({
			message: 'Portfolio theme updated successfully 👍 !',
			portfolio: {
				id: portfolio.id,
				portfolioTitle: portfolio.portfolioTitle,
				header: portfolio.header,
				sections: portfolio.sections,
				status: portfolio.status,
				footer: portfolio.footer,
				template: portfolio.template,
				theme: portfolio.theme,
				tinyUrlId: portfolio.tinyUrlId,
			},
		});
	} catch (error) {
		throw CustomError.internalServer('Error while updating the Portfolio theme,\n' + error);
	}
};

export const moveSectionUpDown = async (req: Request, res: Response) => {
	try {
		const { portfolioId, sectionId } = req.params;
		const { action } = req.query;

		// Validate action
		if (typeof action !== 'string' || (action !== 'up' && action !== 'down')) {
			return res.status(400).json({ message: 'Invalid action specified' });
		}

		// Find portfolio by ID
		const portfolio = await Models.Portfolio.findById(portfolioId);
		if (!portfolio) {
			return res.status(404).json({ message: 'Portfolio not found' });
		}

		// Find index of the section in the sections array
		const index = portfolio.sections.findIndex(
			(section) => section.item.toString() === sectionId.toString(),
		);
		if (index === -1) {
			return res.status(404).json({ message: 'Section not found in portfolio' });
		}

		// Move section up or down based on action
		if (action === 'up') {
			// Move section up if index is greater than 0
			if (index > 0) {
				const temp = portfolio.sections[index];
				portfolio.sections[index] = portfolio.sections[index - 1];
				portfolio.sections[index - 1] = temp;
			}
		} else if (action === 'down') {
			// Move section down if index is less than sections.length - 1
			if (index < portfolio.sections.length - 1) {
				const temp = portfolio.sections[index];
				portfolio.sections[index] = portfolio.sections[index + 1];
				portfolio.sections[index + 1] = temp;
			}
		}

		// Save the updated portfolio
		await portfolio.save();

		res.status(200).json({ message: 'Section moved successfully' });
	} catch (error) {
		console.error('Error moving section:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};