import express from 'express';
import { getSectionEmbeddedMedias, createSectionEmbeddedMedia,updateSectionEmbeddedMedia,deleteSectionEmbeddedMedia} from '../controllers/';

const router = express.Router();

router.get('/', getSectionEmbeddedMedias);
router.post('/:portfolioId', createSectionEmbeddedMedia);
router.patch('/:id', updateSectionEmbeddedMedia);
router.delete('/:id', deleteSectionEmbeddedMedia);

export default router;
