import express from 'express';
import * as controller from '../controllers/';

const router = express.Router();

router.get('/', controller.getSectionTexts);
router.post('/:portfolioId', controller.createSectionText);
router.patch('/:id', controller.updateSectionText);
router.delete('/:id', controller.deleteSectionText);

export default router;
