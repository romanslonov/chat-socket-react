import Router from 'koa-router';
import authRoutes from './auth';
import channelsRoutes from './channels';
import messagesRoutes from './messages';
import profileRoutes from './profile';
import usersRoutes from './users';

const router = new Router({ prefix: '/api/v1' });

router.use(authRoutes.routes(), authRoutes.allowedMethods());
router.use(channelsRoutes.routes(), channelsRoutes.allowedMethods());
router.use(messagesRoutes.routes(), messagesRoutes.allowedMethods());
router.use(profileRoutes.routes(), profileRoutes.allowedMethods());
router.use(usersRoutes.routes(), usersRoutes.allowedMethods());

export default router;
