import Vue from 'vue'
import Router from 'vue-router'
import Bookings from '@/components/Bookings'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import Messages from '@/components/Messages'
import MainPage from '@/components/MainPage'
import Gallery from '@/components/Gallery'
import EditAdmin from '@/components/EditAdmin'

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
        requiresAuth: true,
        transitionName: 'slide'
      },
      children: [
        {
          path: '/',
          name: "Bookings",
          component: Bookings,
          meta: {
            requiresAuth: true,
            transitionName: 'slide'
          }
        },
        {
          path: '/messages',
          name: 'Messages',
          component: Messages,
          meta: {
            requiresAuth: true,
            transitionName: 'slide'
          }
        },
        {
          path: '/mainpage',
          name: 'MainPage',
          component: MainPage,
          meta: {
            requiresAuth: true,
            transitionName: 'slide'
          }
        },
        {
          path: '/gallery',
          name: 'Gallery',
          component: Gallery,
          maeta: {
            requiresAuth: true,
            transitionName: 'slide'
          }
        },
        {
          path: '/subscriptionEmails',
          name: 'SubscriptionsEmails'
        },
        {
          path: '/edit_info',
          name: 'EditInfo',
          component: EditAdmin,
          meta: {
            requiresAuth: true,
            transitionName: 'slide'
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