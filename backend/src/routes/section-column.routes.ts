import express from 'express';
import { SectionColumn } from '../controllers';
import { validateToken } from './validation';

const router = express.Router();

router.get('/', validateToken, SectionColumn.getSectionColumns);
router.post('/:portfolioId', validateToken, SectionColumn.createSectionColumn);
router.patch('/:id', validateToken, SectionColumn.updateSectionColumn);
router.delete('/:id', validateToken, SectionColumn.deleteSectionColumn);

export default router;
