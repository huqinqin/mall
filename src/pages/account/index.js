import Lib from '@/common/js'
import Vue from 'vue'
import App from './account.vue'
import routerView from './router'
Vue.config.productionTip = false

const RouterView = routerView
Lib(App, RouterView)
