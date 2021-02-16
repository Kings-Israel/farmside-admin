import Vue from 'vue'
import Router from 'vue-router'
import Bookings from '@/components/Bookings'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import Messages from '@/components/Messages'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/',
          name: "Bookings",
          component: Bookings,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/messages',
          name: 'Messages',
          component: Messages,
          meta: {
            requiresAuth: true
          }
        }
      ]
    }
  ]
})
  router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('token') == null) {
            next({
                name: 'Login',
            })
        } else {
            next()
        }
    } else if(to.matched.some(record => record.meta.requiresGuest)) {
        if(localStorage.getItem('token') !== null){
          next({ name: 'Bookings'})
        }
        else{
          next()
        }
    } else {
        next()
    }
  })

  export default router