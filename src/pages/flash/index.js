import Lib from '@/common/js'
import Vue from 'vue'
import App from './flash.vue'
import Router from 'vue-router'

Vue.config.productionTip = false

Vue.use(Router)
let routerView = new Router({
    routes: []
})
Lib(App, routerView)
