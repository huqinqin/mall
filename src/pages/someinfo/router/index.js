import Router from 'vue-router'
import Vue from  'vue'
import Someinfo from '../components/someinfo.vue'
import Coupon from '../components/coupon.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name : 'someinfo',
      component: Someinfo
    },
    {
      path: '/coupon',
      name : 'coupon',
      component: Coupon
    }
  ]
})
