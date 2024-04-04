import { Router } from 'express';
import { UsersController } from '../controllers';
import { validateRegisterFields, validateToken, validateUpdateFields } from './validation';

const router = Router();

router.get('/', validateToken, UsersController.list);
router.get('/count-total/:term?', validateToken, UsersController.totalPages);
router.get('/:id', validateToken, UsersController.profile);
router.get('/search/:term', validateToken, UsersController.search);
router.post('/', validateToken, validateRegisterFields, UsersController.create);
router.patch('/:id', validateToken, validateUpdateFields, UsersController.update);
router.patch('/:id/update-password', validateToken, UsersController.updatePassword);
router.delete('/:id', validateToken, UsersController.remove);

export default router;
