import mongoose, { Schema, Document, Model } from 'mongoose';

interface ISectionGallery extends Document {
	url1: string;
	alt1: string;
	caption1: string;
	captionSize1: number;
	url2: string;
	alt2: string;
	caption2: string;
	captionSize2: number;
	url3: string;
	alt3: string;
	caption3: string;
	captionSize3: number;
}

type timestamps = {
	createdAt: string;
	updatedAt: string;
};

export type ISectionGalleryModel = Model<ISectionGallery & timestamps>;

const SectionGallerySchema = new Schema<ISectionGallery, ISectionGalleryModel>({
	url1: {
		type: String,
		default: 'https://uxfol.io/example_project_images/empty-image-and-text-image.jpg'
	},
	alt1: {
		type: String,
		default: 'Here comes your alt'
	},
	caption1: {
		type: String,
		default: 'Here comes your caption'
	},
	captionSize1: {
		type: Number,
		default: 16,
	},
	url2: {
		type: String,
		default: 'https://uxfol.io/example_project_images/empty-image-and-text-image.jpg'
	},
	alt2: {
		type: String,
		default: 'Here comes your alt'
	},
	caption2: {
		type: String,
		default: 'Here comes your caption'
	},
	captionSize2: {
		type: Number,
		default: 16,
	},
    url3: {
		type: String,
		default: 'https://uxfol.io/example_project_images/empty-image-and-text-image.jpg'
	},
	alt3: {
		type: String,
		default: 'Here comes your alt'
	},
	caption3: {
		type: String,
		default: 'Here comes your caption'
	},
	captionSize3: {
		type: Number,
		default: 16,
	},
}, {
	timestamps: true
});

SectionGallerySchema.set('toJSON', {
	virtuals: true, //? convert _id to id
	versionKey: false,
	transform: function (doc, ret, options) {
		delete ret._id;
	},
});

const SectionGallery =
	mongoose.model<ISectionGallery, ISectionGalleryModel>('SectionGallery', SectionGallerySchema);

export default SectionGallery;
