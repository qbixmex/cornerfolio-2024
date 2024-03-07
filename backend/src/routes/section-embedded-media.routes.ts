import express from 'express';
import { SectionEmbeddedMediaController } from '../controllers';

const router = express.Router();

router.get('/', SectionEmbeddedMediaController.getSectionEmbeddedMedias);
router.post('/:portfolioId', SectionEmbeddedMediaController.createSectionEmbeddedMedia);
router.patch('/:id', SectionEmbeddedMediaController.updateSectionEmbeddedMedia);
router.delete('/:id', SectionEmbeddedMediaController.deleteSectionEmbeddedMedia);

export default router;
