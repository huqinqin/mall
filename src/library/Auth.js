import session from '@/library/Session'
import $ from 'jquery'

let eventHub = new Vue() // 组件传递事件的Context
Vue.prototype.selfContext = eventHub
window.selfContext = eventHub;

Vue.directive('login',{
    inserted(el) {
        el.onclick = function($event){
            if(!session.checkLogin(eventHub)){
                // 未登录 拦截一切事件
                $event.stopPropagation();
                return false;
            }
        }
    }
})

Vue.directive('ltsLoginShow',{
    bind(el,binding){
        if(binding.arg == session.checkLogin().toString()){

        }else{
            el.style.display = 'none'
        }
    }
})

