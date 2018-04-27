import Router from 'vue-router'
import Vue from 'vue'
import activity from '../components/activity.vue'
import activity0421 from '../components/activity0421.vue'
import activity0426 from '../components/activity0426.vue'
import activity0427 from '../components/activity0427.vue'
import config from 'config'
import $ from 'jquery'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'activity',
      component: activity
    },
      {
          path: '/activity0421',
          name: 'activity0421',
          component: activity0421
      },
      {
          path: '/activity0426',
          name: 'activity0426',
          component: activity0426
      },
      {
          path: '/activity0427',
          name: 'activity0427',
          component: activity0427
      }
  ]
})
