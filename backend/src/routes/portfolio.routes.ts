import express from 'express';
import { createPortfolio,getPortfolios,getPortfolioById,updatePortfolio,deletePortfolio} from '../controllers/';

const router = express.Router();

router.get('/', getPortfolios);
router.get('/:id',getPortfolioById);
router.post('/', createPortfolio);
router.patch('/:id',updatePortfolio);
router.delete('/:id',deletePortfolio);

export default router;
