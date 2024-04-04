import express from 'express';
import { SectionTextController } from '../controllers';
import { validateToken } from './validation';

const router = express.Router();

router.get('/', validateToken, SectionTextController.getSectionTexts);
router.post('/:portfolioId', validateToken, SectionTextController.createSectionText);
router.patch('/:id', validateToken, SectionTextController.updateSectionText);
router.delete('/:id', validateToken, SectionTextController.deleteSectionText);

export default router;
