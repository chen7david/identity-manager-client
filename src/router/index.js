import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from './../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/account',
    name: 'Account',
    meta: { requiresAuth: true },
    component: () => import('../views/Account.vue')
  },
  {
    path: '/users',
    name: 'Users',
    meta: { requiresAuth: true },
    component: () => import('../views/Users.vue')
  },
  {
    path: '/devices',
    name: 'Devices',
    meta: { requiresAuth: true },
    component: () => import('../views/Devices.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  
  let auth = store._vm.isAuth
  
  if(to.matched.some(record => record.meta.requiresAuth)){

    if(!auth){
      const notification = {
        message: 'please login before accessing this route!',
        state: 'warning'
      }
      const routeConfig = {
        path: '/login',
        query: { redirect: to.fullPath }
      }
      store.dispatch('setSnackbar', notification)
      next(routeConfig)
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
