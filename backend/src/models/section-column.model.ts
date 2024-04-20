import mongoose, { Document, Model, Schema } from "mongoose";

export interface ISectionColumn extends Document {
	heading1: string;
	content1: string;
	headingSize1: number;
	contentSize1: number;
	heading2: string;
	content2: string;
	headingSize2: number;
	contentSize2: number;
    heading3: string;
	content3: string;
	headingSize3: number;
	contentSize3: number;
}

type timestamps = {
	createdAt: string;
	updatedAt: string;
};

export type SectionColumnModel = Model<ISectionColumn & timestamps>;

const sectionColumnSchema = new Schema<ISectionColumn, SectionColumnModel>({
	heading1: {
		type: String,
		default: 'This is header.'
	},
	content1: {
		type: String,
		default: 'You can write here as much as you want, this text will always look nice, whether you write longer paragraphs or just a few words. Click here and try it out.'
	},
	headingSize1: {
		type: Number,
		default: 30,
	},
	contentSize1: {
		type: Number,
		default: 15,
	},
	heading2: {
		type: String,
		default: 'This is header.'
	},
	content2: {
		type: String,
		default: 'You can write here as much as you want, this text will always look nice, whether you write longer paragraphs or just a few words. Click here and try it out.'
	},
	headingSize2: {
		type: Number,
		default: 30,
	},
	contentSize2: {
		type: Number,
		default: 15,
	},
    heading3: {
		type: String,
		default: 'This is header.'
	},
	content3: {
		type: String,
		default: 'You can write here as much as you want, this text will always look nice, whether you write longer paragraphs or just a few words. Click here and try it out.'
	},
	headingSize3: {
		type: Number,
		default: 30,
	},
	contentSize3: {
		type: Number,
		default: 15,
	},
});

sectionColumnSchema.set('toJSON', {
	virtuals: true, //? convert _id to id
	versionKey: false,
	transform: function (doc, ret, options) {
		delete ret._id;
	},
});

const SectionColumn = mongoose.model<ISectionColumn, SectionColumnModel>(
	"SectionColumn",
	sectionColumnSchema,
);

export default SectionColumn;
