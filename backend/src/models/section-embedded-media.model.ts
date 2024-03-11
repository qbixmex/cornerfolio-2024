import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISectionEmbeddedMedia extends Document {
    code: string;
}

type timestamps = {
    createdAt: string;
    updatedAt: string;
};

export type SectionEmbeddedMediaModel = Model<ISectionEmbeddedMedia & timestamps>;

const SectionEmbeddedMediaSchema = new Schema<ISectionEmbeddedMedia, SectionEmbeddedMediaModel>({
    code: {
        type: String,
        required: [ true, 'Code is required !' ]
    }
}, {
    timestamps: true
});

SectionEmbeddedMediaSchema.set('toJSON', {
    virtuals: true, //? convert _id to id
    versionKey: false,
    transform: function(doc, ret, options) {
        delete ret._id;
    },
});

const SectionEmbeddedMedia =
    mongoose.model<ISectionEmbeddedMedia, SectionEmbeddedMediaModel>('SectionEmbeddedMedia', SectionEmbeddedMediaSchema);

export default SectionEmbeddedMedia;
