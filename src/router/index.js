import Vue from 'vue'
import Router from 'vue-router'
import Layout from "@/components/layout/layout";
import layoutBase from "@/components/layout/layoutBase";
import Detail from "@/components/detail/detail";
import Footer from "@/components/footer/footer";

Vue.use(Router)

export default new Router({
    routes: [{
            path: "/layout",
            component: Layout
        },
        {
            path: "/layoutbase",
            component: layoutBase
        },
        {
            path: "/detail",
            component: Detail
        },
        {
            path: "/footer",
            component: Footer
        }
    ]
})