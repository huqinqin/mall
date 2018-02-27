import VueI18n from 'vue-i18n'
import Vue from  'vue'
import VueResource from 'vue-resource'
import {dateUtils} from 'ltsutil'

import Layout from 'layout'
import Element from 'element-ui'

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

import config from 'config'

Vue.use(VueI18n)
Vue.use(Element)
Vue.prototype.$ltsLoading = Loading
Vue.prototype.$ltsMessage = Message
Vue.prototype.$ltsMessageBox = MessageBox

Vue.config.lang = 'en'
Vue.config.productionTip = false


const i18n = new VueI18n({
  locale  : Vue.config.lang,    // 语言标识
  messages: {
    // 中文语言包
    cn: require('@/lang/cn').default,
    en: require('@/lang/en').default
  }
})

export default function (App, router = new Router()) {
  let isIndex = true,isCart = true
  App.name && App.name == 'index' ? isIndex = true : isIndex = false;
  // App.name && (App.name == 'cart' || App.name == 'order') ? isCart = true : isCart = false;
  config.isWhite = isIndex
  config.isCart = isCart

  let showHeadSimple = []
  let showHeadAll = ['index']
  let showMenu = ['order']
  let noHead = ['cart']

  if(showMenu.indexOf(App.name) !== -1){
      Layout.components = {
          'lts-content': App,
          'lts-header': ltsHeader,
          'lts-header-all': ltsEmpty,
          'lts-header-simple':ltsHeaderSimple,
          'lts-footer':ltsFooter,
          'lts-menu':ltsMenu
      }
  }
  if(showHeadAll.indexOf(App.name) !== -1){
      Layout.components = {
          'lts-content': App,
          'lts-header': ltsHeader,
          'lts-header-all': ltsHeaderAll,
          'lts-header-simple':ltsEmpty,
          'lts-footer':ltsFooter,
          'lts-menu':ltsEmpty
      }
  }
  if(noHead.indexOf(App.name) !== -1){
      Layout.components = {
          'lts-content': App,
          'lts-header': ltsHeader,
          'lts-header-all': ltsEmpty,
          'lts-header-simple':ltsEmpty,
          'lts-footer':ltsFooter,
          'lts-menu':ltsEmpty
      }
  }

  new Vue({
    el        : '#app',
    i18n      : i18n,
    router,
    template  : '<Layout/>',
    components: {Layout}
  })
}
