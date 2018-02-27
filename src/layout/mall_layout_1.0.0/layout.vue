<template>
    <el-container class="main">
        <el-header height="auto">
            <lts-header></lts-header>
        </el-header>
        <el-container class="lts-main">
            <lts-header-content></lts-header-content>
            <el-container class="s-span-page">
                <lts-menu class="lts-menu"/>
                <el-container>
                    <el-main class="s-span-page">
                        <lts-content class="lts-content"/>
                    </el-main>
                </el-container>
            </el-container>
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
    import categoryService from '@/services/CategoryService.js'
    import $ from 'jquery'
    import {ltsTable,ltsSearchForm} from 'ui'
    import mixinAuth from '@/library/Auth.js'
    export default {
        name: 'Layout',
        props: [
        ],
        data() {
            return {
            }
        },
        methods: {

        },
        created(){
          config.isWhite ? $("html").attr('class','gray'): $("html").attr('class','white') ;
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
    }
</script>
<style lang="less">
    @import "//at.alicdn.com/t/font_516449_35f23m4ei4hlrf6r.css";
    html, body {
        margin: 0;
        padding: 0;
        height:100%;
        min-width: 1200px;
        .el-popper{
            .el-cascader-menu{
                height: auto;

            }
        }

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
        padding: 0 !important;
    }
    .lts-main {
        .el-main{
          padding: 0;
          background-color: white;
            display: flex;
            .lts-menu{
            }
            .lts-content{
                flex-grow: 1;
            }

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
