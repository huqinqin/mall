import Router from 'vue-router'
import Register from '../components/register.vue'
import Reset from '../components/reset.vue'
import SignupFinish from '../components/signupFinish.vue'
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
          path: '/signupFinish',
          component: SignupFinish
      },{
          path: '/waitAuthing',
          component: WaitAuthing
      },
  ]
})
