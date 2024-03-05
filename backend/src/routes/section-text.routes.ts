import express from 'express';
import { SectionTextController } from '../controllers';

const router = express.Router();

router.get('/', SectionTextController.getSectionTexts);
router.post('/:portfolioId', SectionTextController.createSectionText);
router.patch('/:id', SectionTextController.updateSectionText);
router.delete('/:id', SectionTextController.deleteSectionText);

export default router;
