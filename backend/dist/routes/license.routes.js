"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const validation_1 = require("./validation");
const router = express_1.default.Router();
router.post("/", validation_1.validateToken, controllers_1.LicenseController.create);
router.get("/:id", validation_1.validateToken, controllers_1.LicenseController.show);
router.patch("/:id", validation_1.validateToken, controllers_1.LicenseController.update);
router.delete("/:id", validation_1.validateToken, controllers_1.LicenseController.remove);
exports.default = router;
//# sourceMappingURL=license.routes.js.map