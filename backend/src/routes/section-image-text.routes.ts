import express from 'express';
import { SectionImageText } from '../controllers';

const router = express.Router();

router.get('/', SectionImageText.getSectionImageTexts);
router.post('/:portfolioId', SectionImageText.createSectionImageText);
router.patch('/:id', SectionImageText.updateSectionImageText);
router.delete('/:id', SectionImageText.deleteSectionImageText);

export default router;