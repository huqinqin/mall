<template>
    <el-aside width="180px" class="mall-menu">
        <ul class="user">
            <li>{{$t("common.ltsMenu.commLtsUserConter")}}</li>
            <li v-for="item in user" @click="selectChange" :class="{ active: selected == item.title }"><a :href=item.href>{{item.title}}</a></li>
        </ul>
        <ul>
            <li>{{$t("common.ltsMenu.commLtsMyMoney")}}</li>
            <li v-for="item in finance" @click="selectChange" :class="{ active: selected == item.title }"><a :href=item.href>{{item.title}}</a></li>
        </ul>
        <ul class="settings">
            <li>{{$t("common.ltsMenu.commLtsAccountSet")}}</li>
            <li v-for="item in settings" @click="selectChange" :class="{ active: selected == item.title }"><a :href=item.href>{{item.title}}</a></li>
        </ul>
    </el-aside>
</template>

<script>
    import {store} from 'ltsutil'
    export default {
        name: "lts-menu",
        data(){
            return{
                user:[
                    {href:'/someinfo',title: this.$t("common.ltsMenu.commLtsPersonlPage")},
                    {href:'/order',title:this.$t("common.ltsMenu.commLtsMyOrder")},
                    {href:'/cart',title:this.$t("common.ltsMenu.commLtsCart")},
                    {href:'javascript:void(0)',title:this.$t("common.ltsMenu.commLtsResolve")},
                    {href:'/reverse',title:'RMA'},
                ],
                finance:[
                    {href:'/finance',title:this.$t("common.ltsMenu.commLtsMyBalance")},
                    {href:'/repayMent',title:this.$t("common.ltsMenu.commLtsWaitting")},
                ],
                settings:[
                    {href:'/personal#/personalMessage',title:this.$t("common.ltsMenu.commLtsPersonInfo")},
                    {href:'/personal#/email',title:this.$t("common.ltsMenu.commLtsEmailAlert")},
                    {href:'/personal#/card',title:this.$t("common.ltsMenu.commLtsAnth")},
                    {href:'/personal#/password',title:this.$t("common.ltsMenu.commLtsPwdSet")},
                    {href:'/personal#/receiveAddress',title:this.$t("common.ltsMenu.commLtsAddress")},
                ],
                selected:'',
            }
        },
        methods:{
            selectChange(value){
                store.setItem('selected', value.currentTarget.textContent);
            },
        },
        mounted(){
            this.selected = store.getItem("selected") ? store.getItem("selected") : this.$t("common.ltsMenu.commLtsPersonlPage")
        }
    }
</script>

<style lang="less">
    .mall-menu{
        margin-right: 24px;
        min-width:180px;
        ul{
            border:1px solid #ddd;
            li a{
                color:#737373;
                display: block;
                width:100%;
                line-height: 38px;
                text-align: center;
            }

            li:first-child{
                color:white;
                font-weight: bold;
                text-align: center;
                background: #4E747C;
                line-height: 40px;
                font-size: 16px;
            }
            li.active{
                color:#ff3b41;
                position: relative;
                a{
                    color:inherit;
                }
            }
            li.active::after{
                content:'';
                height: 0;
                width: 0;
                border-left:6px solid #ff3b41;
                border-top:5px solid transparent;;
                border-bottom:5px solid transparent;;
                position: absolute;
                right:6px;
                top:14px;
            }
        }
        ul.user{
            border-bottom:none;
        }
    }
</style>
