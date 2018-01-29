import Lib from '@/common/js'
import App from './cart.vue'
import routerView from './router'
Vue.config.productionTip = false

const RouterView = routerView ? routerView : ''
Lib(App, RouterView)
