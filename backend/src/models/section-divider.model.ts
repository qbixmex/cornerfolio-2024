import mongoose, { Schema, Document, Model } from 'mongoose';

interface ISectionDivider extends Document {
    title: string;
    titleSize: number;
}

type timestamps = {
    createdAt: string;
    updatedAt: string;
};

export type SectionDividerModel = Model<ISectionDivider & timestamps>;

const SectionDividerSchema = new Schema<ISectionDivider, SectionDividerModel>({
    title: {
        type: String,
        default:'Title of your next section'
    },
    titleSize: {
        type: Number,
        default: 20
    }
}, {
    timestamps: true
});

SectionDividerSchema.set('toJSON', {
    virtuals: true, //? convert _id to id
    versionKey: false,
    transform: function(doc, ret, options) {
        delete ret._id;
    },
});

const SectionDivider =
    mongoose.model<ISectionDivider, SectionDividerModel>('SectionDivider', SectionDividerSchema);

export default SectionDivider;
