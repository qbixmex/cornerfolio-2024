import mongoose, { Document, Model, Schema } from "mongoose";

export interface ISectionText extends Document {
	heading: string;
	content: string;
	position: "left" | "center" | "right";
	item?: string;
}

type timestamps = {
	createdAt: string;
	updatedAt: string;
};

export type SectionTextModel = Model<ISectionText & timestamps>;

export const sectionTextSchema = new Schema<ISectionText, SectionTextModel>({
	heading: {
		type: String,
		default: "<h2>This is header.</h2>",
	},
	content: {
		type: String,
		default:
			"<p>You can write here as much as you want, this text will always look nice, whether you write longer paragraphs or just a few words. Click here and try it out.</p>",
	},
	position: {
		type: String,
		enum: ["left", "center", "right"],
		default: "left",
	},
});

sectionTextSchema.set("toJSON", {
	virtuals: true, //? convert _id to id
	versionKey: false,
	transform: function (doc, ret, options) {
		delete ret._id;
	},
});

const SectionText = mongoose.model<ISectionText, SectionTextModel>(
	"SectionText",
	sectionTextSchema,
);

export default SectionText;
