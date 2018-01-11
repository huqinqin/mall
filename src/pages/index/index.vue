<template>
  <div class="_index">
     <!-- banner -->
     <template>
        <div class="block">
          <el-carousel height="500px">
            <el-carousel-item v-for="item in index_banner" :key=item.index>
              <a href="">
                <img :src="item.link" alt="">
              </a>
            </el-carousel-item>
          </el-carousel>
        </div>
    </template>
    <!-- publicity -->
    <div class="publicity">
        <div class="welcome">
            <h3>WELCOME TO LTS</h3>
            <div class="p">
              <p>Video Solutions For</p>
              <p>Security Professionals</p>
            </div>
            <!-- <span>Video Solutions For Security Professionals</span> -->
            <!-- <span class="tm">TM</span>    -->
        </div>
        <div class="login">
          <a href="">
            <button class="register">立即登录</button>
          </a>
          <a href="">
            <button class="sign">免费注册</button>
          </a>   
        </div>
    </div>
    <!-- poster -->
    <div class="poster">
        <div class="one">
          <a href="">
             <img src="../../assets/inder_img/guanggao1.png" alt="">
          </a>
        </div>
        <div class="two">
          <a href="" class="top">
            <img src="../../assets/inder_img/gaunggao2.png" alt="">
          </a>
          <a href="">
            <img src="../../assets/inder_img/guanggao3.png" alt="">
          </a>              
        </div>
    </div>
     <!-- main -->
    <div class="center">
        <div class="main"  v-for="name in index_title" :key="name.index">        
              <div class="title">
                  <div class="left">
                      <div class="i"></div>
                      <span>{{name.name}}</span>
                  </div>
                  <div class="right">
                      <!-- <a href=""> -->
                        <span>更多</span>
                      <!-- </a> -->
                      <i class="iconfont icon-shangyiye-copy-copy rotate"></i>
                  </div>
              </div>
               
              <ul class="import">
                  <li  v-for="im in index_data_first" :key="im.index" class="yi">
                      <div class="good_box">
                          <i class="_good_i"></i>
                          <img :src="im.link" alt="" class="_good_img">
                      </div>
                      <!-- <img :src="im.link" alt="" class="img_first"> -->
                      <p class="line-one">{{im.name}}</p>
                      <p class="line-two">{{im.info1}}</p>
                      <p class="line-there">{{im.info2}}</p>                 
                      <p class="line-four"></p>
                      <button>登录之后查看价格 </button>
                  </li>
              </ul> 
              
              <div class="title">
                  <div class="left">
                      <div class="i"></div>
                      <span>{{name.name}}</span>
                  </div>
                  <div class="right">
                      <!-- <a href=""> -->
                        <span>更多</span>
                      <!-- </a> -->
                      <i class="iconfont icon-shangyiye-copy-copy rotate"></i>
                  </div>
              </div>
               
              <ul class="import">
                  <li  v-for="im in index_data_center" :key="im.index" class="er">
                      <!-- <img :src="im.link" alt="" class="img_center"> -->
                      <div class="good_box">
                          <i class="_good_i"></i>
                          <img :src="im.link" alt="" class="_good_img">
                      </div>
                      <p class="line-one">{{im.name}}</p>
                      <p class="line-two">{{im.info1}}</p>
                      <p class="line-there">{{im.info2}}</p>                 
                      <p class="line-four"></p>
                      <button>登录之后查看价格 </button>
                  </li>
              </ul>
              <div class="title">
                  <div class="left">
                      <div class="i"></div>
                      
                      <span>{{name.name}}</span>
                  </div>
                  <div class="right">
                      <!-- <a href=""> -->
                        <span>更多</span>
                      <!-- </a> -->
                      <i class="iconfont icon-shangyiye-copy-copy rotate"></i>
                  </div>
              </div>
               
              <ul class="import">
                  <li  v-for="im in index_data_last" :key="im.index" class="san">
                      <!-- <img :src="im.link" alt="" class="img_last"> -->
                      <div class="good_box">
                          <i class="_good_i"></i>
                          <img :src="im.link" alt="" class="_good_img">
                      </div>
                      <p class="line-one">{{im.name}}</p>
                      <p class="line-two">{{im.info1}}</p>
                      <p class="line-there">{{im.info2}}</p>                 
                      <p class="line-four"></p>
                      <button>登录之后查看价格 </button>
                  </li>
              </ul>
        </div>
        <!-- side -->
        <div class="side">
              <div class="title">
                  <div class="left">
                      <div class="i"></div>
                      <span>热卖单品</span>
                  </div>
              </div>

              <ul class="alone">
                  <li v-for="item in side" :key="item.index">
                      <!-- <img :src="item.link" alt=""> -->
                      <div class="_side_box">
                          <!-- <i class="_side_good_i"></i> -->
                          <img :src="item.link" alt="" class="_side_good_img">
                      </div>
                      <p class="alone-one">{{item.name}}</p>
                      <p class="alone-two">{{item.info}}</p>
                      <p class="alone-there">{{item.prace}}</p>
                      <i></i>
                  </li>
              </ul>
        </div>

    </div>
  </div>
</template>
<script>
import indexService from '@/services/indexService.js'
  export default {
    data(){
      return{
        index_banner:[
          {
            link:"static/image/BANNERTU.png",
            href:""
          },
          {
            link:"static/image/BANNERTU.png",
            href:""
          },
          {
            link:"static/image/BANNERTU.png",
            href:""
          }
        ],
        index_welcome:[
          {
           link:"static/image/BANNERTU.png",
           href:""
          },
          {link:"static/image/BANNERTU.png"}, 
          {link:"static/image/BANNERTU.png"}
        ],
        index_title:[
          {
            name:"摄像头"
          }
        ],
       index_data_first:[{
          link: 'static/image/shexiangtou1.png',
          src:'',
          alt:'',
          name:'哈康卫视',
          info1:'200万4mm红外高清网络半球摄像机',
          info2:'DS-2CD3325-1（C ）',
        },
        {
          link: 'static/image/shexiangtou1.png',
          src:'',
          alt:'',
          name:'测试测试测试',
          info1:'200万测试测试测试像机',
          info2:'testtest',
        },
        {
          link: 'static/image/shexiangtou1.png',
          src:'',
          alt:'',
          name:'测试测试测试',
          info1:'200万测试测试测试像机',
          info2:'testtest',
        },
        {
          link: 'static/image/shexiangtou1.png',
          src:'',
          alt:'',
          name:'测试测试测试',
          info1:'200万测试测试测试像机',
          info2:'testtest',
        },
        {
          link: 'static/image/shexiangtou1.png',
          src:'',
          alt:'',
          name:'测试测试测试',
          info1:'200万测试测试测试像机',
          info2:'testtest',
        },
        {
          link: 'static/image/shexiangtou1.png',
          src:'',
          alt:'',
          name:'测试测试测试',
          info1:'200万测试测试测试像机',
          info2:'testtest',
        },
        {
          link: 'static/image/shexiangtou1.png',
          src:'',
          alt:'',
          name:'测试测试测试',
          info1:'200万测试测试测试像机',
          info2:'testtest',
        },
        {
          link: 'static/image/shexiangtou1.png',
          src:'',
          alt:'',
          name:'测试测试测试',
          info1:'200万测试测试测试像机',
          info2:'testtest',
        }],
         index_data_center:[{
          link: 'static/image/luxiangji1.png',
          src:'',
          alt:'',
          name:'哈康卫视',
          info1:'200万4mm红外高清网络半球摄像机',
          info2:'DS-2CD3325-1（C ）',
        },
        {
          link: 'static/image/luxiangji1.png',
          src:'',
          alt:'',
          name:'测试测试测试',
          info1:'200万测试测试测试像机',
          info2:'testtest',
        },
        {
          link: 'static/image/luxiangji1.png',
          src:'',
          alt:'',
          name:'测试测试测试',
          info1:'200万测试测试测试像机',
          info2:'testtest',
        },
        {
          link: 'static/image/luxiangji1.png',
          src:'',
          alt:'',
          name:'测试测试测试',
          info1:'200万测试测试测试像机',
          info2:'testtest',
        },
        {
          link: 'static/image/luxiangji1.png',
          src:'',
          alt:'',
          name:'测试测试测试',
          info1:'200万测试测试测试像机',
          info2:'testtest',
        },
        {
          link: 'static/image/luxiangji1.png',
          src:'',
          alt:'',
          name:'测试测试测试',
          info1:'200万测试测试测试像机',
          info2:'testtest',
        },
        {
          link: 'static/image/luxiangji1.png',
          src:'',
          alt:'',
          name:'测试测试测试',
          info1:'200万测试测试测试像机',
          info2:'testtest',
        },
        {
          link: 'static/image/luxiangji1.png',
          src:'',
          alt:'',
          name:'测试测试测试',
          info1:'200万测试测试测试像机',
          info2:'testtest',
        }],
         index_data_last:[{
          link: 'static/image/peijian1.png',
          src:'',
          alt:'',
          name:'海康卫视',
          info1:'200万4mm红外高清网络半球摄像机',
          info2:'DS-2CD3325-1（C ）',
        },
        {
          link: 'static/image/peijian1.png',
          src:'',
          alt:'',
          name:'测试测试测试',
          info1:'200万测试测试测试像机',
          info2:'testtest',
        },
        {
          link: 'static/image/peijian1.png',
          src:'',
          alt:'',
          name:'测试测试测试',
          info1:'200万测试测试测试像机',
          info2:'testtest',
        },
        {
          link: 'static/image/peijian1.png',
          src:'',
          alt:'',
          name:'测试测试测试',
          info1:'200万测试测试测试像机',
          info2:'testtest',
        },
        {
          link: 'static/image/peijian1.png',
          src:'',
          alt:'',
          name:'测试测试测试',
          info1:'200万测试测试测试像机',
          info2:'testtest',
        },
        {
          link: 'static/image/peijian1.png',
          src:'',
          alt:'',
          name:'测试测试测试',
          info1:'200万测试测试测试像机',
          info2:'testtest',
        },
        {
          link: 'static/image/peijian1.png',
          src:'',
          alt:'',
          name:'测试测试测试',
          info1:'200万测试测试测试像机',
          info2:'testtest',
        },
        {
          link: 'static/image/peijian1.png',
          src:'',
          alt:'',
          name:'测试测试测试',
          info1:'200万测试测试测试像机',
          info2:'testtest',
        }],
        side:[{
          link: 'static/image/peijian1.png',
          src:'',
          alt:'',
          name:'福特科',
          info:'300w变焦超长镜头',
          prace:'$399.00'
        },
        {
          link: 'static/image/peijian1.png',
          src:'',
          alt:'',
          name:'福特科',
          info:'300w变焦超长',
          prace:'$ 399.00'
        },
        {
          link: 'static/image/peijian1.png',
          src:'',
          alt:'',
          name:'福特科',
          info:'300w变焦超长',
          prace:'$ 399.00'
        },
        {
          link: 'static/image/peijian1.png',
          src:'',
          alt:'',
          name:'福特科',
          info:'300w变焦超长',
          prace:'$ 399.00'
        },
        {
          link: 'static/image/peijian1.png',
          src:'',
          alt:'',
          name:'福特科',
          info:'300w变焦超长',
          prace:'$ 399.00'
        },
        {
          link: 'static/image/peijian1.png',
          src:'',
          alt:'',
          name:'福特科',
          info:'300w变焦超长',
          prace:'$ 399.00'
        }
        ,{
          link: 'static/image/peijian1.png',
          src:'',
          alt:'',
          name:'福特科',
          info:'300w变焦超长',
          prace:'$ 399.00'
        }]
        // index_welcome:{
        //   link:"static/image/BANNERTU.png",
        //   link:"static/image/BANNERTU.png",
        //   link:"static/image/BANNERTU.png"
        // }
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

._index{
  background-color: #f6f6f6;
}
// banner
  .el-carousel__button{
    height: 20px;
  }

// publicity
.publicity{
  height: 60px;
  background-color:#fff;
  margin:12px 0;
  text-align: center;
  .welcome{
    margin-left: 24px;
    float: left;
    display: flex;
    h3{
      font:24px/60px "MicrosoftYaHei-Bold";
      font-weight: bold;
      color: rgba(0, 0, 0, 0.7);
      letter-spacing: 1px;
      display: inline;
    }
    .p{
      margin-top: 18px;
      // display: inline;
      // text-align: center;
      font:10px/12px "MicrosoftYaHei";
      color: rgba(0, 0, 0, 0.7);
      margin-left: 24px;
      text-align: left;
    }
    .tm{
      width: 9px;
      height: 5px;
      background: #ce2127;
      font: 6px/60px "MicrosoftYaHei";
      line-height: 60px;
      color: #000000;
    }
  }
  .login{ 
    float: right;
    margin-top: 12px;
    button{
      width: 120px;
      height: 36px;
      border-radius: 4px;
      font:16px/32px "MicrosoftYaHei";
      box-shadow: none;
    }
    .register{
      font-weight: bold;
      color: #f13a40;
      border:none;
      background:#ccc;
    }
    .sign{
      border: solid 1px rgba(0, 0, 0, 0.5);
      background: #ffffff ;
      color:rgba(0, 0, 0, 0.7);
      margin-left: 12px;
      margin-right: 24px;
    }
  }
}

// poster
.poster{
  height: 350px;
  display: flex;
  justify-content: space-between; 
  .one{
    width: 895px;
    height: 350px;
    img{
      // width: 100%;
      // height: 100%;
    }
  }
  .two{
    width: 592px;
    height: 350px;
    .top{
      display: block;
      margin-bottom: 12px;
    }
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
          // box-sizing: border-box;
          width: 290px;
          height: 450px;
          background-color: #ffffff;
          text-align: center; 
          // border-top: 2px solid #
         .good_box{
           width: 242px;
           height: 242px;
           margin:18px 24px;
          ._good_i{
            vertical-align: middle;
            display: inline-block;
            height: 100%;
          }
           ._good_img{
            vertical-align: middle;
           }
         }
          .line-one{
          font-family: MicrosoftYaHei;
          font-weight: bold;
          font-size: 18px;
          color:#707070;
          }
          .line-two{
            margin: 12px 0;
            font-family: MicrosoftYaHei;
            font-size: 14px;
            color: #a3a3a3;
          }
          .line-there{
            margin-bottom: 24px;
            font-family: MicrosoftYaHei;
            font-size: 14px; 
            color: #a3a3a3; 
          }
          .line-four{
            width: 266px;
            border-top: 1px solid #f2f2f2;
            margin:0 auto;
          }
          button{
            border:none;
            background:#ccc;
            margin: 16px 0 0 0;
            width: 200px;
            height: 26px;
            background-color: #ffffff;
            font: 12px/26px "MicrosoftYaHei";
            font-weight: bold;
            color: #ff3b41;
            box-shadow: 2px 0px 15px 0px 
		#e9e9e9;
          }
      }
    }
  }
  ul .yi{
    border-top: 2px solid #f13a40;
  }
  ul .er{
    border-top: 2px solid #3d98ff;
  }
  ul .san{
    border-top: 2px solid #f0a13b;
  }
  .import li:nth-child(1){
    margin-bottom: 14px;
  }

  .side{
    width: 290px;
    .alone{
      li{
        width: 290px;
        height: 296px;
        text-align: center;
        background: #ffffff;
        ._side_box{
           width: 150px;
           height: 150px;
           margin:36px 70px;
           display: flex;
          justify-content: center;
          align-items: center;
        }
        .alone-one{
          font-family: MicrosoftYaHei;
          font-size: 14px;
          font-weight: bold;
          color: #a3a3a3;
        }
        .alone-two{
          font-family: MicrosoftYaHei;
          font-size: 14px;
          margin: 12px 0;
          color: #a3a3a3;
        }
        .alone-there{
          font-family: MicrosoftYaHei;
          font-size: 16px;
          font-weight: bold;
          color: #ff3b41;
          margin-bottom: 24px;
        }
        i{
          display: block;
          width: 260px;
          height: 1px;
          margin: 0 auto;
          background: #f2f2f2;
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
      font-size:16px/40px "MicrosoftYaHei";
      font-weight: bold; 
      color:#707070;
      // display: flex;
      align-self: center;
      .i{
        display:inline-block;
        // width:2px;
        height: 14px;
        // background-color: #3b85ff;
        border-left: 2px solid #3b85ff;
        margin-right: 6px;
        // margin-top: 50px;
      }
      // span{
      //   margin-top: 100px;
      // }
      // .i:before{
      //   margin-top: 500px;
      // }
    }
    .right{
        margin-top: 10px;
        font-size:14px/40px "MicrosoftYaHei";
        color: #707070;
        align-self: center;
        span{
          letter-spacing:1px;
        }
        .rotate:before{
          transform:rotateY(180deg);
          font-size: 14px;
          margin-left: 2px;
          display: inline-block;
        }
    }
  }
}
</style>
