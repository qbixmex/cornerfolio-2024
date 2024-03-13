import { Router } from 'express';
import { FilesController } from '../controllers';
import { fileMiddleware } from '../middlewares';

const router = Router();

router.post('/upload', fileMiddleware, FilesController.upload);

export default router;