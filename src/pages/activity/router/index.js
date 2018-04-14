import Router from 'vue-router'
import Vue from 'vue'
import index from '../components/index.vue'
import search from '../components/search.vue'
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
      path: '/search',
      name: 'search',
      component: search,
    }
  ]
})
