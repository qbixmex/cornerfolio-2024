import express from 'express';
import { SectionImageText } from '../controllers';
import { validateToken } from './validation';

const router = express.Router();

router.get('/', validateToken, SectionImageText.getSectionImageTexts);
router.post('/:portfolioId', validateToken, SectionImageText.createSectionImageText);
router.patch('/:id', validateToken, SectionImageText.updateSectionImageText);
router.delete('/:id', validateToken, SectionImageText.deleteSectionImageText);
router.patch('/upload/:id', validateToken, SectionImageText.uploadSectionImageText);

export default router;
