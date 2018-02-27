<template>
    <div class="mall-menu">
        <ul class="user">
            <li>用户中心</li>
            <li v-for="item in user" @click="selectUser" :class="{ active: selectedUser == item.title }"><a :href=item.href>{{item.title}}</a></li>
        </ul>
            <ul class="settings">
            <li>账户设置</li>
            <li v-for="item in settings" @click="selectSetting" :class="{ active: selectedSetting == item.title }"><a :href=item.href>{{item.title}}</a></li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "lts-menu",
        data(){
            return{
                user:[
                    {href:'/order',title:'我的订单'},
                    {href:'/cart',title:'购物车'},
                    {href:'',title:'我的资金'},
                    {href:'',title:'我的资金'},
                    {href:'',title:'解决方案'},
                    {href:'',title:'RMA'},
                    {href:'',title:'消息中心'},
                ],
                settings:[
                    {href:'',title:'个人信息'},
                    {href:'',title:'分销商资格认证'},
                    {href:'',title:'密码设置'},
                    {href:'',title:'收货地址'},
                ],
                selectedUser:'我的订单',
                selectedSetting:''
            }
        },
        methods:{
            selectUser(value){
                this.selectedUser = value.currentTarget.innerText
                debugger
            },
            selectSetting(value){
                this.selectedSetting = value.currentTarget.innerText
            }
        }
    }
</script>

<style lang="less">
    .mall-menu{
        margin-top: 30px;
        margin-right: 24px;
        width:180px;
        ul{
            border:1px solid #ddd;
            li a{
                display: block;
                width:100%;
                line-height: 38px;
                text-align: center;
            }

            li:first-child{
                text-align: center;
                background: #4E747C;
                line-height: 40px;
                font-size: 16px;
            }
        }
        ul.user{
            border-bottom:none;
        }
    }
</style>
