import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { CustomError } from '../helpers';
import { Portfolio, SectionText } from '../models';

export const getSectionTexts = async (req: Request, res: Response) => {
	try {
		const sectionTexts = await SectionText.find();
		const sections = sectionTexts.map(sectionText => {
			return {
				id: sectionText.id,
				heading: sectionText.heading,
				content: sectionText.content,
				headingSize: sectionText.headingSize,
				contentSize: sectionText.contentSize,
				position: sectionText.position
			};
		});
		return res.status(200).json(sections);
	} catch (error) {
		throw CustomError.internalServer('Error while fetching Section Texts,\n' + error);
	}
};

export const createSectionText = async (
	req: Request<never, never, never, { order?: string }>,
	res: Response,
) => {
	try {
		const { portfolioId } = req.params;
		const order = req.query.order;
		const portfolio = await Portfolio.findById(portfolioId);

		if (!portfolio) {
			return res.status(404).json({ error: "Portfolio not found !" });
		}

		const newSectionText = new SectionText();
		await newSectionText.save();

		if (order && !isNaN(parseInt(order))) {
			const index = parseInt(order);
			if (index >= 0 && index <= portfolio.sections.length) {
				portfolio.sections.splice(index, 0, {
					kind: "SectionText",
					item: newSectionText._id,
				});
			} else {
				portfolio.sections.push({
					kind: "SectionText",
					item: newSectionText._id,
				});
			}
		} else {
			portfolio.sections.push({
				kind: "SectionText",
				item: newSectionText._id,
			});
		}

		await portfolio.save();

		return res.status(201).json({
			message: 'Section text created successfully !',
			section: {
				id: newSectionText.id,
				heading: newSectionText.heading,
				content: newSectionText.content,
				headingSize: newSectionText.headingSize,
				contentSize: newSectionText.contentSize,
				position: newSectionText.position,
			}
		});
	} catch (error) {
		throw CustomError.internalServer('Error while creating Section Text,\n' + error);
	}
};

export const updateSectionText = async (req: Request, res: Response) => {
	const id = req.params.id;

	if (!Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: `Invalid ID: ${id} !` });
	}

	const sectionText = await SectionText.findById(id);

	if (!sectionText) {
		return res.status(404).json({ error: "Section text not found !" });
	}

	try {
		const payload = req.body;

		//? Note: if you pass undefined to a field, it will not be updated.
		sectionText.heading = payload.heading !== undefined ? payload.heading : sectionText.heading;
		sectionText.content = payload.content !== undefined ? payload.content : sectionText.content;
		sectionText.headingSize = payload.headingSize !== undefined ? payload.headingSize : sectionText.headingSize;
		sectionText.contentSize = payload.contentSize !== undefined ? payload.contentSize : sectionText.contentSize;
		sectionText.position = payload.position !== undefined ? payload.position : sectionText.position;

		await sectionText.save();

		return res.status(200).json({
			message: 'Section text updated successfully !',
			section: {
				id: sectionText.id,
				heading: sectionText.heading,
				content: sectionText.content,
				headingSize: sectionText.headingSize,
				contentSize: sectionText.contentSize,
				position: sectionText.position,
			}
		});

	} catch (error) {
		throw CustomError.internalServer('Error while updating Section Text,\n' + error);
	}
};

export const deleteSectionText = async (req: Request, res: Response) => {
	const sectionId = req.params.id;

	if (!Types.ObjectId.isValid(sectionId)) {
		return res.status(400).json({
			error: `Invalid ID: ${sectionId} !`,
		});
	}

	try {
		// Delete the sectionText itself
		await SectionText.findByIdAndDelete(sectionId);

		// Find the portfolio that contains a section with the given sectionId
		const portfolio = await Portfolio.findOne({ "sections.item": sectionId });

		if (!portfolio) {
			return res.status(404).json({ error: "Portfolio not found !" });
		}

		// Find the index of the section with the given sectionId in the portfolio's sections array
		const sectionIndex = portfolio.sections.findIndex(
			(section) => section.item.toString() === sectionId,
		);

		if (sectionIndex === -1) {
			return res.status(404).json({ error: "Section not found in portfolio !" });
		}

		// Remove the section from the portfolio's sections array
		portfolio.sections.splice(sectionIndex, 1);

		await portfolio.save();

		return res.status(200).json({ message: "Section Text deleted successfully 👍" });
	} catch (error) {
		throw CustomError.internalServer("Error while deleting the Section Text,\n" + error);
	}
};
