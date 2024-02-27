import mongoose, { Schema, Document } from 'mongoose';

// interface
interface ISectionImage extends Document {
    url: string;
    alt: string;
    caption: string;
    position: 'left' | 'center' | 'right';
}

// schema
const SectionImageSchema: Schema = new Schema({
    url: { type: String, required: true },
    alt: { type: String, required: true },
    caption: { type: String, required: true },
    position: { type: String, enum: ['left', 'center', 'right'], required: true }
});

// create model
const SectionImage = mongoose.model<ISectionImage>('SectionImage', SectionImageSchema);

export default SectionImage;
