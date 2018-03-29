import Lib from '@/common/js'
import Vue from 'vue'
import App from './index.vue'
import routerView from './router'
Lib(App, routerView)
Vue.config.productionTip = false

// const RouterView = routerView ? routerView : ''
// Lib(App, RouterView)
