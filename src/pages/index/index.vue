<template>
  <div class="_index">
     <!-- banner -->
    <div class="banner" v-if="index_banner.length > 0">
      <el-carousel height="500px" :autoplay=isAuto>
        <el-carousel-item v-for="banner in index_banner" :key="banner.banner_url" :autoplay="isAuto">
          <a :href="banner.link_url">
            <div class="img" :style="{backgroundImage : 'url(' + banner.banner_url +')'}"></div>
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- publicity -->
    <div class="publicity" v-ltsLoginShow:false>
        <div class="welcome">
            <h3>WELCOME TO LTS</h3>
            <div class="info">
              <p>Video Solutions For</p>
              <p>Security Professionals</p>
            </div>
        </div>
        <div class="login">
             <button v-login>立即登录</button>
             <button v-login class="sign" @click='signup'>免费注册</button>
        </div>
    </div>
    <!-- poster -->
    <div class="poster">
        <div class="one">
          <a href="">
              <img src="http://specimen.oss-cn-hangzhou.aliyuncs.com/tmp/menjin_html%201.png" alt="">
          </a>
        </div>
        <div class="two">
          <a href="" class="top">
              <img src="../../assets/img/jiatingSolution.png" alt="">
          </a>
          <a href="">
              <img src="../../assets/img/retailSolution.png" alt="">
          </a>
        </div>
    </div>
     <!-- main -->
    <div class="content">
        <div class="item-box">
            <div class="hot-item">
                <div class="item-list-title">
                    <div class="i">
                        <span>热卖单品</span>
                    </div>
                </div>
                <ul class="item-list-box">
                    <li  v-for="item in hotList" :key="item.sin">
                        <a :href="'/detail#/?id=' + item.id" target="_blank">
                            <div class="img" :style="{backgroundImage : 'url(' + 'http://res.500mi.com/item/'+item.url+')'}"></div>
                            <div class="item-spec">
                                <p class="line-two" :title="item.item_name">{{item.item_name}}</p>
                                <p class="line-four" ></p>
                                <div class="item-price">
                                    <button v-ltsLoginShow:false v-login>登录之后查看价格</button>
                                    <p v-ltsLoginShow:true class="price">${{item.price}}</p>
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
            <div v-for="itemlist in itemList" :key="itemlist.name" class="item-level">
              <div class="item-list-title">
                  <div class="i">
                      <span>{{itemlist.name}}</span>
                  </div>
                  <div class="more">
                      <span>更多</span>
                      <i class="iconfont icon-shangyiye-copy-copy rotate"></i>
                  </div>
              </div>
              <ul class="item-list-box">
                  <li  v-for="item in itemlist.items" :key="item.sin">
                      <a :href="'/detail#/?id=' + item.id" target="_blank">
                          <div class="img" :style="{backgroundImage : 'url(' + 'http://res.500mi.com/item/'+item.url+')'}"></div>
                          <div class="item-spec">
                              <p class="line-two" :title="item.item_name">{{item.item_name}}</p>
                              <p class="line-four" ></p>
                              <div class="item-price">
                                  <button v-ltsLoginShow:false v-login>登录之后查看价格</button>
                                  <p v-ltsLoginShow:true class="price">${{item.price}}</p>
                              </div>
                          </div>
                      </a>
                  </li>
              </ul>
            </div>
        </div>
        <!-- side -->
        <div class="side" v-if="hotList.length > 0">
              <div class="title">
                 <div class="i"><span>热卖单品</span></div>
              </div>
              <ul class="best-sellers">
                  <li v-for="item in hotList" :key="item.id">
                      <a :href="'/detail#/?id=' + item.id" target="_blank">
                          <div class="img" :style="{backgroundImage : 'url(' + item.image_value +')'}"></div>
                          <div class="item-spec">
                              <p class="line-two" :title="item.item_name">{{item.item_name}}</p>
                              <div class="item-price">
                                  <button v-ltsLoginShow:false>登录之后查看价格</button>
                                  <p v-ltsLoginShow:true class="price">${{item.price }}</p>
                              </div>
                          </div>
                      </a>
                  </li>
              </ul>
        </div>
    </div>
  </div>
</template>
<script>
import homeService from '@/services/HomeService.js'
  export default {
    name : 'index',
    mounted(){
        this.getList();
    },
    data(){
      return{
        isAuto:false,
        index_banner:[],
        index_welcome:[
          {
           link:"static/image/BANNERTU.png",
           href:""
          },
          {link:"static/image/BANNERTU.png"},
          {link:"static/image/BANNERTU.png"}
        ],
        itemList : [],
          hotList: [],
      }
    },
      methods:{
        login(){
            this.$emit('showLogin',2)
        },
        signup(){
        },
        getList(){
            // this.itemList = data.floor.datalist;
            // this.hotList = data.hot_buys.datalist[0].items;
            homeService.getList().then((data) => {
                this.itemList = data.floor.datalist;
                this.hotList = data.hot_buys.datalist[0].items;
                this.index_banner = data.banner.datalist;
            },(msg) => {
                console.log('error')
            })
        },
      },
      mounted(){
        this.getList()
      }
  }
</script>
<style src="@/assets/iconfont/iconfont.css"></style>
<style lang="less" scoped>

.b1200 {
    .side{
        display: none;
    }
    .hot-item{
        display: block;
    }
    .item-box{
        li{
            margin-right: 13px;
        }
        li:nth-child(4n){
            margin-right: 0;
        }
    }
}
.b1500{
    .side{
        margin-left: 30px;
        display: block;
    }
    .hot-item{
        display: none;
    }
    .item-box {
        li {
            margin-right: 16px;
        }
        li:nth-child(5n) {
            margin-right: 0;
        }
    }
}
._index{
    overflow: hidden;
    background-color: #eee;
    .banner{
        .img{
            height: auto;
            width:100%;
            background-size: cover;
            background-position: center center;
            background-repeat: no-repeat;
            height: 500px;
        }
    }

    .publicity{
        height: 60px;
        background-color:#fff;
        margin:12px 0;
        text-align: center;
        display: flex;
        justify-content: space-between;
        .welcome{
            margin-left: 24px;
            display: flex;
            h3{
                font:24px/60px "MicrosoftYaHei-Bold";
                font-weight: bold;
                color: rgba(0, 0, 0, 0.7);
                letter-spacing: 1px;
                display: inline;
            }
            .info{
                margin-top: 18px;
                font-size: 12px;
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
            margin-top: 12px;
            button{
                width: 120px;
                height: 36px;
                border-radius: 4px;
                font-size: 16px;
                box-shadow: none;
                font-weight: bold;
                color: #f13a40;
                border: none;
                background: #ededed;
                cursor: pointer;
            }
            button:focus{
                outline: none;
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

    .poster{
        height: 350px;
        display: flex;
        justify-content: space-between;
        margin: 12px 0 24px 0;
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
                color: #707070;
                .i{
                    position: relative;
                    padding-left: 11px;
                }
                .i::before{
                    content: '';
                    width: 3px;
                    height: 14px;
                    background: #3b85ff;
                    position: absolute;
                    top: 5px;
                    left: 0px;
                }
                .more{
                    font-size: 14px;
                }
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
                flex-wrap: wrap;
                li {
                    background-color: #ffffff;
                    text-align: center;
                    width: 290px;
                    margin-bottom: 12px;
                }
                li:nth-child(4n){
                    margin-right: 0%;
                }
            }
        }
        .side{
            width: 260px;
            .title{
                margin-top: 14px;
                color:#737373;
                .i{
                    position: relative;
                    padding-left: 11px;
                }
                .i::before{
                    content: '';
                    width: 3px;
                    height: 14px;
                    background: #3b85ff;
                    position: absolute;
                    top: 5px;
                    left: 0px;
                }
            }
            .best-sellers{
                margin-top: 15px;
                li{
                    text-align: center;
                    background: #ffffff;
                    border-bottom: solid 1px #f2f2f2;
                    margin-bottom: 12px;
                    .img{
                        height: 242px;
                        background-position: center;
                        background-size: contain;
                    }
                }

            }
        }
        li:hover{
            -webkit-box-shadow: 0 15px 30px rgba(0,0,0,0.1);
            box-shadow: 0 15px 30px rgba(0,0,0,0.1);
            -webkit-transform: translate3d(0, -2px, 0);
            transform: translate3d(0, -2px, 0);
        }
        .item-level:last-child{
            margin-bottom: 20px;
        }
        li{
            transition: all ease .2s;
            .img{
                background-size: cover;
                background-position: center center;
                height: 242px;
            }
            .item-spec{
                .line-one {
                    display:inline-block;
                    height: 19px;
                    font-weight: bold;
                    font-size: 16px;
                    color: #707070;
                }
                .line-two {
                    margin: 12px 0;
                    font-size: 14px;
                    color: #a3a3a3;
                    line-height: 18px;
                    height: 54px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                }
                .line-three {
                    margin: 12px 0 24px;
                    font-size: 14px;
                    color: #a3a3a3;
                }
                .line-four {
                    border-top: 1px solid #f2f2f2;
                    margin: 0 12px;
                }
                p{
                    padding-left: 24px;
                    padding-right: 24px;
                }
                .item-price{
                    margin-top:24px;
                    margin-bottom: 24px;
                    background-color: #ffffff;
                    font-weight: bold;
                    .price{
                        color: #ff3b41;
                    }
                }
                button {
                    border: none;
                    width:60%;
                    height: 26px;
                    font-weight: bold;
                    font-size: 12px;
                    color: #ff3b41;
                    box-shadow: 0px 2px 15px 2px #e9e9e9;
                }
            }
        }

    }

}

</style>
