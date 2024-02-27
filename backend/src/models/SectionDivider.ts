import mongoose, { Schema, Document } from 'mongoose';

// interface
interface ISectionDivider extends Document {
    title: string;
}

// schema
const SectionDividerSchema: Schema = new Schema({
    title: { type: String, required: true }
});

// create Model
const SectionDivider = mongoose.model<ISectionDivider>('SectionDivider', SectionDividerSchema);

export default SectionDivider;
