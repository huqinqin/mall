import session from '@/library/Session'
import $ from 'jquery'
import Vue from  'vue'

let eventHub = new Vue() // 组件传递事件的Context
Vue.prototype.selfContext = eventHub
window.selfContext = eventHub;

Vue.directive('login',{
    inserted(el) {
        el.onclick = function(){
            if(!session.checkLogin(eventHub)){
                // 未登录 拦截一切事件
                $event.stopPropagation();
                return false;
            }
        }
    }
})

function checkLogin(e){
    if(!session.checkLogin(eventHub)){
        // 未登录 拦截一切事件
        e.stopPropagation();
        return false;
    }
}

Vue.directive('ltsLoginShow',{
    bind(el,binding){
        if(binding.arg == session.checkLogin().toString()){

        }else{
            el.style.display = 'none'
        }
    }
})

Vue.component('lts-login',{
    props : {
        display: {
            type: String,
            default: 'block'
        },
    },
    template: '<div v-on:click.capture="checkLogin" :style="{display : display}"><slot/></div>',
    methods:{
      checkLogin(e){
          if(!session.checkLogin(eventHub)){
              // 未登录 拦截一切事件
              e.stopPropagation();
          }
      }
    },
})

