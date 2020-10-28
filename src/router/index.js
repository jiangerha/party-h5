import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Cookies from 'js-cookie';

const token = Cookies.get('token');

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect:token ? '/personal' : '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/personal',
    name: 'Personal',
    // route level code-splitting
    // this generates a separate chunk (personal.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "personal" */ '../views/PersonalInfo.vue')
  },
  {
    path: '/organActivity',
    name: 'OrganActivity',
    component: () => import(/* webpackChunkName: "organActivity" */ '../views/OrganActivity.vue')
  },
  {
    path: '/organActidetail/:id',
    name: 'OrganActivityDetail',
    component: () => import(/* webpackChunkName: "OrganActivityDetail" */ '../views/ActivityDetail.vue')
  },
  {
    path: '/checkEntry',
    name: 'CheckEntry',
    component: () => import(/* webpackChunkName: "CheckEntry" */ '../views/CheckEntry.vue')
  },
  {
    path: '/checkForm/:id',
    name: 'CheckForm',
    component: () => import(/* webpackChunkName: "CheckForm" */ '../views/CheckForm.vue')
  },
  {
    path: '/organTransfer',
    name: 'OrganTransfer',
    component: () => import(/* webpackChunkName: "OrganTransfer" */ '../views/OrganTransfer.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
