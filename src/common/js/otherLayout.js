import Vue from 'vue'
import ElementUI from 'element-ui'
import VueI18n from 'vue-i18n'
import VueResource from 'vue-resource'
import Router from 'vue-router'
import {dateUtils} from 'ltsutil'

import OtherLayout from '@/layout/mall_layout_1.0.0/otherLayout'
import 'element-ui/lib/theme-chalk/index.css'
import Loading from '../components/lts-loading'
import Message from '../components/lts-message'
import MessageBox from '../components/lts-messageBox'
import ltsHeader from '@/layout/mall_Layout_1.0.0/lts-header.vue'
import ltsFooter from '@/layout/mall_Layout_1.0.0/lts-footer.vue'

Vue.use(ElementUI)
Vue.use(VueI18n)

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
Vue.filter('timestamp2str', function (timestamp) {
    if (!timestamp) return ''
    return dateUtils.format(new Date(timestamp))
})
Vue.filter('money2str', function (money) {
    if (!money) return ''
    return (money / 100).toFixed(2)
})
export default function (App, router = new Router()) {
    OtherLayout.components = {'lts-content': App,'lts-header': ltsHeader,'lts-footer':ltsFooter}
    new Vue({
        el        : '#app',
        i18n      : i18n,
        Loading   : Loading,
        Message   : Message,
        router,
        template  : '<OtherLayout/>',
        components: {OtherLayout}
    })
}