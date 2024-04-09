import express from 'express';
import { SectionGalleryController } from '../controllers';
import { validateToken } from './validation';

const router = express.Router();

router.get('/', validateToken, SectionGalleryController.getSectionGalleries);
router.post('/:portfolioId', validateToken, SectionGalleryController.createSectionGallery);
router.patch('/:id', validateToken, SectionGalleryController.updateSectionGallery);
router.patch('/upload/:id/:position', validateToken, SectionGalleryController.uploadSectionGallery);
router.delete('/:id', validateToken, SectionGalleryController.deleteSectionGallery);

export default router;
