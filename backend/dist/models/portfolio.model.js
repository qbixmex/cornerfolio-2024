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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioSchema = void 0;
const console_1 = __importDefault(require("console"));
const mongoose_1 = __importStar(require("mongoose"));
const _1 = require(".");
const section_embedded_media_model_1 = __importDefault(require("../models/section-embedded-media.model"));
const section_divider_model_1 = __importDefault(require("./section-divider.model"));
const section_image_text_model_1 = __importDefault(require("./section-image-text.model"));
const section_image_model_1 = __importDefault(require("./section-image.model"));
const sectionKinds = [
    "SectionText",
    "SectionImage",
    "SectionEmbeddedMedia",
    "SectionImageText",
    "SectionDivider",
    "SectionColumn",
    "SectionGallery",
];
var SectionType;
(function (SectionType) {
    SectionType["TEXT"] = "SectionText";
    SectionType["DIVIDER"] = "SectionDivider";
    SectionType["EMBEDDED_MEDIA"] = "SectionEmbeddedMedia";
    SectionType["IMAGE_TEXT"] = "SectionImageText";
    SectionType["IMAGE"] = "SectionImage";
    SectionType["COLUMN"] = "SectionColumn";
    SectionType["GALLERY"] = "SectionGallery";
})(SectionType || (SectionType = {}));
exports.PortfolioSchema = new mongoose_1.Schema({
    portfolioTitle: {
        type: String,
        required: true,
    },
    header: {
        title: {
            type: String,
            default: "Hi, I'm John Doe, software engineer",
        },
        subHeading: {
            type: String,
            default: 'Currently at Cornerstone, based in Vancouver',
        },
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft',
    },
    footer: {
        links: {
            type: String,
            default: 'sample@example.com',
        },
        text: {
            type: String,
            default: '© 2024 John Doe. All rights reserved.',
        },
    },
    template: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Template',
        required: [true, 'Portfolio is required'],
    },
    sections: [
        {
            kind: {
                type: String,
                enum: sectionKinds,
            },
            item: {
                type: mongoose_1.Schema.Types.ObjectId,
                refPath: 'sections.kind',
            },
        },
    ],
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
    },
    theme: { type: String, default: 'light' },
    tinyUrlId: {
        type: String,
        unique: true,
        required: true,
    },
}, { timestamps: true });
exports.PortfolioSchema.set('toJSON', {
    virtuals: true, //? convert _id to id
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
    },
});
exports.PortfolioSchema.post('findOneAndDelete', async (doc) => {
    doc.sections.forEach(async (section) => {
        try {
            switch (section.kind) {
                case SectionType.TEXT:
                    await _1.SectionText.findByIdAndDelete(section.item);
                    break;
                case SectionType.DIVIDER:
                    await section_divider_model_1.default.findByIdAndDelete(section.item);
                    break;
                case SectionType.EMBEDDED_MEDIA:
                    await section_embedded_media_model_1.default.findByIdAndDelete(section.item);
                    break;
                case SectionType.IMAGE_TEXT:
                    await section_image_text_model_1.default.findByIdAndDelete(section.item);
                    break;
                case SectionType.IMAGE:
                    await section_image_model_1.default.findByIdAndDelete(section.item);
                    break;
                case SectionType.COLUMN:
                    await _1.SectionColumn.findByIdAndDelete(section.item);
                    break;
                case SectionType.GALLERY:
                    await _1.SectionGallery.findByIdAndDelete(section.item);
                    break;
                default:
                    throw new Error('Invalid Section Kind');
            }
        }
        catch (error) {
            if (error instanceof mongoose_1.default.Error) {
                throw new Error(error.message);
            }
            console_1.default.log(error);
            throw new Error('Unexpected Error, check logs !');
        }
    });
});
const Portfolio = mongoose_1.default.model('Portfolio', exports.PortfolioSchema);
exports.default = Portfolio;
//# sourceMappingURL=portfolio.model.js.map