import { Router } from 'express';
import * as controller from '../controllers/users.controller';
import { validateRegisterFields, validateUpdateFields } from './validation';

const router = Router();

router.get('/', controller.list);
router.get('/:id', controller.profile);
router.post('/', validateRegisterFields, controller.create);
router.patch('/:id', validateUpdateFields, controller.update);
router.delete('/:id', controller.remove);

export default router;
