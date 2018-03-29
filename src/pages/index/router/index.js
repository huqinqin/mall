import Router from 'vue-router'
import Vue from 'vue'
import info from '../components/info.vue'
import index from '../components/index.vue'
import config from 'config'
import $ from 'jquery'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
    },
    {
      path: '/detail',
      name: 'info',
      component: info,
    }
  ]
})
