"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const middlewares_1 = require("../../middlewares");
const validationFields = [
    (0, express_validator_1.check)('email', 'The "email" is required !').not().isEmpty(),
    (0, express_validator_1.check)('email', 'The "email" must be a valid format !').isEmail(),
    (0, express_validator_1.check)('password', 'The "password" is required !').not().isEmpty(),
    (0, express_validator_1.check)('password', 'The "password" must be minimum 6 characters long !').isLength({ min: 6 }),
    middlewares_1.validateFields
];
exports.default = validationFields;
//# sourceMappingURL=login-user.validation.js.map