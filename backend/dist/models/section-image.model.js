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
const SectionImageSchema = new mongoose_1.Schema({
    url: {
        type: String,
        default: 'https://uxfol.io/example_project_images/empty-image-and-text-image.jpg'
    },
    alt: {
        type: String,
        default: 'Here comes your alt'
    },
    caption: {
        type: String,
        default: 'Here comes your caption'
    },
    captionSize: {
        type: Number,
        default: 15,
    },
    position: {
        type: String,
        enum: ['left', 'center', 'right'],
        default: 'left'
    }
}, {
    timestamps: true
});
SectionImageSchema.set('toJSON', {
    virtuals: true, //? convert _id to id
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
    },
});
const SectionImage = mongoose_1.default.model('SectionImage', SectionImageSchema);
exports.default = SectionImage;
//# sourceMappingURL=section-image.model.js.map