import Lib from '@/common/js'
import Vue from 'vue'
import App from './cart.vue'
import routerView from './router'

Vue.config.productionTip = false

const RouterView = routerView
Lib(App, RouterView)
