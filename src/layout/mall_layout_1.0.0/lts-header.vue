<template>
    <div class="mall-header">
        <div class="header-box">
          <ul class="s-span-page">
            <li class="sign">
              <a href="" class="login">立即登录</a>
              <a href="" class="register">免费注册</a>
            </li>
            <li class="">
              <a href="" class="news">快报</a>
              <a href="" class="top-menu">我的订单</a>
              <a href="" class="top-menu">收藏夹</a>
              <a href="" ><i class="iconfont icon-shouji"></i>手机下单更优惠</a>
            </li>
          </ul>
        </div>
        <div class="product">
              <div class="menu-list s-span-page">
                <ul>
                    <li v-for="value in menuList">
                        <a :href="value.link" v-if="value.type == 'logo'" class="header-logo" :style="{backgroundImage : 'url('+value.icon+')'}"></a>
                        <a :href="value.link" v-else>
                            <span class="iconfont" :class="value.icon"></span>
                            <p>{{value.first}}</p>
                            <p>{{value.last}}</p>
                        </a>
                    </li>
                </ul>
              </div>
              <div class="s-span-page search-bar">
                  <el-input placeholder="请输入内容" v-model="input5" class="input-with-select ">
                      <el-select v-model="select" slot="prepend" placeholder="请选择">
                          <el-option label="餐厅名" value="1"></el-option>
                          <el-option label="订单号" value="2"></el-option>
                          <el-option label="用户电话" value="3"></el-option>
                      </el-select>
                      <el-button slot="append" icon="el-icon-search"></el-button>
                  </el-input>
              </div>

        </div>
    </div>
</template>
<script>
    import {store} from 'ltsutil'
    export default {
        name : "lts-header",
        data(){
          return{
             menuList : [
                 {
                     name : 'ip solution',
                     icon : 'icon-IPjiejuefangan',
                     first : 'IP',
                     last : 'SOLUTION',
                     link : '/detail#/?id=123'
                 },
                 {
                     name : 'hdtvi solution',
                     icon : 'icon-jiankong',
                     first : 'HD-TVI',
                     last : 'SOLUTION',
                     link : 'javascript:void(0)'
                 },
                 {
                     name : 'shopby scenario',
                     icon : 'icon-qiyejiejuefangan',
                     first : 'SHOP BY',
                     last : 'SCENARIO',
                     link : 'javascript:void(0)'
                 },
                 {
                     name : 'surveiliance system vulider',
                     icon : 'icon-jiatingjiejuefangan',
                     first : 'SURVEILANCE',
                     last : 'SYSTEM BULIDER',
                     link : 'javascript:void(0)'
                 },
                 {
                     name : 'logo',
                     icon :  require('../../assets/img/header-logo.png'),
                     type : 'logo',
                     link : '/index'
                 },
                 {
                     name : 'call experts',
                     icon : 'icon-lianxixiaoshoukefu',
                     first : 'CALL',
                     last : 'EXPERTS',
                     link : 'javascript:void(0)'
                 },
                 {
                    name : 'support center',
                    icon : 'icon-zhichi',
                    first : 'SUPPORT',
                    last : 'CENTER',
                    link : 'javascript:void(0)'
                 },
                 {
                    name : 'my favorite',
                    icon : 'icon-wodezuiai',
                    first : 'MY',
                    last : 'FAVOURITE',
                    link : 'javascript:void(0)'
                 },
                 {
                    name : 'suopping cart',
                    icon : 'icon-gouwuche2',
                    first : 'SUOPPING',
                    last : 'CART',
                    link : 'javascript:void(0)'
                 }
                ],
             input5  : '',
             select : '',
          }
        },
        methods:{

        },
        created(){

        },
    }
</script>
<style lang="less">
    .el-header{
        padding: 0;
    }
    .el-select .el-input {
        width: 130px;
    }
    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }
    .mall-header{
        .product{
            background-color: white;
            .search-bar{
                padding-bottom: 24px;
            }
            .header-logo{
                width: 300px;
                height:74px;
                background-position: center;
                background-size: cover;
                display: flex;
            }
            .menu-list{
                padding: 24px 0;
                ul{
                    display: flex;
                    height: 100%;
                    align-items: center;
                    li{
                        flex:1;
                        text-align: center;
                        a{
                            text-decoration: none;
                            .iconfont{
                                font-size: 42px;
                                color: #4c4c4c;
                            }
                            p{
                                text-align: center;
                                color: #737373;
                                font-size: 12px;
                            }
                        }
                    }
                }
            }
        }
        .header-box{
      color: white;
      height:30px;
      line-height: 30px;
      background-color: #181818;
      padding: 0;
      width: 100%;
      ul{
          display: flex;
          align-items: center;
          justify-content: space-between;
      }
      li{
        align-self: center;
        a{
          color: white;
          font-size: 12px;
          text-decoration: none;
          position: relative;
        }
        .login{
          color:#f13a40;
          margin-right: 18px;
          font-weight:bold;
        }
        .news{
          margin-right: 14px;
        }
        .top-menu{
          padding-right: 12px;
          margin-left: 12px;
        }
        .top-menu:before{
          content: '';
          height:12px;
          width:1px;
          background-color: white;
          position: absolute;
          right:0;
          top:3px;
        }
        .icon-shouji{
          font-size: 12px;
          margin: 0 6px 0 3px;
        }
      }
    }
    }

</style>
