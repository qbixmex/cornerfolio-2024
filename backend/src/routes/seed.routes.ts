import { Router } from 'express';
import { SeedController } from '../controllers';

const router = Router();

router.post('/', SeedController.seed);

export default router;