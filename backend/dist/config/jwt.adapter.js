"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envs_1 = __importDefault(require("./envs"));
const JWT_SEED = envs_1.default.JWT_SECRET;
class JWTAdapter {
    static async generateToken(payload, duration) {
        return new Promise((resolve) => {
            jsonwebtoken_1.default.sign(payload, JWT_SEED, { expiresIn: duration }, (error, token) => {
                return error ? resolve(null) : resolve(token);
            });
        });
    }
    static validateToken(token) {
        return new Promise((resolve) => {
            jsonwebtoken_1.default.verify(token, JWT_SEED, (error, decoded) => {
                return error ? resolve(null) : resolve(decoded);
            });
        });
    }
}
exports.default = JWTAdapter;
//# sourceMappingURL=jwt.adapter.js.map