import Lib from '@/common/js/'
import Vue from 'vue'
import Router from 'vue-router'
import App from './finance.vue'

Vue.config.productionTip = false
Vue.use(Router)
let routerView = new Router({
  routes: []
})
Lib(App, routerView)
