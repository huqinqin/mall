<template>
  <div>
     <div class="nav">                                    
        <ul class="left">
            <li>
                <i class="iconfont icon-IPjiejuefangan"></i>
                <p>IP</p>
                <p>SOLUTION</p>
            </li>
            <li>
                <i class="iconfont icon-jiankong"></i>
                <p>HD-TVI</p>
                <p>SOLUTION</p>
            </li>
            <li>
                <i class="iconfont icon-lianxixiaoshoukefu"></i>
                <p>PUBLIC PLACE</p>
                <p>SOLUTION </p>
            </li>
            <li>
                <i class="iconfont icon-jiatingjiejuefangan"></i>
                <p>RESIDENTIAL</p>
                <p>SOLUTION </p>
            </li>
        </ul>
        <div class="logo">
            <img src="../../assets/inder_img/logo.png" alt="">
        </div>
        <ul class="right">
            <li>
                <i class="iconfont icon-lianxixiaoshoukefu"></i>
                <p>CALL</p>
                <p>SALES</p>
            </li>
            <li>
                <i class="iconfont icon-zhichi"></i>
                <p>SUPPORT</p>
                <p>CENTER</p>
            </li>
            <li>
                <i class="iconfont icon-wodezuiai"></i>
                <p>MY</p>
                <p>FAVOURITE</p>
            </li>
            <li>
                <i class="iconfont icon-gouwuche2"></i>
                <p>SHOPPING</p>
                <p>CART</p>
            </li>
        </ul>
        <div class="search">
            <template>
              <el-select v-model="value" placeholder="全部分类"  class="select">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
            <div class="input">
                <input type="text" placeholder="输入你想要搜索的商品名称或编码">
                <!-- <i class="iconfont icon-sousuo2 te"></i> -->
            </div>
        </div>
     </div>

     <!-- banner -->
     <template>
        <div class="block">
          <el-carousel height="524px">
            <el-carousel-item v-for="item in list" :key=item.index>
              <img :src="item" alt="">
            </el-carousel-item>
          </el-carousel>
        </div>
    </template>
    <!-- publicity -->
    <div class="publicity">
        <div class="welcome">
            <h3>WELCOME TO LTS</h3>
            <div class="span">    
              <!-- <span>Video Solutions For Security Professionals</span> -->
            </div>
            <!-- <div class="TM">
              TM
            </div>  -->
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
        nav:[
          
        ],
        list:[
          "static/image/BANNERTU.png",
          "static/image/BANNERTU.png",
          "static/image/BANNERTU.png"
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

// nav
.el-input__inner{
  height: 30px;
}
.nav{
  height: 173px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  li{
    margin-top:25px;
    text-align: center;  
    p{
      font:12px/18px "MicrosoftYaHei";
      color: rgba(0, 0, 0, 0.7);
    }     
  }
  i{
    font-size: 42px;
  }
  .left{        
     width: 600px;
     display: flex;
     justify-content: space-around;
  }
  .logo{
    width: 300px;
    height: 27px;
    margin-top: 50px;
    text-align: center;
    img{   
    width: 102px;
	  height: 27px;
  }
  }
  .right{
    width: 600px;                
    display: flex;
    justify-content: space-around;
  }
  .search{
    height: 54px;
    width: 1453px;
    margin: 0 auto;
    // .el-input__inner{
    //   height: 30px;
    // }
    .select{
       width:121px;
    }
    .input{
      display: inline-block;
      margin-left: -6px;
      width: 1262px;
      height: 28px;
      background-color: #ffffff;
      border: solid 1px rgba(0, 0, 0, 0.3);
      border-left: none;
      input{   
         width: 1232px;
        height: 28px;     
        border: none;
        font-family: MicrosoftYaHei;
        font-size: 12px;
        color: #000000;
        margin-left: 24px;
      }
      // .te{
      //   font-size:15px;
      //   margin-top: -20px;
      // }
    }
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
    margin-left: 24px;
    display: flex;
    flex-direction: row;
    h3{
      font:24px/60px "MicrosoftYaHei-Bold";
    }
    .span{
      display:inline-block;
      width:125px;
      height: 60px;
      font:10px/12px "MicrosoftYaHei"; 
      color: rgba(0, 0, 0, 0.7);

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
      font-weight: bold;
      color: #f13a40;
    }
    .sign{
      background-color: #ffffff;
      border: solid 1px rgba(0, 0, 0, 0.5);
      color:rgba(0, 0, 0, 0.7);
      margin-left: 12px;
      margin-right: 24px;
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
  .two{
    // display: flex;
    // align-items: stretch;
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
