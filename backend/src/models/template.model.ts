import { Model, Schema, Types, model } from "mongoose";

export type TemplateType = {
	id: Types.ObjectId;
	title: string;
	thumbnail: string;
	templateOptions: Types.ObjectId;
};

type timestamps = {
	createdAt: string;
	updatedAt: string;
};

export type TemplateModel = Model<TemplateType & timestamps>;

const templateSchema = new Schema<TemplateType, TemplateModel>(
	{
		title: {
			type: String,
			required: true,
			default: "Template 1",
		},
		thumbnail: {
			type: String,
			required: true,
		},
		templateOptions: {
			type: Schema.ObjectId,
			required: true,
			ref: "TemplateOptions",
		},
	},
	{ timestamps: true },
);

templateSchema.set("toJSON", {
	virtuals: true, //? convert _id to id
	versionKey: false,
	transform: function (doc, ret, options) {
		delete ret._id;
	},
});

const Template = model<TemplateType, TemplateModel>("Template", templateSchema);

export default Template;
