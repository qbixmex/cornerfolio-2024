import mongoose, { Schema, Document, Model } from 'mongoose';

interface ISectionImage extends Document {
    url?: string;
    alt?: string;
    caption?: string;
    position?: 'left' | 'center' | 'right';
}

type timestamps = {
    createdAt: string;
    updatedAt: string;
};

export type ISectionImageModel = Model<ISectionImage & timestamps>;

const SectionImageSchema = new Schema<ISectionImage, ISectionImageModel>({
    url: {
        type: String,
        default:'https://uxfol.io/example_project_images/empty-image-and-text-image.jpg'
    },
    alt: {
        type: String,
        default:'<p>Here comes your alt</p>'
    },
    caption: {
        type: String,
        default: '<p>Here comes your caption</p>'
    },
    position: {
        type: String,
        enum: [ 'left', 'center', 'right' ],
        default: 'left'
    }
}, {
    timestamps: true
});

SectionImageSchema.set('toJSON', {
    virtuals: true, //? convert _id to id
    versionKey: false,
    transform: function(doc, ret, options) {
        delete ret._id;
    },
});

const SectionImage =
    mongoose.model<ISectionImage, ISectionImageModel>('SectionImage', SectionImageSchema);

export default SectionImage;
