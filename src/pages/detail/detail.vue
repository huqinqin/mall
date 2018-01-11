<template>
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
      <div class="num">
        <p>商品编号：1234556788</p>
      </div>
    </div>

    <!-- center -->
    <div class="detail_center">
        <h3>LTS 1080P普及型会议终端TS2000</h3>
        <div class="info">
            <div class="price">
                <span>价格:</span>
                <div class="tips">完成登录注册，享受惊爆价</div>
            </div>
            <div class="sku_1">
                <span>供电方式:</span>
                <div class="tips">
                    <el-radio v-model="sku_1" label="1" border>DC12V</el-radio>
                    <el-radio v-model="sku_1" label="2" border>AC14V</el-radio>
                    <el-radio v-model="sku_1" label="3" border>POE</el-radio>
                </div>

            </div>
            <div class="sku_2">
                <span>像素分类:</span>
                <div class="tips">
                    <el-radio v-model="sku_2" label="1" border>100W</el-radio>
                    <el-radio v-model="sku_2" label="2" border>110W</el-radio>
                    <el-radio v-model="sku_2" label="3" border>120W</el-radio>
                    <el-radio v-model="sku_2" label="4" border>130W</el-radio>
                    <el-radio v-model="sku_2" label="5" border>140W</el-radio>
                    <el-radio v-model="sku_2" label="6" border>150W</el-radio>
                    <el-radio v-model="sku_2" label="7" border>160W</el-radio>
                    <el-radio v-model="sku_2" label="8" border>170W</el-radio>
                    <el-radio v-model="sku_2" label="9" border>180W</el-radio>
                    <el-radio v-model="sku_2" label="10" border>190W</el-radio>
                    <el-radio v-model="sku_2" label="11" border>200W</el-radio>
                    <el-radio v-model="sku_2" label="12" border>210W</el-radio>
                    <el-radio v-model="sku_2" label="13" border>220W</el-radio>
                    <el-radio v-model="sku_2" label="14" border>230W</el-radio>
                </div>

            </div>
            <div class="num">
                <span>采购量:</span>
                <el-input-number v-model="count" size="mini" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
            </div>
            <div class="mark">
                温馨提示:<span>不支持60天无理由退换(如果商品参加活动，退换货以活动规则为准)</span>
            </div>
        </div>
        <div class="buttons">
            <button>立即购买</button>
            <button>加入购物车</button>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
     data(){
      return{
          sku_1: '',
          sku_2: '',
          count: '',
        prc_info:[
          {
            href:"",
            link:"static/image/shexiangtou1.png",
            alt:""
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

    .detail{
        .detail_left{

        }
        .detail_center{
            font-size: 14px;
            color:rgba(0,0,0,0.5);
            h3{
                color: rgba(0,0,0,0.7);
                font-size: 16px;
                margin-bottom: 48px;
                line-height: 16px;
                font-family: MicrosoftYaHei-Bold;
            }
            .info{
                span{
                    display: inline-block;
                    width:70px;
                }
                .tips{
                    width:420px;
                    display: inline-block;
                    margin-left: 12px;
                    vertical-align: top;
                    .el-radio{
                        display: inline-block;
                        margin: 0 24px 24px 0px;
                        float: left;
                        width: 60px;
                        height: 20px;
                        padding:0;
                        color:rgba(0,0,0,0.5);
                        border:1px solid rgba(0,0,0,0.2);
                        border-radius: 0;
                        span.el-radio__input{
                            display: none;
                        }
                        span.el-radio__label{
                            padding: 0;
                            text-align: center;
                            font-size: 12px;
                            width:60px;
                            line-height: 20px;
                            margin-top: -1px;

                        }
                    }
                    .el-radio:hover{
                        border:1px solid #ff3b41;
                    }
                    .el-radio.is-checked{
                        border:1px solid #ff3b41;
                        position: relative;
                        span{
                            color:rgba(0,0,0,0.5);
                        }
                    }
                    .el-radio.is-checked::after{
                        content:'';
                        width: 0;
                        height: 0;
                        border-right: 6px solid red;
                        border-bottom: 6px solid red;
                        border-top: 6px solid transparent;
                        border-left: 6px solid transparent;
                        position: absolute;
                        bottom: 0;
                        right: 0;

                    }
                }
                .price{
                    margin-bottom: 24px;
                    span{
                        line-height: 21px;
                    }
                    .tips{
                        color:#ff3b41;
                        font-size: 12px;
                        border: 1px solid #ff3b41;
                        width:160px;
                        line-height: 21px;
                        text-align: center;
                        cursor: pointer;
                    }
                }
                .num{
                    .el-input-number{
                        width:84px;
                        margin-left: 12px;
                        margin-bottom: 24px;
                        border: 1px solid rgba(0,0,0,0.2);
                        border-radius: 0;
                        .el-input__inner{
                            border-radius: 0px;
                            border:none;
                        }
                        span{
                            width: 28px;
                            background: #eee;
                            border: 1px solid #dcdfe6;
                            margin-left: -2px;
                            margin-top: -1px;
                            i{
                                font-size: 18px;
                                color: rgba(0,0,0,0.7);
                                font-weight: bolder;
                                margin-top: 3px;
                            }
                        }
                        span.el-input-number__increase{
                            margin-right: -2px;
                        }
                    }
                }
                .mark{
                    margin-bottom: 24px;
                    span{
                        display:inline;
                        margin-left: 24px;
                    }
                }
            }
            .buttons{
                button{
                    width:180px;
                    height: 50px;
                    background: #ff3b41;
                    color:white;
                    border:none;
                    font-family: MicrosoftYaHei-Bold;
                    font-size: 24px;
                    border-radius: 4px;
                }
                button:nth-child(2){
                    margin-left: 24px;
                    border:1px solid #ff3b41;
                    background: #fff;
                    color:#ff3b41;
                }
            }
        }
    }

// 公共样式
body, ol, ul, h1, h2, h3, h4, h5, h6, p, th, td, dl, dd, form, fieldset, legend, input, textarea, select, td, figure {
  margin: 0;
  padding: 0; }

body {

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
</style>
