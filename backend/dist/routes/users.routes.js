"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const validation_1 = require("./validation");
const router = (0, express_1.Router)();
router.get('/', validation_1.validateToken, controllers_1.UsersController.list);
router.get('/count-total/:term?', validation_1.validateToken, controllers_1.UsersController.totalPages);
router.get('/:id', validation_1.validateToken, controllers_1.UsersController.profile);
router.get('/search/:term', validation_1.validateToken, controllers_1.UsersController.search);
router.post('/', validation_1.validateToken, validation_1.validateRegisterFields, controllers_1.UsersController.create);
router.patch('/:id', validation_1.validateToken, validation_1.validateUpdateFields, controllers_1.UsersController.update);
router.patch('/:id/update-password', validation_1.validateToken, controllers_1.UsersController.updatePassword);
router.delete('/:id', validation_1.validateToken, controllers_1.UsersController.remove);
exports.default = router;
//# sourceMappingURL=users.routes.js.map