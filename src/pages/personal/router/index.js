import Router from 'vue-router'
import Vue from  'vue'
import password from '../components/password.vue'
import personalMessage from '../components/personalMessage.vue'
import receiveAddress from '../components/receiveAddress.vue'
import card from '../components/card.vue'
import email from '../components/email.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/password',
            name: password,
            component: password
        },
        {
            path: '/personalMessage',
            name: personalMessage,
            component: personalMessage
        },
        {
            path: '/receiveAddress',
            name: receiveAddress,
            component: receiveAddress
        },
        {
            path: '/card',
            name: card,
            component: card
        },
        {
            path: '/email',
            name: email,
            component: email
        }
    ]
})
