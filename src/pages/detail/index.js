import Lib from '@/common/js'
import Vue from  'vue'
import App from './detail.vue'
import routerView from './router'
const RouterView = routerView ? routerView : ''
Lib(App, RouterView)
