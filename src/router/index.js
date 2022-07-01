import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/home/HomeView.vue';
import Store from '../store/index.js'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {requiresAuth: true},
  },
  {
    path: '/blog/:id',
    name: 'blogDetail',
    component: () => import(/* webpackChunkName: "about" */ '../views/blog/BlogDetail.vue'),
    props: true
  },
  {
    path: '/blog-new/:id',
    name: 'blogNew',
    component: () => import(/* webpackChunkName: "about" */ '../views/blog/BlogNew.vue'),
    props: true
  },
  // {
  //   path: '/register',
  //   name: 'register',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/auth/RegisterPage.vue'),
  //   meta: { guest: true },
  // },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/auth/SignInPage.vue'),
  //   meta: { guest: true },
  // },

  { path: '*', redirect: '/' }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.name !== 'home')) {
    Store.dispatch('system/setSearch', false);
//     const loggedIn = localStorage.getItem('tokenDom');
//     if (!loggedIn) return next('/login')
    next()
  } else {
    Store.dispatch('system/setSearch', true);
    next()
  }
  next()
})

export default router;
