import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import register from '../components/register.vue'
import index from'../components/index.vue'
import detail from '../components/questionDetail.vue'
import userpage from '../components/userpage.vue'
import setting from '../components/setting.vue'
import message from '../components/message.vue'
import report from '../components/module/report.vue'
import search from '../components/search.vue'
import collapse from '../components/module/collapse.vue'
import secondAnswer from '../components/module/secondAnswer.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/detail',
    name: 'detail',
    component: detail
  },
  {
    path: '/userpage',
    name: 'userpage',
    component: userpage
  },
  {
    path: '/setting',
    name: 'setting',
    component: setting
  },
  {
    path: '/message',
    name: 'message',
    component: message
  },
  {
    path: '/report',
    name: 'report',
    component: report
  },
  {
    path: '/search',
    name: 'search',
    component: search
  },
  {
    path: '/collapse',
    name: 'collapse',
    component: collapse
  },
  {
    path: '/secondAnswer',
    name: 'secondAnswer',
    component: secondAnswer
  },
//  
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
