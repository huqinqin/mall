<template>
    <el-container class="main">
        <el-header height="auto" @click="handleSelect">
            <lts-header @showLogin="login"></lts-header>
        </el-header>
        <el-container class="lts-main">
            <el-main class="s-span-page">
                <lts-content @showLogin="login"/>
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
    import mixinAuth from '@/library/Auth.js'
    export default {
        name: 'Layout',
        props: [
            'isWhite'
        ],
        data() {
            return {
                homePage: config.homePage,
            }
        },
        methods: {
            handleSelect() {
                this.checkAuth();
            },
            logout(){
                userService.logout().then((resp)=>{
                    session.logout();
                },(err)=>{
                    this.$ltsMessage.show({type: "error", message: err.error_message});
                })
            },
            login(data){
                this.loginVisible = true
            },
            showPassword(){
                console.log(this.$refs.eye)
            }
        },
        watch: {
            open: function () {
                consoel.log(this.open)
            }
        },
        created(){
          config.isWhite ? $("html").attr('class','white') : $("html").attr('class','gray');
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
        }
    }
</script>
<style lang="less">
    @import "//at.alicdn.com/t/font_516449_35f23m4ei4hlrf6r.css";
    html, body {
        margin: 0;
        padding: 0;
        height:100%;
        min-width: 1200px;
    }
    .white{
        background-color: white;
    }
    .gray{
        background-color: #eeeeee;
    }
    a{
        color:inherit;
        text-decoration: none;
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
        padding: 0;
    }
    .lts-main {
        .el-main{
          padding: 0;
          min-height:800px;
          background-color: white;
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
