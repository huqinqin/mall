import Router from 'vue-router'
import Vue from  'vue'
import Someinfo from '../components/someinfo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name : 'someinfo',
      component: Someinfo
    }
  ]
})
