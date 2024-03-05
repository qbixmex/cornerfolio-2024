import { Router } from 'express';
import { AuthController } from '../controllers';
import { validateRegisterFields, validateLoginFields } from './validation';

const router = Router();

router.post('/register', validateRegisterFields, AuthController.register);
router.post('/login', validateLoginFields, AuthController.login);

export default router;