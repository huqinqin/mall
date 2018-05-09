import Router from 'vue-router'
import Vue from 'vue'
import info from '../components/info.vue'
import pack from '../components/pack.vue'
import packlist from '../components/packlist.vue'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/info',
      name: 'info',
      component: info,
    },
    {
      path: '/pack',
      name: 'pack',
      component: pack,
    },
    {
      path: '/packlist',
      name: 'packlist',
      component: packlist,
    }
  ]
})
