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
exports.generateUniqueTinyUrlId = void 0;
const Models = __importStar(require("../models"));
const generateUniqueTinyUrlId = async () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let tinyUrlId = '';
    // loop until generate unique tinyUrlId
    while (true) {
        // create tinyUrlId with random 8 characters
        for (let i = 0; i < 8; i++) {
            tinyUrlId += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        // check if generated tinyUrlId is unique or not.
        const existingPortfolio = await Models.Portfolio.findOne({ tinyUrlId });
        if (!existingPortfolio) {
            break;
        }
        tinyUrlId = '';
    }
    return tinyUrlId;
};
exports.generateUniqueTinyUrlId = generateUniqueTinyUrlId;
//# sourceMappingURL=generateUniqueTinyUrlId.js.map