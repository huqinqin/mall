<template>
    <div class="mall-header">
      <ul class="header-box">
        <li class="sign">
          <a href="" class="login">立即登录</a>
          <a href="" class="register">免费注册</a>
        </li>
        <li class="">
          <a href="" class="news">快报</a>
          <a href="" class="top-menu">我的订单</a>
          <a href="" class="top-menu">收藏夹</a>
          <a href="" class="top-menu"><i class="iconfont icon-shouji"></i>手机下单更优惠</a>
          <a href="javascript:void(0)">咨询热线：0100-5689 2018 634</a>
        </li>
      </ul>
    </div>
</template>
<script>
    import {store} from 'ltsutil'
    export default {
        name : "lts-header",
        data(){
          return{

          }
        },
        methods:{

        },
        created(){

        },
    }
</script>
<style lang="less" scoped>
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
  .mall-header{
    height:30px;
    .header-box{
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: white;
      height:100%;
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
          margin-right: 26px;
        }
        .top-menu{
          padding-right: 12px;
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
