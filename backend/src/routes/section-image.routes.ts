import express from 'express';
import { getSectionImages, createSectionImage,updateSectionImage,deleteSectionImage} from '../controllers/';

const router = express.Router();

router.get('/', getSectionImages);
router.post('/:portfolioId', createSectionImage);
router.patch('/:id', updateSectionImage);
router.delete('/:id', deleteSectionImage);

export default router;
