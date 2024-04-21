"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../helpers");
const validateToken = async (request, response, next) => {
    const token = request.headers.token;
    if (!token) {
        return response.status(401).json({
            error: "Token not provided !",
        });
    }
    try {
        const tokenVerified = await (0, helpers_1.verifyToken)(token);
        if (!tokenVerified) {
            return response.status(401).json({
                error: "Token not valid !",
            });
        }
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            return response.status(401).json({
                error: error.message,
            });
        }
    }
};
exports.default = validateToken;
//# sourceMappingURL=token.validation.js.map