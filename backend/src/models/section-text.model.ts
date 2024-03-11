import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISectionText extends Document {
	heading: string;
	content: string;
	headingSize: number;
	contentSize: number;
	position: 'left' | 'center' | 'right';
}

type timestamps = {
	createdAt: string;
	updatedAt: string;
};

export type SectionTextModel = Model<ISectionText & timestamps>;

const sectionTextSchema = new Schema<ISectionText, SectionTextModel>({
	heading: {
		type: String,
		default: 'This is header.'
	},
	content: {
		type: String,
		default: 'You can write here as much as you want, this text will always look nice, whether you write longer paragraphs or just a few words. Click here and try it out.'
	},
	headingSize: {
		type: Number,
		default: 30,
	},
	contentSize: {
		type: Number,
		default: 15,
	},
	position: {
		type: String,
		enum: ['left', 'center', 'right'],
		default: 'left'
	}
});

sectionTextSchema.set('toJSON', {
	virtuals: true, //? convert _id to id
	versionKey: false,
	transform: function (doc, ret, options) {
		delete ret._id;
	},
});


const SectionText = mongoose.model<ISectionText, SectionTextModel>('SectionText', sectionTextSchema);

export default SectionText;

