import Vue from 'vue'
import session from '@/library/Session'
import $ from 'jquery'

let eventHub = new Vue() // 组件传递事件的Context
Vue.prototype.selfContext = eventHub

Vue.mixin({
    methods:{
        checkedAllAuth(){
           session.checkLogin(eventHub);
        }
    }
});
Vue.directive('login',{
    inserted(el) {
        $("body").delegate(el,'click',()=>{
            if(!session.checkLogin(eventHub)){
                // 未登录 拦截一切事件
                return false;
            }
        })
    }
})
