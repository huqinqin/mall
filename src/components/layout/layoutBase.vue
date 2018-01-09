<template>
    <div id="container">
        <!-- header  -->
        <div class="header">
            <ul class="margin">
                <li style="float:left">
                    <a href="" class="register">立即登录</a>
                    <a href="">免费注册</a>
                </li> 
                <li class="call" style="float: right">
                    <a href="" style="margin-right: 26px">快报</a>
                    <a href="">我的订单</a> 
                    <span>|</span>   
                    <a href="">收藏夹</a>
                    <span>|</span>
                    <i class="iconfont icon-shouji" style="font-size:10px;margin: 0 6px;"></i>
                    <a href="">手机下单更优惠</a>
                    <span style="margin:0 8px;">|</span>
                    <span>咨询热线：0100-5689 2018 634</span>
                </li>
            </ul>
        </div>
        <!-- nav -->
        <!-- <div id="nav">
            <div class="nav margin">
                <ul class="nav-left">
                    <li style="">
                        <i class="iconfont icon-monihua" style="font-size:40px;margin-right: 128px;"></i>
                        <p style="">IP</p>
                        <p>SOLUTION</p>
                    </li>
                    <li>
                        <i class="iconfont icon-monifenxi" style="font-size:34px;margin-right: 119px;"></i>
                        <p style="">HD-TVI</p>
                        <p>SOLUTION</p>
                    </li>
                    <li>
                        <i class="iconfont icon-jiejuefangan-zhongxiaoqiye" style="font-size:40px;margin-right: 110px;"></i>
                        <p style="">PUBLIC PLACE</p>
                        <p>SOLUTION</p>
                    </li>
                    <li>
                        <i class="iconfont icon-jiatingbaoxiu" style="font-size: 42px;margin-right: 449px;"></i>
                        <p style="">RESILENTIAL</p>
                        <p>SOLUTION</p>
                    </li>
                    <li>
                        <img src="../../assets/inder_img/logo.png" alt="" style="width:102px;height: 27px;">
                    </li>
                </ul>

                <div class="search">
                    <input type="text" value="全部分类" placeholder="输入您想要搜索的商品名称或编码" class="all">
                </div>
            </div>
        </div> -->
        <!-- banner -->
        <!-- <div class="banner">
             <img src="../../assets/inder_img/BANNERTU.png" alt="" class="banner-img">
        </div> -->

        <!-- welcome -->
        <!-- <div id="welcome" class="margin">
            <div class="welcome">
                <h2>WELCOME TO LTS</h2>
                <span>Video Solutions For Security Professionals</span>
            </div>
        </div> -->
        <!-- footer --> 
        <!-- <div id="footer">
            <div class="footer">
                <ul class="footer-ul">
                    <li></li>
                </ul>
            </div>
        </div> -->
    </div>
</template>

<script>
export default {

  components:{},
  data () {
    return {

    }
  }
}
</script>

<style src="@/assets/iconfont/iconfont.css"></style>

<style lang="css">
@charset "utf-8";
/* CSS Document */

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

body {
    word-wrap: break-word;  
    background-color: #f6f6f6;
}

a,
u,
s,
del {
    color: #666;
    text-decoration: none;
}

i,
em,
b {
    font-style: normal;
}
li {
    list-style: none;
}

img {
    vertical-align: middle;
}

fieldset,
a img,
.bor0 {
    border: 0;
}

table {
    border-collapse: collapse;
}


/*合并表格边框*/

.ind2 {
    text-indent: 2em;
}

.cu {
    cursor: pointer;
}


/*垂直对齐属性*/

.valign:after {
    content: "";
    display: inline-block;
    vertical-align: middle;
    width: 0px;
    height: 100%;
}


/*文本溢出出现省略号*/

.over {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}


/*clear清除浮动和防止margin-top向上传递*/

.clear {
    zoom: 1;
    /*只有ie能识别*/
}

.clear:before {
    content: "";
    display: table;
}

.clear:after {
    content: "";
    display: block;
    clear: both;
}



.margin{width:1500px;margin:0 auto;}
/* layout样式 */
/* header样式 */
.header{
    height: 30px;
	background-color: rgba(0, 0, 0, 0.9);
    opacity: 0.9;
}
.header li{
    font:12px/30px "MicrosoftYaHei-Bold";
    color: #ffffff;
}
.header li a{color: #ffffff}
.header li .register{
    color:#f13a40;
    margin-right: 18px;
}

.header .call span{
    margin: 0 12px;
}

/* nav */
/* #nav{
	height: 173px;
	background-color: #ffffff;
}
.nav .nav-left{
    float: left;
}
.nav .nav-left li{
    display: inline-block;
    margin-top: 25px;
}
.nav .nav-left li i{
    color: #4c4c4c;
} */

/* banner */
/* .banner .banner-img{
    width: 1500px;
    height: 500px;
    margin-left: auto;
    margin-right: auto;
    display: block;
    padding:12px 0;
} */

/* welcome */
/* #welcome{
    height: 60px;
}
.welcome h2{
    font:24px/60px "MicrosoftYaHei-Bold";
    font-weight: bold;
    margin: 0 24px;
    color: rgba(0, 0, 0, 0.7);
    letter-spacing: 1px;
    display: inline;
}
.welcome span{
    display:inline-block;
    width:120px;
    font:10px/12px "MicrosoftYaHei";
} */

.footer{
    height: 300px;
    background-color: #f13a40;
}
</style>
