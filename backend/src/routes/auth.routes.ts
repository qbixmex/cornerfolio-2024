import { Router } from 'express';
import * as controller from '../controllers/auth.controller';
import { validateRegisterFields } from './validation';

const router = Router();

router.post('/register', validateRegisterFields, controller.register);

router.post('/login', controller.login);

export default router;