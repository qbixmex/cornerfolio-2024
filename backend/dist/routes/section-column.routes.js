"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const validation_1 = require("./validation");
const router = express_1.default.Router();
router.get('/', validation_1.validateToken, controllers_1.SectionColumn.getSectionColumns);
router.post('/:portfolioId', validation_1.validateToken, controllers_1.SectionColumn.createSectionColumn);
router.patch('/:id', validation_1.validateToken, controllers_1.SectionColumn.updateSectionColumn);
router.delete('/:id', validation_1.validateToken, controllers_1.SectionColumn.deleteSectionColumn);
exports.default = router;
//# sourceMappingURL=section-column.routes.js.map