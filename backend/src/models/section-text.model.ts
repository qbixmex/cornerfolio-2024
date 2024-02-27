import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISectionText extends Document {
    heading: string;
    content: string;
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
        required: [ true, 'Heading is required !' ]
    },
    content: {
        type: String,
        required: [ true, 'Content is required !' ],
    },
    position: {
        type: String,
        enum: [ 'left', 'center', 'right' ],
        required: [ true, 'Position is required !' ]
    }
});

sectionTextSchema.set('toJSON', {
    virtuals: true, //? convert _id to id
    versionKey: false,
    transform: function(doc, ret, options) {
        delete ret._id;
    },
});


const SectionText = mongoose.model<ISectionText, SectionTextModel>('SectionText', sectionTextSchema);

export default SectionText;

