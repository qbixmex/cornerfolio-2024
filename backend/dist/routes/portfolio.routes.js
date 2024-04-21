"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const validation_1 = require("./validation");
const router = express_1.default.Router();
router.get('/', validation_1.validateToken, controllers_1.PortfolioController.getPortfolios);
router.get('/:id', validation_1.validateToken, controllers_1.PortfolioController.getPortfolioById);
router.post('/', validation_1.validateToken, controllers_1.PortfolioController.createPortfolio);
router.patch('/:id', validation_1.validateToken, controllers_1.PortfolioController.updatePortfolio);
router.post('/:id', validation_1.validateToken, controllers_1.PortfolioController.setPortfolioTheme);
router.delete('/:id', validation_1.validateToken, controllers_1.PortfolioController.deletePortfolio);
router.patch('/move/:portfolioId/:sectionId', validation_1.validateToken, controllers_1.PortfolioController.moveSectionUpDown);
router.get('/live/:tinyUrlId', controllers_1.PortfolioController.getPortfolioByTinyUrlId);
exports.default = router;
//# sourceMappingURL=portfolio.routes.js.map