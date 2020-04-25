import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { secure: true },
    component: Home,
    children: [
      {
        path: '/channels/:id',
        name: 'Channel',
        component: () => import(/* webpackChunkName: "channel" */ '../views/Channel.vue'),
      },
    ],
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "signup" */ '../views/Signup.vue'),
  },
  {
    path: '/signin',
    name: 'Signin',
    component: () => import(/* webpackChunkName: "signin" */ '../views/Signin.vue'),
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '../views/NotFound.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const token = window.localStorage.getItem('token');
  if (
    to.matched.some((record) => record.meta.secure) && (token === null || token === undefined)
  ) {
    return next({ name: 'Signin' });
  }

  return next();
});

export default router;
