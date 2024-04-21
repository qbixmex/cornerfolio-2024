"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const templateSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.ObjectId,
        required: true,
        ref: "TemplateOptions",
    },
}, { timestamps: true });
templateSchema.set("toJSON", {
    virtuals: true, //? convert _id to id
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
    },
});
const Template = (0, mongoose_1.model)("Template", templateSchema);
exports.default = Template;
//# sourceMappingURL=template.model.js.map