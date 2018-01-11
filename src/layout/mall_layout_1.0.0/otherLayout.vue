<template>
    <el-container class="main">
        <el-header height="30px">
            <lts-header class="s-span-page"></lts-header>
        </el-header>
        <el-container class="lts-main">
            <el-main class="s-span-page">
                <lts-content/>
            </el-main>
            <el-footer height="300px">
                <lts-footer></lts-footer>
            </el-footer>
        </el-container>
    </el-container>
</template>
<script>
    import {store} from 'ltsutil'
    import config from 'config'
    import userService from '@/services/UserService'
    import session from '@/library/Session'
    import $ from 'jquery'
    import {ltsTable,ltsSearchForm} from 'ui'
    export default {
        name: 'OtherLayout',
        props: {},
        data() {
            return {
                homePage: config.homePage,
                account: '',
                test: "LTS底部标识",
                isUniqueOpened: true,
                unread: 100
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            logout(){
                userService.logout().then((resp)=>{
                    session.logout();
                },(err)=>{
                    this.$ltsMessage.show({type: "error", message: err.error_message});
                })
            }
        },
        watch: {
            open: function () {
                consoel.log(this.open)
            }
        },
        created(){
            $(document).ready(function(){
                resize();
            })
            $(window).resize(function(){
                resize();
            });
            function resize(){
                var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                // $('body').attr('class','fullscreen');
                if(width <= 1500){
                    $('body').attr('class','b1200');
                }else{
                    $('body').attr('class','b1500');
                }
            }
        },
        mounted() {
//            session.checkLogin();
            this.account = store.getItem('account');
        }
    }
</script>
<style lang="less">

    html, body {
        margin: 0;
        padding: 0;
        height:100%;
        background-color: #fff;
        min-width: 1200px;
    }
    body,
    ol,
    ul,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    th,
    td,
    dl,
    dd,
    form,
    fieldset,
    legend,
    input,
    textarea,
    select,
    td,
    figure {
        margin: 0;
        padding: 0;
    }
    li {
        list-style: none;
    }
    .s-span-page{
        margin: auto;
        width: 1200px;
    }
    .b1500{
        .s-span-page{
            width:1500px;
        }
    }
    .fullscreen{
        .s-span-page{
            width:100%;
        }
    }
    .el-header {
        line-height: 30px;
        background-color: #181818;
        padding: 0;
    }
    .lts-main {
        .el-main{
            padding: 0;
            min-height:800px;
            background-color: white;
            overflow: hidden;
        }
        .el-footer {
            margin-top: 48px;
            font-size: 12px;
            line-height: 30px;
            text-align: center;
            background-color: white;
            color: #999;
        }
    }
</style>
