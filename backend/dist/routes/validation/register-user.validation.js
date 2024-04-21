"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const middlewares_1 = require("../../middlewares");
const constants_1 = require("./constants");
const validationFields = [
    (0, express_validator_1.check)('name', 'The "name" is required !').trim().not().isEmpty(),
    (0, express_validator_1.check)('name', 'The "name" must be at least 3 characters long !').isLength({ min: 3 }),
    (0, express_validator_1.check)('name', 'The "name" must be maximum 40 characters long !').isLength({ max: 40 }),
    (0, express_validator_1.check)('email', 'The "email" is required !').not().isEmpty(),
    (0, express_validator_1.check)('email', 'The "email" must be a valid format !').isEmail(),
    (0, express_validator_1.check)('password', 'The "password" is required !').not().isEmpty(),
    (0, express_validator_1.check)('password', 'The "password" must be minimum 6 characters long !').isLength({ min: 6 }),
    (0, express_validator_1.check)('password').custom((value) => {
        if (constants_1.invalidPasswords.includes(value)) {
            throw new Error(`The "${value}" password, is a very easy to hack, please choose another one !`);
        }
        return true;
    }),
    (0, express_validator_1.check)('jobTitle', 'The "jobTitle" is required !').not().isEmpty(),
    (0, express_validator_1.check)('jobTitle', 'The "jobTitle" must be minimum 4 characters long !').isLength({ min: 4 }),
    (0, express_validator_1.check)('jobTitle', 'The "jobTitle" must be maximum 40 characters long !').isLength({ max: 40 }),
    (0, express_validator_1.check)('course', 'The "course" is required !').not().isEmpty(),
    (0, express_validator_1.check)('course', 'The "course" must be minimum 4 characters long !').isLength({ min: 4 }),
    (0, express_validator_1.check)('course', 'The "course" must be maximum 40 characters long !').isLength({ max: 40 }),
    (0, express_validator_1.check)('schedule', 'The "schedule" is required !').not().isEmpty(),
    (0, express_validator_1.check)('schedule', "The 'schedule' must be 'morning', 'afternoon' or 'evening' !")
        .isIn(['morning', 'afternoon', 'evening']),
    middlewares_1.validateFields
];
exports.default = validationFields;
//# sourceMappingURL=register-user.validation.js.map