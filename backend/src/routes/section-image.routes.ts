import express from 'express';
import { SectionImageController } from '../controllers';
import { validateToken } from './validation';

const router = express.Router();

router.get('/', validateToken, SectionImageController.getSectionImages);
router.post('/:portfolioId', validateToken, SectionImageController.createSectionImage);
router.patch('/:id', validateToken, SectionImageController.updateSectionImage);
router.patch('/upload/:id', validateToken, SectionImageController.uploadSectionImage);
router.delete('/:id', validateToken, SectionImageController.deleteSectionImage);

export default router;
