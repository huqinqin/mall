import Router from 'vue-router'
import Vue from 'vue'
import activity from '../components/activity.vue'
import activitystart from '../components/activitystart.vue'
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
          path: '/activitystart',
          name: 'activitystart',
          component: activitystart
      }
  ]
})
