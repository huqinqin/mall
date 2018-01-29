import Lib from '@/common/js/'
import Router from 'vue-router'
import App from './order.vue'
import list from './components/list'
import detail from './components/detail'

Vue.config.productionTip = false;
Vue.use(Router);
let routerView = new Router({
    routes: [
        {
            path: '/',
            component: list
        },
        {
            path: '/list',
            component: list
        },
        {
            path: '/detail/:tid',
            component: detail
        }
    ]
});
Lib(App, routerView);
