import Router from 'vue-router'
import Vue from 'vue'
import info from '../components/info.vue'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/info',
      name: 'info',
      component: info,
      beforeEnter: (to, from, next) => {
          console.log(to);
          console.log(from);
          console.log(next);
      }
    }
  ]
})
