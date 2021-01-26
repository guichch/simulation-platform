import Vue from 'vue'
import VueRouter from 'vue-router'
const login = () => import('../views/login/login.vue')
const Home = () => import('../views/home/Home.vue')
import map3dRouter from './map3dRouter'
import map2dRouter from './map2dRouter'


Vue.use(VueRouter)

const routes = [
  {
    path:'',
    redirect: '/home'
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/home',
    component: Home,
    children: [
      map3dRouter,
      map2dRouter
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

/* router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next();
  } else {
    let token = sessionStorage.getItem('token');
    console.log(token);
    if (token === null || token === '') {
      next('/login');
    } else {
      next();
    }
  }
}) */
