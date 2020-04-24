import Router from 'koa-router';
import { makeRequest, getAll, accept, cancel } from '../controller/friendship';
import authorizeMiddleware from '../middleware/authorize';
import validateMiddleware from '../middleware/validate';
import FriendRequest from '../dto/FriendRequest';

const router = new Router();

router.post('/friendships', authorizeMiddleware, validateMiddleware(FriendRequest), makeRequest);
router.get('/friendships', authorizeMiddleware, getAll);
router.post('/friendships/:id', authorizeMiddleware, accept);
router.delete('/friendships/:id', authorizeMiddleware, cancel);

export default router;
