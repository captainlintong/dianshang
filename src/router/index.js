import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Layout from '@/views/Layout'
import UserList from '@/views/user'
import Home from '@/views/Home'

Vue.use(Router)

var router = new Router({
  routes: [
    { path: '/login', component: Login },
    { path: '/',
      component: Layout,
      children: [
        { path: '', component: Home },
        { path: '/users', component: UserList }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  const token = window.localStorage.getItem('token')
  if (!token) {
    return next('/login')
  }
  next()
})
export default router
