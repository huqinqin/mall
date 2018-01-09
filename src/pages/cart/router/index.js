import Vue from 'vue'
import Router from 'vue-router'
import Settle from '../components/settle'
import Finish from '../components/finish'
import Pay from '../components/pay'
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
      path: '/pay',
      component: Pay
    },
    {
      path: '/finish',
      component: Finish
    }
  ]
})
