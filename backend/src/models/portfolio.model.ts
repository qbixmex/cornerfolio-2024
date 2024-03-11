import console from "console";
import mongoose, { Model, Schema, Types } from "mongoose";
import { SectionText } from ".";
import SectionEmbeddedMediaModel from "../models/section-embedded-media.model";
import SectionDivider from "./section-divider.model";
import SectionImageText from "./section-image-text.model";
import SectionImage from "./section-image.model";

const sectionKinds = [
	"SectionText",
	"SectionImage",
	"SectionEmbeddedMedia",
	"SectionImageText",
	"SectionDivider",
] as const;

enum SectionType {
	TEXT = "SectionText",
	DIVIDER = "SectionDivider",
	EMBEDDED_MEDIA = "SectionEmbeddedMedia",
	IMAGE_TEXT = "SectionImageText",
	IMAGE = "SectionImage",
}

type SectionKind = (typeof sectionKinds)[number];

type Section = {
	kind: SectionKind;
	item: string;
};

export type PortfolioType = {
	id: Types.ObjectId;
	portfolioTitle: string;
	header: {
		title: string[];
		subHeading: string;
	};
	status: string;
	footer: {
		links: string[];
		text: string;
	};
	template: Types.ObjectId;
	sections: Section[];
};

type timestamps = {
	createdAt: string;
	updatedAt: string;
};

export type PortfolioModel = Model<PortfolioType & timestamps>;

export const PortfolioSchema = new Schema<PortfolioType, PortfolioModel>(
	{
		portfolioTitle: {
			type: String,
			required: true,
		},
		header: {
			title: {
				type: String,
				default: "Hi, I'm John Doe, software engineer",
			},
			subHeading: {
				type: String,
				default: "Currently at Cornerstone, based in Vancouver",
			},
		},
		status: {
			type: String,
			enum: ["draft", "published"],
			default: "draft",
		},
		footer: {
			links: {
				type: [String],
			},
			text: {
				type: String,
				default: "© 2024 John Doe. All rights reserved.",
			},
		},
		template: {
			type: Schema.Types.ObjectId,
			ref: "Template",
			required: [true, "Portfolio is required"],
		},
		sections: [
			{
				kind: {
					type: String,
					enum: sectionKinds,
				},
				item: {
					type: Schema.Types.ObjectId,
					refPath: "sections.kind",
				},
			},
		],
	},
	{ timestamps: true },
);

PortfolioSchema.set("toJSON", {
	virtuals: true, //? convert _id to id
	versionKey: false,
	transform: function (doc, ret, options) {
		delete ret._id;
	},
});

PortfolioSchema.post("findOneAndDelete", async (doc) => {
	doc.sections.forEach(async (section: Section) => {
		try {
			switch (section.kind) {
				case SectionType.TEXT:
					await SectionText.findByIdAndDelete(section.item);
					break;

				case SectionType.DIVIDER:
					await SectionDivider.findByIdAndDelete(section.item);
					break;

				case SectionType.EMBEDDED_MEDIA:
					await SectionEmbeddedMediaModel.findByIdAndDelete(section.item);
					break;

				case SectionType.IMAGE_TEXT:
					await SectionImageText.findByIdAndDelete(section.item);
					break;

				case SectionType.IMAGE:
					await SectionImage.findByIdAndDelete(section.item);
					break;

				default:
					throw new Error("Invalid Section Kind");
			}
		} catch (error) {
			if (error instanceof Error) {
				throw new Error("Something wrong happened while deleting portfolio", error);
			}
			console.log(error);

			throw new Error("Unexpected Error, check logs");
		}
	});
});

const Portfolio = mongoose.model<PortfolioType, PortfolioModel>("Portfolio", PortfolioSchema);

export default Portfolio;
