"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validateFields = (request, response, next) => {
    const validationErrors = (0, express_validator_1.validationResult)(request);
    if (!validationErrors.isEmpty()) {
        return response.status(400).json({
            error: validationErrors.array()[0].msg
        });
    }
    next();
};
exports.default = validateFields;
//# sourceMappingURL=validate-fields.js.map