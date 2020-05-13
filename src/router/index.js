import Vue from 'vue'
import VueRouter from 'vue-router'
// 用户界面
import login from '../components/login.vue'
import register from '../components/register.vue'
import index from'../components/index.vue'
import detail from '../components/questionDetail.vue'
import setting from '../components/setting.vue'
import message from '../components/message.vue'
import report from '../components/module/report.vue'
import search from '../components/search.vue'
import collapse from '../components/module/collapse.vue'
import secondAnswer from '../components/module/secondAnswer.vue'
import userpage_activeQuestions from '../components/userpage_activeQuestions.vue'
import userpage_blockedQuestions from '../components/userpage_blockedQuestions.vue'
import userpage_terminatedQuestions from '../components/userpage_terminatedQuestions.vue'
import userpage_myAnswers from '../components/userpage_myAnswers.vue'
import userpage_blockedAnswers from '../components/userpage_blockedAnswers.vue'

// 管理员界面
import manager_login from '../managerComponents/manager_login.vue'
import manager_index from '../managerComponents/manager_index.vue'
import check_userRegister from '../managerComponents/check_userRegister.vue'
import check_userReport from '../managerComponents/check_userReport.vue'
import check_questions from '../managerComponents/check_questions.vue'
import check_answers from '../managerComponents/check_answers.vue'

// import swiper from '../components/module/swiper.vue'
// import like from '../components/module/like.vue'
Vue.use(VueRouter)

const routes = [
  // 用户界面
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
  {
    path: '/userpage/activeQuestions',
    name: 'userpage_activeQuestions',
    component: userpage_activeQuestions
  },{
    path: '/userpage/blockedQuestions',
    name: 'userpage_blockedQuestions',
    component: userpage_blockedQuestions
  },{
    path: '/userpage/terminatedQuestions',
    name: 'userpage_terminatedQuestions',
    component: userpage_terminatedQuestions
  },{
    path: '/userpage/myAnswers',
    name: 'userpage_myAnswers',
    component: userpage_myAnswers
  },{
    path: '/userpage/blockedAnswers',
    name: 'userpage_blockedAnswers',
    component: userpage_blockedAnswers
  },
//  管理员界面
  {
    path: '/manager/login',
    name: 'manager_login',
    component:manager_login
  },
  {
    path: '/manager/index',
    name: 'manager_index',
    component:manager_index
  },
  {
    path: '/manager/check/userRegister',
    name: 'check_userRegister',
    component:check_userRegister
  },
  {
    path: '/manager/check/userReport',
    name: 'check_userReport',
    component:check_userReport
  },
  {
    path: '/manager/check/questions',
    name: 'check_questions',
    component:check_questions
  },
  {
    path: '/manager/check/answers',
    name: 'check_answers',
    component:check_answers
  },
  // {
  //   path: 'like',
  //   name: 'like',
  //   component:like
  // },
]

const router = new VueRouter({
  routes
})

export default router
