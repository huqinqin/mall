import Lib from '@/common/js'
import Vue from 'vue'
import Router from 'vue-router'
import App from './index.vue'
Lib(App, new Router())
Vue.config.productionTip = false

// const RouterView = routerView ? routerView : ''
// Lib(App, RouterView)
