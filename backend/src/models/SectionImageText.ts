import mongoose, { Schema, Document } from 'mongoose';

// interface
interface ISectionImageText extends Document {
    imgUrl: string;
    imgAlt: string;
    imgCaption: string;
    txtHeading: string;
    txtContent: string;
    position: 'img_text' | 'text_img';
}

// schema
const SectionImageTextSchema: Schema = new Schema({
    imgUrl: { type: String, required: true },
    imgAlt: { type: String, required: true },
    imgCaption: { type: String, required: true },
    txtHeading: { type: String, required: true },
    txtContent: { type: String, required: true },
    position: { type: String, enum: ['img_text', 'text_img'], required: true }
});

// create model
const SectionImageText = mongoose.model<ISectionImageText>('SectionImageText', SectionImageTextSchema);

export default SectionImageText;
