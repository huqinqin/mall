<template>
    <el-aside width="180px" class="mall-menu">
        <ul class="user">
            <li>用户中心</li>
            <li v-for="item in user" @click="selectChange" :class="{ active: selected == item.title }"><a :href=item.href>{{item.title}}</a></li>
        </ul>
        <ul>
            <li>我的资金</li>
            <li v-for="item in finance" @click="selectChange" :class="{ active: selected == item.title }"><a :href=item.href>{{item.title}}</a></li>
        </ul>
        <ul class="settings">
            <li>账户设置</li>
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
                    {href:'/someinfo',title:'个人首页'},
                    {href:'/order',title:'我的订单'},
                    {href:'/cart',title:'购物车'},
                    {href:'javascript:void(0)',title:'解决方案'},
                    {href:'/reverse',title:'RMA'},
                ],
                finance:[
                    {href:'/finance',title:'我的余额'},
                    {href:'/repayMent',title:'待还款列表'},
                ],
                settings:[
                    {href:'javascript:void(0)',title:'个人信息'},
                    {href:'javascript:void(0)',title:'邮箱修改'},
                    {href:'/personal#/card',title:'分销商资格认证'},
                    {href:'/personal#/password',title:'密码设置'},
                    {href:'/personal#/receiveAddress',title:'收货地址'},
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
            this.selected = store.getItem("selected") ? store.getItem("selected") : '个人首页'
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
