import express from 'express';
import { PortfolioController } from '../controllers';

const router = express.Router();

router.get('/', PortfolioController.getPortfolios);
router.get('/:id', PortfolioController.getPortfolioById);
router.post('/', PortfolioController.createPortfolio);
router.patch('/:id',PortfolioController.updatePortfolio);
router.post('/:id',PortfolioController.setPortfolioTheme);
router.delete('/:id',PortfolioController.deletePortfolio);
router.patch('/move/:portfolioId/:sectionId',PortfolioController.moveSectionUpDown);
router.get('/live/:tinyUrlId', PortfolioController.getPortfolioByTinyUrlId);

export default router;
