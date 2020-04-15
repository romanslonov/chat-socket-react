import Router from 'koa-router';
import { search } from '../controller/user';
import authorizeMiddleware from '../middleware/authorize';

const router = new Router();

router.get('/users/search', authorizeMiddleware, search);

export default router;
