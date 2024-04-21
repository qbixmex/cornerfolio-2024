"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const validation_1 = require("./validation");
const router = (0, express_1.Router)();
router.post('/register', validation_1.validateRegisterFields, controllers_1.AuthController.register);
router.post('/login', validation_1.validateLoginFields, controllers_1.AuthController.login);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map