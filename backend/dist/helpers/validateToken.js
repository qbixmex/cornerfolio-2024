"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const config_1 = require("../config");
const errors_1 = __importDefault(require("./errors"));
const verifyToken = async (token) => {
    const decodedToken = await config_1.JWTAdapter.validateToken(token);
    if (!decodedToken) {
        throw errors_1.default.forbidden('Invalid token !');
    }
    return decodedToken;
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=validateToken.js.map