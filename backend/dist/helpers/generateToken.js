"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const config_1 = require("../config");
const errors_1 = __importDefault(require("./errors"));
const generateToken = async (options, duration) => {
    const newToken = await config_1.JWTAdapter.generateToken({ id: options.id }, duration);
    if (!newToken) {
        throw errors_1.default.internalServer('Error while generating token !');
    }
    return newToken;
};
exports.generateToken = generateToken;
//# sourceMappingURL=generateToken.js.map