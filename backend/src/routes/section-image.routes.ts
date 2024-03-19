import express from 'express';
import { SectionImageController } from '../controllers';

const router = express.Router();

router.get('/', SectionImageController.getSectionImages);
router.post('/:portfolioId', SectionImageController.createSectionImage);
router.patch('/:id', SectionImageController.updateSectionImage);
router.patch('/upload/:id', SectionImageController.uploadSectionImage);
router.delete('/:id', SectionImageController.deleteSectionImage);

export default router;
