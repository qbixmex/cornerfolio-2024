import express from 'express';
import { getSectionDividers, createSectionDivider,updateSectionDivider,deleteSectionDivider} from '../controllers/';

const router = express.Router();

router.get('/', getSectionDividers);
router.post('/:portfolioId', createSectionDivider);
router.patch('/:id', updateSectionDivider);
router.delete('/:id', deleteSectionDivider);

export default router;
