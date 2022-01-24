import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/login.vue'
import Home from '@/views/Home/home.vue'

Vue.use(Router)

const routes = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    }
  ]
})

routes.beforeEach((to, from, next) => {
  let isLogged =  JSON.parse(localStorage.getItem('user'))
  
  if (to.meta.auth) {
    if (!isLogged) {
      localStorage.clear()

      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
      return
    } else {
      next()
    }
  }
  else {
    if (to.matched.length === 0) {
      next('/notFound')
      return
    } else next()
  }

  if (to.path === '/') {
    if (isLogged !== null) {
      next({ path: '/home' })
    } else {
      next()
    }
  }

  if (to.path === '/home') {
    if (isLogged !== null) {
      next({ path: '/home' })
    } else {
      next({ path: '/' })
    }
  }

  if (to.path === '/Home') {
    if (isLogged !== null) {
      next({ path: '/home' })
    } else {
      next({ path: '/' })
    }
  }
  
})

export default routes

