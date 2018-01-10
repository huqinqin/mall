import Vue from 'vue'
import Router from 'vue-router'
import Settle from '../components/settle'
import Finish from '../components/finish'
import BeforePay from '../components/beforePay'
import List from '../components/list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: List
    },
    {
      path: '/list',
      component: List
    },
    {
      path: '/settle',
      name: 'settle',
      component: Settle
    },
    {
      path: '/beforePay',
      component: BeforePay
    },
    {
      path: '/finish',
      component: Finish
    }
  ]
})
