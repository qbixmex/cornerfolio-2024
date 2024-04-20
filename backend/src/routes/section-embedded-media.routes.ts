import express from 'express';
import { SectionEmbeddedMediaController } from '../controllers';
import { validateToken } from './validation';

const router = express.Router();

router.get('/', validateToken, SectionEmbeddedMediaController.getSectionEmbeddedMedias);
router.post('/:portfolioId', validateToken, SectionEmbeddedMediaController.createSectionEmbeddedMedia);
router.patch('/:id', validateToken, SectionEmbeddedMediaController.updateSectionEmbeddedMedia);
router.delete('/:id', validateToken, SectionEmbeddedMediaController.deleteSectionEmbeddedMedia);

export default router;
