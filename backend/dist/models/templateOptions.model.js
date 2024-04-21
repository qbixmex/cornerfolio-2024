"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
var FontSize;
(function (FontSize) {
    FontSize["SMALL"] = "small";
    FontSize["MEDIUM"] = "medium";
    FontSize["LARGE"] = "large";
})(FontSize || (FontSize = {}));
const templateOptionsSchema = new mongoose_1.Schema({
    fontSize: {
        type: String,
        enum: Object.values(FontSize),
        required: true,
    },
    hide_footer: {
        type: Boolean,
        required: true,
    },
}, { timestamps: false });
templateOptionsSchema.set('toJSON', {
    virtuals: true, //? convert _id to id
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
    },
});
const TemplateOptions = (0, mongoose_1.model)("TemplateOptions", templateOptionsSchema);
exports.default = TemplateOptions;
//# sourceMappingURL=templateOptions.model.js.map