"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const validation_1 = require("./validation");
const router = express_1.default.Router();
router.get('/', validation_1.validateToken, controllers_1.SectionEmbeddedMediaController.getSectionEmbeddedMedias);
router.post('/:portfolioId', validation_1.validateToken, controllers_1.SectionEmbeddedMediaController.createSectionEmbeddedMedia);
router.patch('/:id', validation_1.validateToken, controllers_1.SectionEmbeddedMediaController.updateSectionEmbeddedMedia);
router.delete('/:id', validation_1.validateToken, controllers_1.SectionEmbeddedMediaController.deleteSectionEmbeddedMedia);
exports.default = router;
//# sourceMappingURL=section-embedded-media.routes.js.map