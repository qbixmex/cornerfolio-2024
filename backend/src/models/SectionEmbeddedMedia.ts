import mongoose, { Schema, Document } from 'mongoose';

// interface
interface ISectionEmbeddedMedia extends Document {
    code: string;
}

// schema
const SectionEmbeddedMediaSchema: Schema = new Schema({
    code: { type: String, required: true }
});

// create model
const SectionEmbeddedMedia = mongoose.model<ISectionEmbeddedMedia>('SectionEmbeddedMedia', SectionEmbeddedMediaSchema);

export default SectionEmbeddedMedia;
