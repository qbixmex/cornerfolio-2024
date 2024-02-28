import mongoose, { Schema, Document, Model } from 'mongoose';

interface ISectionImageText extends Document {
    imgUrl: string;
    imgAlt: string;
    imgCaption: string;
    txtHeading: string;
    txtContent: string;
    position?: 'img_text' | 'text_img';
}

type timestamps = {
    createdAt: string;
    updatedAt: string;
};

export type ISectionImageTextModel = Model<ISectionImageText & timestamps>;

const SectionImageTextSchema = new Schema<ISectionImageText, ISectionImageTextModel>({
    imgUrl: {
        type: String,
        required: [ true, 'Image URL is required !' ]
    },
    imgAlt: {
        type: String,
        required: [ true, 'Image Alt is required !' ]
    },
    imgCaption: {
        type: String,
        required: [ true, 'Image Caption is required !' ]
    },
    txtHeading: {
        type: String,
        required: [ true, 'Text Heading is required !' ]
    },
    txtContent: {
        type: String,
        required: [ true, 'Text Content is required !' ]
    },
    position: {
        type: String,
        enum: [ 'img_text', 'text_img' ],
        default: 'img_text'
    }
}, {
    timestamps: true
});

SectionImageTextSchema.set('toJSON', {
    virtuals: true, //? convert _id to id
    versionKey: false,
    transform: function(doc, ret, options) {
        delete ret._id;
    },
});

const SectionImageText =
    mongoose.model<ISectionImageText, ISectionImageTextModel>('SectionImageText', SectionImageTextSchema);

export default SectionImageText;
