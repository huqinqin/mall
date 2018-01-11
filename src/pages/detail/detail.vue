<template>
  <div>
    <div class="detail">
      <!-- left -->
        <div class="detail_left">
          <div class="breadcrumb">
          <a href="">首页</a>
          <span>></span>
          <a href="">商品列表</a>
          <span>></span>
          <a href="">商品详情</a>
          <span>></span> 
      </div>
      <div class="prc_info" v-for="prc in prc_info" :key="prc.index">
          <div class="big">            
            <a href="">
              <img :src="prc.link" alt="">
            </a>
          </div>
          <div class="small">
            <a href="">
              <img :src="prc.link" alt="">
            </a>
            <a href="">
              <img :src="prc.link" alt="">
            </a>
            <a href="">
              <img :src="prc.link" alt="">
            </a>
          </div>
         
      </div>

      <!-- 商品编号 -->
      <div class="num"  v-for="prc in prc_info" :key="prc.index">
        <p>商品编号：<span>{{prc.num}}</span></p>
      </div>
    </div> 

    <!-- center -->
    <div class="_detali_center" v-for="center in detail_center" :key="center.index">
        <!-- <p><span>价格：</span><span>$</span><span>{{center.p1}}</span></p>
                
        <p><span>惊爆价：</span><span>{{center.p2}}</span><a href="">立即登录</a><a href="">免费注册</a></p> -->
    </div>

    <!-- right -->
    <div class="_detali_right">

    </div>

    </div>
  </div>
</template>

<script>
  export default {
     data(){
      return{
        prc_info:[
          {
            href:"",
            link:"static/image/shexiangtou1.png",
            alt:"",
            num:"111111"
          }
        ],
        detail_center:[
          {
            p1:"1988.00",
            p2:"888800"
          }
        ]
      }    
    }
  }
</script>

<style lang="less">
// 公共样式
body, ol, ul, h1, h2, h3, h4, h5, h6, p, th, td, dl, dd, form, fieldset, legend, input, textarea, select, td, figure {
  margin: 0;
  padding: 0; }

body {
  font: 12px  "宋体";
  word-wrap: break-word; }

html {
  font-family: "Microsoft Yahei"; }

a, u, s, del {
  color: #666;
  text-decoration: none; }

a:hover {
  text-decoration: underline; }

i, em, b {
  font-style: normal;
  font-weight: 100; }

li {
  list-style: none; }

img {
  vertical-align: middle; }

fieldset, a img, .bor0 {
  border: 0; }

table {
  border-collapse: collapse; }

/*合并表格边框*/
.ind2 {
  text-indent: 2em; }

.cu {
  cursor: pointer; }

/*垂直对齐属性*/
.valign:after {
  content: "";
  display: inline-block;
  vertical-align: middle;
  width: 0px;
  height: 100%; }

/*文本溢出出现省略号*/
.over {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; }

/*clear清除浮动和防止margin-top向上传递*/
.clear {
  zoom: 1;
  /*只有ie能识别*/ }

.clear:before {
  content: "";
  display: table; }

.clear:after {
  content: "";
  display: block;
  clear: both; }

.detali{
  .detali_left{
    float: left;
  }
  
}
.breadcrumb{
  color: #646464;
  font: 14px/40px "MicrosoftYaHei";
  height: 40px;
  padding-bottom: 8px;
  position: relative;
  z-index: 10000;
  a{
    color: #646464;
    float: left;
  }
  span{
    color: #646464;
    margin: 1px 6px 0;
    float: left;
  }
}
.prc_info{
  // width: 400px;
  // height: 400px;
  // background: #646464;
  .big{
      box-sizing: border-box;
      border-left: 1px solid red;
      width: 400px;
      height: 400px;
      display: flex;
      justify-content: center;
      align-items: center;
  }
  .small{
    display: flex;

      a{
        display: inline;
        width: 70px;
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
          width: 38px;
          height: 40px;
        }
      }
  }


}
.num{
  font:14px/46px "MicrosoftYaHei";
  color: #000;
}
._detali_center{
  float: left;
}
._detali_right{
  float: right;
}
</style>
