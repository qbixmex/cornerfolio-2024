import mongoose, { Schema, Document, Model } from 'mongoose';

interface ISectionImage extends Document {
    url: string;
    alt: string;
    caption: string;
    position: 'left' | 'center' | 'right';
}

type timestamps = {
    createdAt: string;
    updatedAt: string;
};

export type ISectionImageModel = Model<ISectionImage & timestamps>;

const SectionImageSchema = new Schema<ISectionImage, ISectionImageModel>({
    url: {
        type: String,
        required: [ true, 'URL is required !' ]
    },
    alt: {
        type: String,
        required:[ true, 'Image Alternative Text is required !' ]
    },
    caption: {
        type: String,
        required: [ true, 'Caption is required !' ]
    },
    position: {
        type: String,
        enum: [ 'left', 'center', 'right' ],
        required: [ true, 'Position is required !' ]
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
