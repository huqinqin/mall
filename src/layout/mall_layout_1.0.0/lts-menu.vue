<template>
    <el-aside width="180px" class="mall-menu">
        <ul class="user">
            <li>{{$t("common.ltsMenu.commLtsUserConter")}}</li>
            <li v-for="item in user" @click="selectChange" :class="{ active: selected == item.title }"><a
                :href=item.href>{{item.title}}</a>
            </li>
        </ul>
        <ul>
            <li>{{$t("common.ltsMenu.commLtsMyMoney")}}</li>
            <li v-for="item in finance" @click="selectChange" :class="{ active: selected == item.title }" v-show="item.show"><a
                :href=item.href>{{item.title}}</a>
            </li>
        </ul>
        <ul class="settings">
            <li>{{$t("common.ltsMenu.commLtsAccountSet")}}</li>
            <li v-for="item in settings" @click="selectChange" :class="{ active: selected == item.title }">
                <a :href=item.href>{{item.title}}</a>
            </li>
        </ul>
    </el-aside>
</template>

<script>
    import {store} from 'ltsutil'
    import checkService from '@/services/CheckService'

    export default {
        name: "lts-menu",
        data() {
            return {
                user: [
                    {href: '/someinfo?t=' + new Date().getTime() +'#/', title: this.$t("common.ltsMenu.commLtsPersonlPage")},
                    {href: '/order?t=' + new Date().getTime() +'#/', title: this.$t("common.ltsMenu.commLtsMyOrder")},
                    {href: '/cart?t=' + new Date().getTime() +'#/', title: this.$t("common.ltsMenu.commLtsCart")},
                    // {href: 'javascript:void(0)', title: this.$t("common.ltsMenu.commLtsResolve")},
                    {href: '/reverse?t=' + new Date().getTime() +'#/', title: 'RMA'},
                ],
                finance: [
                    {href: '/someinfo?t=' + new Date().getTime() + '#/coupon', title: 'Coupon',show:true},
                    {href: '/finance?t=' + new Date().getTime() +'#/', title: this.$t("common.ltsMenu.commLtsMyBalance"),show:true},
                    {href: '/repayMent?t=' + new Date().getTime() +'#/', title: this.$t("common.ltsMenu.commLtsWaitting"),show:true},
                ],
                settings: [
                    {href: '/personal?t=' + new Date().getTime() + '#/personalMessage', title: this.$t("common.ltsMenu.commLtsPersonInfo")},
                    {href: '/personal?t=' + new Date().getTime() + '#/email', title: this.$t("common.ltsMenu.commLtsEmailAlert")},
                    {href: '/personal?t=' + new Date().getTime() + '#/card', title: this.$t("common.ltsMenu.commLtsAnth")},
                    {href: '/personal?t=' + new Date().getTime() + '#/password', title: this.$t("common.ltsMenu.commLtsPwdSet")},
                    {href: '/personal?t=' + new Date().getTime() + '#/receiveAddress', title: this.$t("common.ltsMenu.commLtsAddress")},
                ],
                selected: '',
            }
        },
        methods: {
            selectChange(value) {
                store.setItem('selected', value.currentTarget.textContent);
                this.selected = value.currentTarget.textContent;
            }
        },
        mounted() {
            this.selected = store.getItem("selected") ? store.getItem("selected") : this.$t("common.ltsMenu.commLtsPersonlPage")
            this.finance[2].show = store.getItem('hasCreditTerm') ? true : false
        }
    }
</script>

<style lang="less">
    .mall-menu {
        margin-right: 24px;
        min-width: 180px;
        margin-top: 12px;
        ul {
            border: 1px solid #ddd;
            li a {
                color: #737373;
                display: block;
                width: 100%;
                line-height: 38px;
                text-align: center;
            }

            li:first-child {
                color: white;
                font-weight: bold;
                text-align: center;
                background: #1d4e74;
                line-height: 40px;
                font-size: 16px;
            }
            li.active {
                color: #737373;
                a {
                    color: inherit;
                }
                background:#eef6ff;
            }
        }
        ul:nth-child(1), ul:nth-child(2) {
            border-top: none;
            border-bottom: none;
        }
        ul:nth-child(3) {
            border-top: none;
        }
    }
</style>
