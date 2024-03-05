import mongoose, { Schema, Document, Model } from 'mongoose';

interface ISectionImageText extends Document {
    imgUrl: string;
    imgAlt: string;
    imgCaption: string;
    txtHeading: string;
    txtContent: string;
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
        default:'https://uxfol.io/example_project_images/empty-image-and-text-image.jpg'
    },
    imgAlt: {
        type: String,
        default:'<p>Here comes your alt</p>'
    },
    imgCaption: {
        type: String,
        default: '<p>Here comes your caption</p>'
    },
    txtHeading: {
        type: String,
        default: '<h2>This is header. </h2>'
    },
    txtContent: {
        type: String,
        default :'<p>You can write here as much as you want, this text will always look nice, whether you write longer paragraphs or just a few words. Click here and try it out.</p>'
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
