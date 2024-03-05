import express from 'express';
import { getSectionImageTexts, createSectionImageText,updateSectionImageText,deleteSectionImageText} from '../controllers/';

const router = express.Router();

router.get('/', getSectionImageTexts);
router.post('/:portfolioId', createSectionImageText);
router.patch('/:id', updateSectionImageText);
router.delete('/:id', deleteSectionImageText);

export default router;
