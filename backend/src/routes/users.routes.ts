import { Router } from 'express';
import { UsersController } from '../controllers';
import { validateRegisterFields, validateUpdateFields } from './validation';

const router = Router();

router.get('/', UsersController.list);
router.get('/:id', UsersController.profile);
router.post('/', validateRegisterFields, UsersController.create);
router.patch('/:id', validateUpdateFields, UsersController.update);
router.delete('/:id', UsersController.remove);

export default router;
