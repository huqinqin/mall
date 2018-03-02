import Router from 'vue-router'
import Vue from 'vue'
import info from '../components/info.vue'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'info',
      component: info
    }
  ]
})
