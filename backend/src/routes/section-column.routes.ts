import express from 'express';
import { SectionColumn } from '../controllers';

const router = express.Router();

router.get('/', SectionColumn.getSectionColumns);
router.post('/:portfolioId', SectionColumn.createSectionCloumn);
router.patch('/:id', SectionColumn.updateSectionColumn);
router.delete('/:id', SectionColumn.deleteSectionColumn);

export default router;
