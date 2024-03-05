import express from 'express';
import { SectionDividerController } from '../controllers';

const router = express.Router();

router.get('/', SectionDividerController.getSectionDividers);
router.post('/:portfolioId', SectionDividerController.createSectionDivider);
router.patch('/:id', SectionDividerController.updateSectionDivider);
router.delete('/:id', SectionDividerController.deleteSectionDivider);

export default router;
