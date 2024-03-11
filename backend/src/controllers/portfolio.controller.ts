import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { Types } from "mongoose";
import { CustomError } from "../helpers";
import * as Models from "../models";

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
			};
		});
		return res.status(200).json(portfolios);
	} catch (error) {
		throw CustomError.internalServer("Error while fetching the Portfolios,\n" + error);
	}
};

export const getPortfolioById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const portfolio = await Models.Portfolio.findById(id).populate({ path: "sections.item" });

		if (!portfolio) {
			return res.status(404).json({ error: "Portfolio not found !" });
		}

		return res.status(200).json({
			id: portfolio.id,
			header: portfolio.header,
			status: portfolio.status,
			sections: portfolio.sections,
			footer: portfolio.footer,
			template: portfolio.template,
		});
	} catch (error) {
		throw CustomError.internalServer("Error while fetching the Portfolio,\n" + error);
	}
};

export const createPortfolio = async (req: Request, res: Response) => {
	try {
		// Temporary Template Id
		const templateId = new ObjectId();

		// Temporary Login User
		const loginUser = {
			id: "12345",
			name: "Taisei Yamaguchi",
			email: "aries0326taisei@gmail.com",
			jobTitle: "Software Developer",
		};

		const portfolioTitle = `${loginUser.jobTitle} portfolio`;

		const header = {
			title: `Hi, I'm ${loginUser.name} software engineer`,
			subHeading: "Currently at Cornerstone, based in Vancouver",
		};

		const footer = {
			links: [`${loginUser.email}`],
			text: `© 2024 ${loginUser.name}. All rights reserved.`,
		};

		const newPortfolio = new Models.Portfolio({
			portfolioTitle,
			header,
			footer,
			template: templateId,
		});
		await newPortfolio.save();

		return res.status(201).json({
			message: "Portfolio created successfully 👍 !",
			portfolio: {
				id: newPortfolio.id,
				portfolioTitle: newPortfolio.portfolioTitle,
				header: newPortfolio.header,
				status: newPortfolio.status,
				sections: newPortfolio.sections,
				footer: newPortfolio.footer,
				template: newPortfolio.template,
			},
		});
	} catch (error) {
		throw CustomError.internalServer("Error while creating the Portfolio,\n" + error);
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
		const payload = req.body;

		const portfolio = await Models.Portfolio.findByIdAndUpdate(id, {
			portfolioTitle: payload.portfolioTitle ?? undefined,
			header: payload.header ?? undefined,
			sections: payload.sections ?? undefined,
			status: payload.status ?? undefined,
			footer: payload.footer ?? undefined,
			template: payload.template ?? undefined,
		}).populate({ path: "sections.item" });

		if (!portfolio) {
			return res.status(404).json({ error: "Portfolio not found" });
		}

		//? Note: if you pass undefined to a field, it will not be updated.
		portfolio.header = payload.header ?? undefined;
		portfolio.footer = payload.footer ?? undefined;

		await portfolio.save();

		return res.status(200).json({
			message: "Portfolio updated successfully 👍 !",
			portfolio: {
				id: portfolio.id,
				portfolioTitle: portfolio.portfolioTitle,
				header: portfolio.header,
				sections: portfolio.sections,
				status: portfolio.status,
				footer: portfolio.footer,
				template: portfolio.template,
			},
		});
	} catch (error) {
		throw CustomError.internalServer("Error while updating the Portfolio,\n" + error);
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
		return res.status(404).json({ error: "Portfolio not found !" });
	}

	try {
		await Models.Portfolio.findByIdAndDelete(id);
		return res.status(200).json({ message: "Portfolio deleted successfully 👍 !" });
	} catch (error) {
		throw CustomError.internalServer("Error while deleting the Portfolio,\n" + error);
	}
};
