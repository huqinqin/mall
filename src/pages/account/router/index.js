import Router from 'vue-router'
import Vue from  'vue'
import Register from '../components/register.vue'
import Reset from '../components/reset.vue'
import WaitAuthing from '../components/waitAuthing.vue'
Vue.use(Router)

export default new Router({
  routes: [
      {
          path: '/',
          component: Register
      },
      {
          path: '/register',
          component: Register
      },
      {
          path: '/reset',
          component: Reset
      },
      {
          path: '/waitAuthing',
          component: WaitAuthing
      },
  ]
})
