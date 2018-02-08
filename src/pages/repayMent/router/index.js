import Router from 'vue-router'
import RepayList from '../components/repayList'
import ReadyPay from '../components/readyPay'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name : 'repayList',
      component: RepayList
    },
      {
          path: '/readyPay',
          name : 'readyPay',
          component: ReadyPay
      }
  ]
})
