import Lib from '@/common/js'
import Vue from 'vue'
import Router from 'vue-router'
import App from './detail.vue'
import routerView from './router'
Lib(App, new Router())
Vue.config.productionTip = false

const RouterView = routerView ? routerView : ''
Lib(App, RouterView)