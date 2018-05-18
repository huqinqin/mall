import Router from 'vue-router'
import Vue from 'vue'
import activity0427 from '../components/activity0427.vue'
import config from 'config'
import $ from 'jquery'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'activity0427',
      component: activity0427
    }]
})
