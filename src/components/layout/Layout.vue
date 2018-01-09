<template>
    <div id="container">
        <!-- header  -->

        <div id="search" class="margin">
	        <div class="search-top">
                <ul class="ul-left">
                    <li>
                        <i class="iconfont icon-fuwu"></i>
                        <span>IP</span>
                        <span>SOLUTION</span>
                    </li>
                    <li>
                        <i class="iconfont icon-fuwu"></i>
                        <span>IP</span>
                        <span>SOLUTION</span>
                    </li>
                    <li>
                        <i class="iconfont icon-fuwu"></i>
                        <span>IP</span>
                        <span>SOLUTION</span>
                    </li>
                    <li>
                        <i class="iconfont icon-fuwu"></i>
                        <span>IP</span>
                        <span>SOLUTION</span>
                    </li>
                </ul>
                <div class="search-center">
                    <img src="../../assets/inder_img/logo.png">
                </div>
                <ul class="ul-right">
                    <li>
                        <i class="iconfont icon-fuwu"></i>
                        <span>IP</span>
                        <span>SOLUTION</span>
                    </li>
                    <li>
                        <i class="iconfont icon-fuwu"></i>
                        <span>IP</span>
                        <span>SOLUTION</span>
                    </li>
                    <li>
                        <i class="iconfont icon-fuwu"></i>
                        <span>IP</span>
                        <span>SOLUTION</span>
                    </li>
                    <li>
                        <i class="iconfont icon-fuwu"></i>
                        <span>IP</span>
                        <span>SOLUTION</span>
                    </li>
                </ul>
            </div>

	    <div class="search-bottom">
		<div class="bottom-all">
			全部分类
			<span>V</span>
		</div>

		<div class="bottom-search">
			<input type="text" name="" placeholder="输入你想要搜索的商品名称或编码">
			<i class="iconfont icon-sousuo2"></i>
		</div>
	</div>


</div>

        <template>
            <div class="block margin">
                <el-carousel height="500px">
                <el-carousel-item v-for="item in 3" :key="item">
                    <h3>{{ item }}</h3>
                </el-carousel-item>
                </el-carousel>
            </div>
        </template>

        <!-- welcome -->
        <div id="welcome" class="margin">
            <div class="welcome">
                <h2>WELCOME TO LTS</h2>
                <span>Video Solutions For Security Professionals</span>
                <!-- <span class="tm">TM</span> -->
            </div>
            <div class="button">
                <router-link to="">
                    <el-button style="background-color: #ededed;box-shadow: 0px 2px 10px 0px
		#f6f6f6;margin-right: 12px;font-weight:bold;color: #f13a40;">立即登录</el-button>
                </router-link>
                <router-link to="">
                    <el-button style="background-color: #ffffff;border:solid 1px rgba(0, 0, 0, 0.5);color: #000000;">免费注册</el-button>
                </router-link>
            </div>
        </div>

        <div class="publicity margin">
            <div class="publicity-left">
            </div>
            <div class="publicity-right ">

            </div>
        </div>
        <!-- footer -->
        <div id="footer">
            <div class="footer">
                <ul class="footer-ul">
                    <li></li>
                </ul>
            </div>
        </div>
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
#search{height:176px;}
#search .search-top{width: 100%;height:95px;}
#search .search-top .ul-left{width:645px;height: 95px;float: left;}
#search .search-top .ul-left li{float: left;width:60px;height:95px;margin-right:133px;}
#search .search-top .ul-left li:nth-child(4){margin-right:0;}
#search .search-top .ul-right{width:645px;height:95px;float: right;}
#search .search-top .ul-right li{float:left;width:60px;height:95px;margin-right:133px;}
#search .search-top .ul-right li:nth-child(4){margin-right:0;}
#search .search-top ul li .iconfont{display:block;width:40px;height:40px;font-size: 40px;margin-top:10px;color:#4c4c4c;margin-bottom: 7px;margin-left:5px;}
#search .search-top ul li span{display: block;width: 50px;text-align: center;color:rgba(0,0,0,0.7);font-size: 11px}

#search .search-center{width:210px;float: left;height:65px;text-align: center;padding-top:35px;}
#search .search-center img{width:102px;height: 27px;}


#search .search-bottom{width: 1480px;height: 30px;border:1px solid #b2b2b2;margin:0 auto;margin-top:24px;}
#search .search-bottom .bottom-all{width: 100px;padding-left:20px;line-height: 30px;font-size: 14px;height: 30px;border-right:1px solid #b2b2b2;float: left}
#search .search-bottom .bottom-all span{font-size: 12px;padding-left:5px;}
#search .search-bottom .bottom-search{float:right;width:1358px;}
#search .search-bottom .bottom-search input{width:1334px;height: 30px;border: 0;padding-left: 24px;color:#999;}
#search .search-bottom .bottom-search i{position: absolute;right:10px;top:8px;}
/* banner */
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }

/* welcome */
#welcome{
    height: 60px;
}
.welcome{
    float: left;
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
    width:125px;
    font:10px/12px "MicrosoftYaHei";
    color: rgba(0, 0, 0, 0.7);
}
.button{
    float: right;
}
el-button{
    margin-top: 12px;
    width: 120px;
    height: 36px;
    border-radius: 4px;
    font-size:16px;
    font-family: MicrosoftYaHei;
}
.publicity{
    padding-top: 12px;
}
.publicity-left{
    width: 895px;
    height: 350px;
}
/* .welcome .tm{
    font:6px/12px "MicrosoftYaHei";
    margin-top: -5px;
    color: #000;
} */
/* .footer{
    height: 300px;
    background-color: #f13a40;
} */
</style>
