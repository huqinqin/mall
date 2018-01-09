<template>
  <div>
     <div class="nav">
        <ul class="left">
            <li>
                <i class="iconfont icon-monihua"></i>
                <p>IP</p>
                <p>SOLUTION </p>
            </li>
            <li>
                <i class="iconfont icon-monihua"></i>
                <p>IP</p>
                <p>SOLUTION </p>
            </li>
            <li>
                <i class="iconfont icon-monihua"></i>
                <p>IP</p>
                <p>SOLUTION </p>
            </li>
            <li>
                <i class="iconfont icon-monihua"></i>
                <p>IP</p>
                <p>SOLUTION </p>
            </li>
        </ul>
        <img src="../../assets/inder_img/logo.png" alt="">
        <ul class="right">
            <li>
                <i class="iconfont icon-monihua"></i>
                <p>IP</p>
                <p>SOLUTION </p>
            </li>
            <li>
                <i class="iconfont icon-monihua"></i>
                <p>IP</p>
                <p>SOLUTION </p>
            </li>
            <li>
                <i class="iconfont icon-monihua"></i>
                <p>IP</p>
                <p>SOLUTION </p>
            </li>
            <li>
                <i class="iconfont icon-monihua"></i>
                <p>IP</p>
                <p>SOLUTION </p>
            </li>
        </ul>
        <div class="search">

        </div>
     </div>

     <!-- banner -->
     <template>
        <div class="block">
          <el-carousel height="500px">
            <el-carousel-item v-for="item in list" :key="item">
              <h3>{{ item }}</h3>
              <img src=item alt="">
            </el-carousel-item>
          </el-carousel>
        </div>
    </template>
    <!-- publicity -->
    <div class="publicity">
        <div class="weblocme">
            <h3>WELCOME TO LTS</h3> 
        </div>
        <div class="login">
             <button class="register">立即登录</button>
             <button class="sign">免费注册</button>
        </div>
    </div>
    <!-- poster -->
    <div class="poster">
        <div class="one">
              <img src="../../assets/inder_img/guanggao1.png" alt="">
        </div>
        <div class="two">
              <img src="../../assets/inder_img/gaunggao2.png" alt="">
              <img src="../../assets/inder_img/guanggao3.png" alt="">
        </div>
    </div>
     <!-- main -->
    <div class="center">
        <div class="main">
              <div class="title">
                  <div class="left">
                      <i></i>
                      <span>摄像头</span>
                  </div>
                  <div class="right">
                      <span>更多</span>
                      <i>></i>
                  </div>
              </div>
               
              <ul class="import">
                  <li>
                      <img src="../../assets/inder_img/shexiangtou1.png" alt="">
                      <p class="line-one">海康威视</p>
                      <p class="line-two">200万4mm红外高清网络半球摄像机</p>
                      <p class="line-there">AAAAAAA</p>                 
                      <p class="line-four"></p>
                      <button>登录之后查看价格 </button>
                  </li>
                  <li>
                      <img src="../../assets/inder_img/shexiangtou1.png" alt="">
                      <p class="line-one">海康威视</p>
                      <p class="line-two">200万4mm红外高清网络半球摄像机</p>
                      <p class="line-there">AAAAAAA</p>
                  </li>
                  <li>
                      <img src="../../assets/inder_img/shexiangtou1.png" alt="">
                      <p class="line-one">海康威视</p>
                      <p class="line-two">200万4mm红外高清网络半球摄像机</p>
                      <p class="line-there">AAAAAAA</p>
                  </li>
                  <li>
                      <img src="../../assets/inder_img/shexiangtou1.png" alt="">
                      <p class="line-one">海康威视</p>
                      <p class="line-two">200万4mm红外高清网络半球摄像机</p>
                      <p class="line-there">AAAAAAA</p>
                  </li>
                  <li>
                      <img src="../../assets/inder_img/shexiangtou1.png" alt="">
                      <p class="line-one">海康威视</p>
                      <p class="line-two">200万4mm红外高清网络半球摄像机</p>
                      <p class="line-there">AAAAAAA</p>
                  </li>
                  <li>
                      <img src="../../assets/inder_img/shexiangtou1.png" alt="">
                      <p class="line-one">海康威视</p>
                      <p class="line-two">200万4mm红外高清网络半球摄像机</p>
                      <p class="line-there">AAAAAAA</p>
                  </li>
                  <li>
                      <img src="../../assets/inder_img/shexiangtou1.png" alt="">
                      <p class="line-one">海康威视</p>
                      <p class="line-two">200万4mm红外高清网络半球摄像机</p>
                      <p class="line-there">AAAAAAA</p>
                  </li>
                  <li>
                      <img src="../../assets/inder_img/shexiangtou1.png" alt="">
                      <p class="line-one">海康威视</p>
                      <p class="line-two">200万4mm红外高清网络半球摄像机</p>
                      <p class="line-there">AAAAAAA</p>
                  </li>
              </ul>

              <div class="title">
                  <div class="left">
                      <i></i>
                      <span>录像机</span>
                  </div>
                  <div class="right">
                      <span>更多</span>
                      <i>></i>
                  </div>
              </div>

              <ul class="import">
                  <li>
                      <img src="../../assets/inder_img/shexiangtou1.png" alt="">
                      <p class="line-one">海康威视</p>
                      <p class="line-two">200万4mm红外高清网络半球摄像机</p>
                      <p class="line-there">AAAAAAA</p>
                  </li>
                  <li>
                      <img src="../../assets/inder_img/shexiangtou1.png" alt="">
                      <p class="line-one">海康威视</p>
                      <p class="line-two">200万4mm红外高清网络半球摄像机</p>
                      <p class="line-there">AAAAAAA</p>
                  </li>
                  <li>
                      <img src="../../assets/inder_img/shexiangtou1.png" alt="">
                      <p class="line-one">海康威视</p>
                      <p class="line-two">200万4mm红外高清网络半球摄像机</p>
                      <p class="line-there">AAAAAAA</p>
                  </li>
                  <li>
                      <img src="../../assets/inder_img/shexiangtou1.png" alt="">
                      <p class="line-one">海康威视</p>
                      <p class="line-two">200万4mm红外高清网络半球摄像机</p>
                      <p class="line-there">AAAAAAA</p>
                  </li>
                  <li>
                      <img src="../../assets/inder_img/shexiangtou1.png" alt="">
                      <p class="line-one">海康威视</p>
                      <p class="line-two">200万4mm红外高清网络半球摄像机</p>
                      <p class="line-there">AAAAAAA</p>
                  </li>
                  <li>
                      <img src="../../assets/inder_img/shexiangtou1.png" alt="">
                      <p class="line-one">海康威视</p>
                      <p class="line-two">200万4mm红外高清网络半球摄像机</p>
                      <p class="line-there">AAAAAAA</p>
                  </li>
                  <li>
                      <img src="../../assets/inder_img/shexiangtou1.png" alt="">
                      <p class="line-one">海康威视</p>
                      <p class="line-two">200万4mm红外高清网络半球摄像机</p>
                      <p class="line-there">AAAAAAA</p>
                  </li>
                  <li>
                      <img src="../../assets/inder_img/shexiangtou1.png" alt="">
                      <p class="line-one">海康威视</p>
                      <p class="line-two">200万4mm红外高清网络半球摄像机</p>
                      <p class="line-there">AAAAAAA</p>
                  </li>
              </ul>

              <div class="title">
                  <div class="left">
                      <i></i>
                      <span>附件与配件</span>
                  </div>
                  <div class="right">
                      <span>更多</span>
                      <i>></i>
                  </div>
              </div>

              <ul class="import">
                  <li>
                      <img src="../../assets/inder_img/shexiangtou1.png" alt="">
                      <p class="line-one">海康威视</p>
                      <p class="line-two">200万4mm红外高清网络半球摄像机</p>
                      <p class="line-there">AAAAAAA</p>
                  </li>
                  <li>
                      <img src="../../assets/inder_img/shexiangtou1.png" alt="">
                      <p class="line-one">海康威视</p>
                      <p class="line-two">200万4mm红外高清网络半球摄像机</p>
                      <p class="line-there">AAAAAAA</p>
                  </li>
                  <li>
                      <img src="../../assets/inder_img/shexiangtou1.png" alt="">
                      <p class="line-one">海康威视</p>
                      <p class="line-two">200万4mm红外高清网络半球摄像机</p>
                      <p class="line-there">AAAAAAA</p>
                  </li>
                  <li>
                      <img src="../../assets/inder_img/shexiangtou1.png" alt="">
                      <p class="line-one">海康威视</p>
                      <p class="line-two">200万4mm红外高清网络半球摄像机</p>
                      <p class="line-there">AAAAAAA</p>
                  </li>
                  <li>
                      <img src="../../assets/inder_img/shexiangtou1.png" alt="">
                      <p class="line-one">海康威视</p>
                      <p class="line-two">200万4mm红外高清网络半球摄像机</p>
                      <p class="line-there">AAAAAAA</p>
                  </li>
                  <li>
                      <img src="../../assets/inder_img/shexiangtou1.png" alt="">
                      <p class="line-one">海康威视</p>
                      <p class="line-two">200万4mm红外高清网络半球摄像机</p>
                      <p class="line-there">AAAAAAA</p>
                  </li>
                  <li>
                      <img src="../../assets/inder_img/shexiangtou1.png" alt="">
                      <p class="line-one">海康威视</p>
                      <p class="line-two">200万4mm红外高清网络半球摄像机</p>
                      <p class="line-there">AAAAAAA</p>
                  </li>
                  <li>
                      <img src="../../assets/inder_img/shexiangtou1.png" alt="">
                      <p class="line-one">海康威视</p>
                      <p class="line-two">200万4mm红外高清网络半球摄像机</p>
                      <p class="line-there">AAAAAAA</p>
                  </li>
              </ul>
        </div>
        <div class="side">
              <div class="title">
                  <div class="left">
                      <i></i>
                      <span>热卖单品</span>
                  </div>
              </div>

              <ul class="alone">
                  <li>
                      <img src="../../assets/inder_img/jingtou.png" alt="">
                      <p class="alone-one">福特科</p>
                      <p class="alone-two">300W变焦超长镜头</p>
                      <p class="alone-there">$ 399.00</p>
                      <i></i>
                  </li>
                  <li>
                      <img src="../../assets/inder_img/jingtou.png" alt="">
                      <p class="alone-one">福特科</p>
                      <p class="alone-two">300W变焦超长镜头</p>
                      <p class="alone-there">$ 399.00</p>
                      <i></i>
                  </li>
                  <li>
                      <img src="../../assets/inder_img/jingtou.png" alt="">
                      <p class="alone-one">福特科</p>
                      <p class="alone-two">300W变焦超长镜头</p>
                      <p class="alone-there">$ 399.00</p>
                      <i></i>
                  </li>
                  <li>
                      <img src="../../assets/inder_img/jingtou.png" alt="">
                      <p class="alone-one">福特科</p>
                      <p class="alone-two">300W变焦超长镜头</p>
                      <p class="alone-there">$ 399.00</p>
                      <i></i>
                  </li>
                  <li>
                      <img src="../../assets/inder_img/jingtou.png" alt="">
                      <p class="alone-one">福特科</p>
                      <p class="alone-two">300W变焦超长镜头</p>
                      <p class="alone-there">$ 399.00</p>
                      <i></i>
                  </li>
                  <li>
                      <img src="../../assets/inder_img/jingtou.png" alt="">
                      <p class="alone-one">福特科</p>
                      <p class="alone-two">300W变焦超长镜头</p>
                      <p class="alone-there">$ 399.00</p>
                      <i></i>
                  </li>
                  <li>
                      <img src="../../assets/inder_img/jingtou.png" alt="">
                      <p class="alone-one">福特科</p>
                      <p class="alone-two">300W变焦超长镜头</p>
                      <p class="alone-there">$ 399.00</p>
                      <i></i>
                  </li>
              </ul>
        </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        list:[
          "../../assets/inder_img/BANNERTU.png",
          "../../assets/inder_img/BANNERTU.png",
          "../../assets/inder_img/BANNERTU.png"
        ]
      }
    }
  }
</script>
<style src="@/assets/iconfont/iconfont.css"></style>
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

a,
u,
s,
del {
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

/*文本溢出出现省略号*/

.over {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.nav{
  height: 173px;
  display: flex;
  justify-content: space-between;
  li{
    margin-top:25px;
    text-align: center;
  }
  i{
    font-size: 40px;
  }
  .left{
    width: 663px;
     display: flex;
     justify-content: space-around;
  }
  img{
    margin-top: 50px;
    width: 102px;
	  height: 27px;
  }
  .right{
    width: 663px;
    display: flex;
    justify-content: space-around;
  }
}
template .block{
  margin:12px 0;
  background-color: #f6f6f6;
  background-color:red;
}
// publicity
.publicity{
  display:flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color:#fff;
  padding: 12px 0;
  .welcome{
    h3{
      font:24px/60px "MicrosoftYaHei-Bold";
    }
  }
  .login{
    button{
      width: 120px;
      height: 36px;
      border-radius: 4px;
      font:16px/32px "MicrosoftYaHei";
    }
    .register{
      background-color: #ededed;
      box-shadow: 0px 2px 10px 0px 	#f6f6f6;
      font-weight: bold;
      color: #f13a40;
      margin-right: 12px;
    }
    .sign{
      background-color: #ffffff;
	    border-radius: 4px;
      border: solid 1px rgba(0, 0, 0, 0.5);
      color:rgba(0, 0, 0, 0.7);
    }
  }
}

// poster
.poster{
  display: flex;
  justify-content: space-between;
  .one{
    margin-right: 12px;
  }
}

// center
.center{
  display: flex;
  justify-content: space-between;
  .main{
    width: 1198px;
    .import{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li{
          width: 290px;
          height: 450px;
          text-align: center; 
          border-top: 2px solid #f13a40;
          img{
            width: 147px;
            height: 142px;
            margin-top: 46px;
          }
          .line-one{
          margin-top: 59px;
          font-family: FZLTZHK--GBK1-0;
          font-size: 18px;
          color:rgba(0, 0, 0, 0.7);
          }
          .line-two{
            margin: 13px 0;
            font-family: FZLTZHK--GBK1-0;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.5); 
          }
          .line-there{
            margin-bottom: 26px;
            font-family: FZLTZHK--GBK1-0;
            font-size: 14px; 
            color: rgba(0, 0, 0, 0.5); 
          }
          .line-four{
            width: 266px;
            border-top: 1px solid #f2f2f2;
            margin:0 auto;
          }
          button{
            margin: 32px 0 47px 0;
            width: 150px;
            height: 30px;
            background-color: #ffffff;
            box-shadow: 0px 0px 10px 0px 
              #efefef;
            font: 14px/30px "MicrosoftYaHei";
            color: #cf242a;
          }
      }
    }
  }
  .import li:nth-child(1){
    margin-bottom: 14px;
  }
  .side{
    width: 290px;
    .alone{
      li{
        height: 296px;
        text-align: center;
        img{
          margin:30px 0 32px 0;
        }
        .alone-one{
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #000000;
        }
        .alone-two{
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #000000;
          margin: 9px 0;
        }
        .alone-there{
          font-family: FZLTZHK--GBK1-0;
          font-size: 16px;
          color: #ce2127;
          margin-bottom: 36px;
        }
        i{
          display: block;
          width: 260px;
          height: 1px;
          // background: #f2f2ff;
          background: #ce2127;
          opacity: 0.05;
        }
      }
    }
.alone li:nth-child(1){
    border-top: 2px solid #f0a13b;
  }
  }
}

// center title
.center{
  .title{
    display: flex;
    justify-content: space-between;
    height: 50px;
    .left{
      margin-top: 10px;
      font-size:14px/40px "MicrosoftYaHei-Bold";
      font-weight: bold; 
      color:rgba(1, 1, 1, 0.7);
      align-self: center;
      i{
        display:inline-block;
        width:2px;
        height: 14px;
        background-color: #3b85ff;
        margin-right: 6px;
      }
    }
    .right{
        margin-top: 10px;
        font-size:14px/40px "MicrosoftYaHei";
        color:rgba(1, 1, 1, 0.7);
        align-self: center;
        i{
          // display: inline-block;
          // width: 6px;
          // height: 10px;
          // background-color: rgba(0, 0, 0, 0.5);
	        // opacity: 0.5;
        }
    }
  }
}
</style>
