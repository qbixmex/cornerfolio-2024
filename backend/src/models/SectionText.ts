// src/model/SectionText.ts

import mongoose, { Schema, Document } from 'mongoose';

// interface
export interface ISectionText extends Document {
    heading: string;
    content: string;
    position: 'left' | 'center' | 'right';
}

// schema
const sectionTextSchema: Schema = new Schema({
    heading: { type: String, required: true },
    content: { type: String, required: true },
    position: { type: String, enum: ['left', 'center', 'right'], required: true }
});

// create model and export
export default mongoose.model<ISectionText>('SectionText', sectionTextSchema);
