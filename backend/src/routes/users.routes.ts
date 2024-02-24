import { Router } from 'express';
import * as controller from '../controllers/users.controller';

const router = Router();

router.get('/', controller.list);
router.get('/:id', controller.profile);
router.patch('/:id', controller.update);
router.delete('/:id', controller.remove);

export default router;
