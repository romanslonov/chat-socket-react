import Router from 'koa-router';
import multer from '@koa/multer';
import { uploadAvatar } from '../controller/user';
import authorizeMiddleware from '../middleware/authorize';

const router = new Router();
const upload = multer();

router.post('/users/upload', upload.single('avatar'), authorizeMiddleware, uploadAvatar);

export default router;
