import Router from 'vue-router'
import Vue from  'vue'
import search from '../components/search'

/**
 * 合并到index 某模块。
 * 这个暂时保留
 */
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/detail',
      name : 'search',
      component: search
    }
  ]
})
