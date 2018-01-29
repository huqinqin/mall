import Vue from 'vue'
import Router from 'vue-router'
import Signup from '../components/signup.vue'
import Forget from '../components/forget.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/signup',
      component: Signup
    },
      {
          path: '/forget',
          component: Forget
      },
  ]
})
