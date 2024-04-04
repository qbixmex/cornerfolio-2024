import express from 'express';
import { SectionGalleryController } from '../controllers';

const router = express.Router();

router.get('/', SectionGalleryController.getSectionGallerys);
router.post('/:portfolioId', SectionGalleryController.createSectionGallery);
router.patch('/:id', SectionGalleryController.updateSectionGallery);
router.patch('/upload/:id/:position', SectionGalleryController.uploadSectionGallery);
router.delete('/:id', SectionGalleryController.deleteSectionGallery);

export default router;
