import Router from 'vue-router'
import Vue from 'vue'
import Settle from '../components/settle'
import Finish from '../components/finish'
import Fail from '../components/fail'
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
      name: 'beforePay',
      component: BeforePay
    },
    {
      path: '/finish',
      name: 'finish',
      component: Finish
    },
    {
      path: '/fail',
      name: 'fail',
      component: Fail
    }
  ]
})
