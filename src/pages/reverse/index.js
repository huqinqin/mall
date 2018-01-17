import Lib from '@/common/js/'
import Vue from 'vue'
import Router from 'vue-router'
import App from './reverse.vue'
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
            path: '/detail/:id',
            component: detail
        }
    ]
});
Lib(App, routerView);
