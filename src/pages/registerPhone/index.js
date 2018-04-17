import Lib from '@/common/js/'
import Router from 'vue-router'
import Vue from  'vue'
import App from '@/pages/registerPhone/registerPhone.vue'

Vue.config.productionTip = false;
Vue.use(Router);
let routerView = new Router({
    routes: []
});

Lib(App, routerView);
