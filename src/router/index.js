import Vue from 'vue'
import VueRouter from 'vue-router'
const login = () => import('../views/login/login.vue')
const Home = () => import('../views/home/Home.vue')
import map3dRouter from './map3dRouter'
import map2dRouter from './map2dRouter'
/* const SatelliteList = () => import('@/components/righttool/sitelliteResource/showArea/SatelliteList')
const StstemIndicators = () => import('@/components/righttool/sitelliteResource/showArea/SystemIndicators')
const EarthList = () => import('@/components/righttool/sitelliteResource/showArea/EarthList')
const Broadcasting = () => import('@/components/righttool/sitelliteResource/showArea/Broadcasting')
const Onboard = () => import('@/components/righttool/sitelliteResource/showArea/Onboard')
const Emergency = () => import('@/components/righttool/sitelliteResource/showArea/Emergency') */

// 解决重复点击导航路由报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}


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
    redirect: '/home/2dmap',
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
