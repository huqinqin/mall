import Vue from 'vue'
import session from '@/library/Session'

let eventHub = new Vue() // 组件传递事件的Context
Vue.prototype.selfContext = eventHub

Vue.mixin({
    methods:{
        checkedAllAuth(){
           session.checkLogin(eventHub);
        }
    }
});

// Vue.directives('login',{
//     inserted(el) {
//         // 聚焦元素
//         el.click = function(){
//             alert(123);
//         }
//     }
//
// })
