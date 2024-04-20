import express from 'express';
import { SectionDividerController } from '../controllers';
import { validateToken } from './validation';

const router = express.Router();

router.get('/', validateToken, SectionDividerController.getSectionDividers);
router.post('/:portfolioId', validateToken, SectionDividerController.createSectionDivider);
router.patch('/:id', validateToken, SectionDividerController.updateSectionDivider);
router.delete('/:id', validateToken, SectionDividerController.deleteSectionDivider);

export default router;
