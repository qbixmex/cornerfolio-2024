import { Model, Schema, model } from "mongoose";

enum FontSize {
	SMALL = "small",
	MEDIUM = "medium",
	LARGE = "large",
}

export type TemplateOptionsType = {
	fontSize: FontSize;
	hide_footer: boolean;
};

export type TemplateOptionsModel = Model<TemplateOptionsType>;

const templateOptionsSchema = new Schema<TemplateOptionsType, TemplateOptionsModel>(
	{
		fontSize: {
			type: String,
            enum: Object.values(FontSize),
			required: true,
		},
		hide_footer: {
			type: Boolean,
			required: true,
		},
	},
	{ timestamps: false },
);

templateOptionsSchema.set('toJSON', {
    virtuals: true, //? convert _id to id
    versionKey: false,
    transform: function(doc, ret, options) {
        delete ret._id;
    },
});

const TemplateOptions = model<TemplateOptionsType, TemplateOptionsModel>(
	"TemplateOptions",
	templateOptionsSchema,
);

export default TemplateOptions;
