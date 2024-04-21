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
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    imageURL: String,
    type: {
        type: String,
        enum: ["student", "client", "admin"],
        default: "student",
    },
    jobTitle: {
        type: String,
        default: "example: Full Stack Developer",
    },
    startDate: Date,
    endDate: Date,
    active: {
        type: Boolean,
        default: false,
    },
    course: {
        type: String,
        default: "example: Web development",
    },
    schedule: {
        type: String,
        enum: ["morning", "afternoon", "evening"],
        required: [true, "Schedule Hour is required"],
    },
    portfolios: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Portfolio',
        }],
    license: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "License",
        default: null,
    },
}, {
    timestamps: true,
});
UserSchema.set("toJSON", {
    virtuals: true, //? convert _id to id
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
        delete ret.password; //? hide password from the response
    },
});
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
//# sourceMappingURL=user.model.js.map