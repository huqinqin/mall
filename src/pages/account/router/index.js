import Router from 'vue-router'
import Signup from '../components/signup.vue'
import Reset from '../components/reset.vue'
import Vue from  'vue'
import SignupFinish from '../components/signupFinish.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/signup',
            component: Signup
        },
        {
            path: '/reset',
            component: Reset
        },
        {
            path: '/signupFinish',
            component: SignupFinish
        },
    ]
})
