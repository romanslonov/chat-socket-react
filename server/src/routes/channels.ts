import Router from 'koa-router';
import { create, getMessagesByChannel, getAll, typing } from '../controller/channel';
import { Channel } from '../entity/Channel';
import validationMiddleware from '../middleware/validate';
import authorizeMiddleware from '../middleware/authorize';

const router = new Router();

router.get('/channels', authorizeMiddleware, getAll);
router.get('/channels/:id/messages', authorizeMiddleware, getMessagesByChannel);
router.post('/channels', authorizeMiddleware, validationMiddleware(Channel), create);
router.post('/channels/:id/typing', authorizeMiddleware, typing);

export default router;
