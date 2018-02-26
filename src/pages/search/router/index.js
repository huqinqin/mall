import Router from 'vue-router'
import Vue from  'vue'
import search from '../components/search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name : 'search',
      component: search
    }
  ]
})
