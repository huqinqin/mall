import Router from 'vue-router'
import Vue from 'vue'
import activity from '../components/activity.vue'
import config from 'config'
import $ from 'jquery'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'activity',
      component: activity
    }
  ]
})
