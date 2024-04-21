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
const SectionDividerSchema = new mongoose_1.Schema({
    title: {
        type: String,
        default: 'Title of your next section'
    },
    titleSize: {
        type: Number,
        default: 20
    }
}, {
    timestamps: true
});
SectionDividerSchema.set('toJSON', {
    virtuals: true, //? convert _id to id
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
    },
});
const SectionDivider = mongoose_1.default.model('SectionDivider', SectionDividerSchema);
exports.default = SectionDivider;
//# sourceMappingURL=section-divider.model.js.map