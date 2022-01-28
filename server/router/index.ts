import { Router } from 'express';
import UploadRouter from './upload';

const router = Router();

router.use('/upload', UploadRouter);

export default router;
