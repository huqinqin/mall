<template>
  <div class="_index">
     <!-- banner -->
    <div class="block">
      <el-carousel height="500px">
        <el-carousel-item v-for="item in index_banner" :key=item.index>
          <a href="">
            <img :src="item.link" alt="">
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>
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
            <button class="register" @click='login'>立即登录</button>
          <!--<a href="">-->
            <!---->
          <!--</a>-->
          <a href="">
            <button class="sign" @click='signup'>免费注册</button>
          </a>
        </div>
    </div>
    <!-- poster -->
    <!--<div class="poster">-->
        <!--<div class="one">-->
          <!--<a href="/detail?id=123">-->
              <!--&lt;!&ndash;<img src="../../assets/inder_img/guanggao1.png" alt="">&ndash;&gt;-->
          <!--</a>-->
        <!--</div>-->
        <!--<div class="two">-->
          <!--<a href="" class="top">-->
              <!--&lt;!&ndash;<img src="../../assets/inder_img/guanggao2.png" alt="">&ndash;&gt;-->
          <!--</a>-->
          <!--<a href="">-->
              <!--&lt;!&ndash;<img src="../../assets/inder_img/guanggao3.png" alt="">&ndash;&gt;-->
          <!--</a>-->
        <!--</div>-->
    <!--</div>-->
     <!-- main -->
    <div class="content">
        <div class="item-box">
            <div v-for="itemlist in itemList" :key="itemlist.id">
              <div class="item-list-title">
                  <div>
                      <div class="i"></div>
                      <span>{{itemlist.name}}</span>
                  </div>
                  <div>
                      <!-- <a href=""> -->
                        <span>更多</span>
                      <!-- </a> -->
                      <i class="iconfont icon-shangyiye-copy-copy rotate"></i>
                  </div>
              </div>
              <ul class="item-list-box">
                  <li  v-for="item in itemlist.items" :key="item.id" class="yi">
                      <div class="good_img" :style="{backgroundImage : 'url(' + 'http://res.500mi.com/item/'+item.url+')'}"></div>
                      <div class="item-spec">
                          <p class="line-one">{{item.name}}</p>
                          <p class="line-two">{{item.name}}</p>
                          <p class="line-there">{{item.name}}</p>
                          <p class="line-four"></p>
                          <button>登录之后查看价格 </button>
                      </div>

                  </li>
              </ul>
            </div>
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
                  123
                  <!--<li v-for="item in side" :key="item.index">-->
                      <!--&lt;!&ndash; <img :src="item.link" alt=""> &ndash;&gt;-->
                      <!--<div class="_side_box">-->
                          <!--&lt;!&ndash; <i class="_side_good_i"></i> &ndash;&gt;-->
                          <!--<img :src="item.link" alt="" class="_side_good_img">-->
                      <!--</div>-->
                      <!--<p class="alone-one">{{item.name}}</p>-->
                      <!--<p class="alone-two">{{item.info}}</p>-->
                      <!--<p class="alone-there">{{item.prace}}</p>-->
                      <!--<i></i>-->
                  <!--</li>-->
              </ul>
        </div>

    </div>
  </div>
</template>
<script>
import homeService from '@/services/HomeService.js'
  export default {
    mounted(){
        this.getList();
    },
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
        itemList : [],
        // index_welcome:{
        //   link:"static/image/BANNERTU.png",
        //   link:"static/image/BANNERTU.png",
        //   link:"static/image/BANNERTU.png"
        // }
      }
    },
      methods:{
        login(){
            this.$emit('showLogin',2)
        },
        signup(){

        },
        getList(){
            homeService.getList().then((data) => {
                this.itemList = data.floor.datalist;
            },(msg) => {
                console.log('error')
            })
        },
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
    // span{
    //   display:inline-block;
    //   width:125px;
    //   font:10px/12px "MicrosoftYaHei";
    //   color: rgba(0, 0, 0, 0.7);
    //   margin-left: 24px;
    // }

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
.content{
  display: flex;
  justify-content: space-between;
  .item-box {
      flex: 1;
      .item-list-title{
           display: flex;
           justify-content: space-between;
           height: 50px;
           align-items: center;
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
      .item-list-box {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          li {
              // box-sizing: border-box;
              background-color: #ffffff;
              text-align: center;
              width: 23%;
              .good_img{
                  background-size: cover;
                  background-position: center center;
                  height: 242px;
              }
              .item-spec{
                  .line-one {
                      font-family: MicrosoftYaHei;
                      font-weight: bold;
                      font-size: 18px;
                      color: #707070;
                  }
                  .line-two {
                      margin: 12px 0;
                      font-family: MicrosoftYaHei;
                      font-size: 14px;
                      color: #a3a3a3;
                  }
                  .line-there {
                      margin-bottom: 24px;
                      font-family: MicrosoftYaHei;
                      font-size: 14px;
                      color: #a3a3a3;
                  }
                  .line-four {
                      width: 266px;
                      border-top: 1px solid #f2f2f2;
                      margin: 0 auto;
                  }
                  button {
                      border: none;
                      background: #ccc;
                      margin: 16px 0 0 0;
                      width: 200px;
                      height: 26px;
                      background-color: #ffffff;
                      font: 12px/26px "MicrosoftYaHei";
                      font-weight: bold;
                      color: #ff3b41;
                      box-shadow: 2px 0px 15px 0px #e9e9e9;
                  }
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
