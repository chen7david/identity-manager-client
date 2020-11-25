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
    meta: { rejectsAuth: true },
    component: () => import('../views/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: { rejectsAuth: true },
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
  {
    path: '/movies',
    name: 'Movies',
    component: () => import('../views/Movies.vue')
  },
  {
    path: '/movie/:id',
    name: 'Movie',
    component: () => import('../views/Movie.vue'),
    props: true
  },
  {
    path: '/shows',
    name: 'Shows',
    component: () => import('../views/Shows.vue'),
  },
  {
    path: '/show/:id',
    name: 'Show',
    component: () => import('../views/Show.vue'),
    props: true
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
  } else if(to.matched.some(record => record.meta.rejectsAuth)) {
      if(auth){
        const notification = {
          message: 'please logout before accessing this route!',
          state: 'warning'
        }
        const routeConfig = {
          path: from.fullPath,
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
