import mongoose, { Schema, Document, Model } from 'mongoose';

interface ISectionImageText extends Document {
	imgUrl: string;
	imgAlt: string;
	imgCaption: string;
	imgCaptionSize: number;
	txtHeading: string;
	txtContent: string;
	txtHeadingSize: number;
	txtContentSize: number;
	position: 'img_text' | 'text_img';
}

type timestamps = {
	createdAt: string;
	updatedAt: string;
};

export type ISectionImageTextModel = Model<ISectionImageText & timestamps>;

const SectionImageTextSchema = new Schema<ISectionImageText, ISectionImageTextModel>({
	imgUrl: {
		type: String,
		default: 'https://uxfol.io/example_project_images/empty-image-and-text-image.jpg'
	},
	imgAlt: {
		type: String,
		default: 'Lorem Ipsum Image'
	},
	imgCaption: {
		type: String,
		default: 'Lorem Ipsum Image'
	},
	imgCaptionSize: {
		type: Number,
		default: 15,
	},
	txtHeading: {
		type: String,
		default: 'This is header.'
	},
	txtContent: {
		type: String,
		default: 'You can write here as much as you want, this text will always look nice, whether you write longer paragraphs or just a few words. Click here and try it out.'
	},
	txtHeadingSize: {
		type: Number,
		default: 30,
	},
	txtContentSize: {
		type: Number,
		default: 15,
	},
	position: {
		type: String,
		enum: ['img_text', 'text_img'],
		default: 'img_text'
	}
}, {
	timestamps: true
});

SectionImageTextSchema.set('toJSON', {
	virtuals: true, //? convert _id to id
	versionKey: false,
	transform: function (doc, ret, options) {
		delete ret._id;
	},
});

const SectionImageText =
	mongoose.model<ISectionImageText, ISectionImageTextModel>('SectionImageText', SectionImageTextSchema);

export default SectionImageText;
