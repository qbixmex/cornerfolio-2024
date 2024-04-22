"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const sectionColumnSchema = new mongoose_1.Schema({
    heading1: {
        type: String,
        default: 'This is header.'
    },
    content1: {
        type: String,
        default: 'You can write here as much as you want, this text will always look nice, whether you write longer paragraphs or just a few words. Click here and try it out.'
    },
    headingSize1: {
        type: Number,
        default: 32,
    },
    contentSize1: {
        type: Number,
        default: 16,
    },
    heading2: {
        type: String,
        default: 'This is header.'
    },
    content2: {
        type: String,
        default: 'You can write here as much as you want, this text will always look nice, whether you write longer paragraphs or just a few words. Click here and try it out.'
    },
    headingSize2: {
        type: Number,
        default: 32,
    },
    contentSize2: {
        type: Number,
        default: 16,
    },
    heading3: {
        type: String,
        default: 'This is header.'
    },
    content3: {
        type: String,
        default: 'You can write here as much as you want, this text will always look nice, whether you write longer paragraphs or just a few words. Click here and try it out.'
    },
    headingSize3: {
        type: Number,
        default: 32,
    },
    contentSize3: {
        type: Number,
        default: 16,
    },
});
sectionColumnSchema.set('toJSON', {
    virtuals: true, //? convert _id to id
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
    },
});
const SectionColumn = mongoose_1.default.model("SectionColumn", sectionColumnSchema);
exports.default = SectionColumn;
//# sourceMappingURL=section-column.model.js.map