import express from 'express';
import { getSectionTexts, createSectionText,updateSectionText,deleteSectionText} from '../controllers/';

const router = express.Router();

// list
router.get('/', getSectionTexts);

// create
router.post('/:portfolioId', createSectionText);

// update
router.put('/:id', updateSectionText);

// delete
router.delete('/:id', deleteSectionText);

export default router;
