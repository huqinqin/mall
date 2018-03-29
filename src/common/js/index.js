import  VueI18n from 'vue-i18n'
import Vue from  'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import {dateUtils} from 'ltsutil'
import Layout from 'layout'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale';
import '../../../static/css/element-variables.scss'
import Loading from '../components/lts-loading'
import Message from '../components/lts-message'
import MessageBox from '../components/lts-messageBox'
import ltsHeader from '@/layout/mall_layout_1.0.0/lts-header.vue'
import ltsHeaderAll from '@/layout/mall_layout_1.0.0/lts-header-all.vue'
import ltsHeaderSimple from '@/layout/mall_layout_1.0.0/lts-header-simple.vue'
import ltsFooter from '@/layout/mall_layout_1.0.0/lts-footer.vue'
import ltsMenu from '@/layout/mall_layout_1.0.0/lts-menu.vue'
import ltsEmpty from '@/layout/mall_layout_1.0.0/lts-empty.vue'
import ltsMoney from '../components/lts-money.js'
import './filter'
import {store} from 'ltsutil'
import config from 'config'
Vue.use(VueI18n)
Vue.use(Router)
Vue.prototype.$ltsLoading = Loading
Vue.prototype.$ltsMessage = Message
Vue.prototype.$ltsMessageBox = MessageBox
Vue.config.productionTip = false
Vue.config.lang = store.getItem('language') ? store.getItem('language') : 'en'
const i18n = new VueI18n({
  locale  : Vue.config.lang,    // 语言标识
  messages: {
    // 中文语言包
    cn: require('@/lang/cn').default,
    en: require('@/lang/en').default
  }
})

Vue.use(Element, {
    i18n: (key, value) => i18n.t(key, value)
})
export default function (App, router = new Router()) {
  let isIndex = true,isCart = true
  // App.name && App.name == 'index' ? isIndex = true : isIndex = false;
  // App.name && (App.name == 'cart' || App.name == 'order') ? isCart = true : isCart = false;
  config.isWhite = isIndex
  config.isCart = isCart

    Layout.components = {
        'lts-content': App,
        'lts-header': ltsHeader,
        'lts-footer':ltsFooter,
        'lts-header-content':ltsEmpty,
        'lts-menu':ltsEmpty,
    }
    let showHeadAll = ['index','search','detail']
    let showMenu = ['order','address','finance','personal','repayment','reverse']
    let noHead = ['cart','account']
    let pages = [
        {
            name:'index',
            components:[
                {
                    name : 'lts-header-content',
                    template : ltsHeaderAll
                },
            ]
        },
        {
            name:'search',
            components:[
                {
                    name : 'lts-header-content',
                    template : ltsHeaderAll
                },
            ]
        },
        {
            name:'detail',
            components:[
                {
                    name : 'lts-header-content',
                    template : ltsHeaderAll
                },
            ]
        },
        {
            name:'order',
            components:[
                {
                    name : 'lts-header-content',
                    template : ltsHeaderSimple
                },
                {
                    name : 'lts-menu',
                    template : ltsMenu
                }
            ]
        },
        {
            name:'address',
            components:[
                {
                    name : 'lts-header-content',
                    template : ltsHeaderSimple
                },
                {
                    name : 'lts-menu',
                    template : ltsMenu
                }
            ]
        },
        {
            name:'finance',
            components:[
                {
                    name : 'lts-header-content',
                    template : ltsHeaderSimple
                },
                {
                    name : 'lts-menu',
                    template : ltsMenu
                }
            ]
        },
        {
            name:'personal',
            components:[
                {
                    name : 'lts-header-content',
                    template : ltsHeaderSimple
                },
                {
                    name : 'lts-menu',
                    template : ltsMenu
                }
            ]
        },
        {
            name:'repayment',
            components:[
                {
                    name : 'lts-header-content',
                    template : ltsHeaderSimple
                },
                {
                    name : 'lts-menu',
                    template : ltsMenu
                }
            ]
        },
        {
            name:'reverse',
            components:[
                {
                    name : 'lts-header-content',
                    template : ltsHeaderSimple
                },
                {
                    name : 'lts-menu',
                    template : ltsMenu
                }
            ]
        },
        {
            name:'cart',
            components:[]
        },
        {
            name:'account',
            components:[]
        },
        {
            name:'someinfo',
            components:[{
                name : 'lts-menu',
                template : ltsMenu
            },{
                name : 'lts-header-content',
                template : ltsHeaderSimple
            }]
        }
    ]

    pages.forEach((value,index,array)=>{
        if(value.name == App.name){
            if(value.components && value.components.length > 0){
                value.components.forEach((val,key,array)=>{
                    Layout.components[val.name] = val.template;
                })
            }
        }
    })
    const VueIl8n = new Vue({
        el        : '#app',
        i18n      : i18n,
        router,
        template  : '<Layout/>',
        components: {Layout},
    })
    let checkIl8n = (msg)=>{
        if(msg){
            return VueIl8n.$t(msg);
        }
    }
    Vue.prototype.checkIl8n = checkIl8n;
    window.checkIl8n = checkIl8n;
    window.onpageshow = function(event) {
        if (event.persisted) {
            window.location.reload()
        }
    };
}
