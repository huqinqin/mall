<template>
  <div class="_index">
     <!-- banner -->
    <div class="banner">
      <el-carousel height="500px">
        <el-carousel-item v-for="banner in index_banner" :key="banner.banner_url">
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
            <div v-for="itemlist in itemList" :key="itemlist.name">
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
                      <div class="img" :style="{backgroundImage : 'url(' + 'http://res.500mi.com/item/'+item.url+')'}"></div>
                      <div class="item-spec">
                          <p class="line-one">{{item.brand}}</p>
                          <p class="line-two">{{item.item_name}}</p>
                          <p class="line-three">{{item.promotion_title}}</p>
                          <p class="line-four" ></p>
                          <div class="item-price">
                             <button v-ltsLoginShow:false>登录之后查看价格</button>
                             <p v-ltsLoginShow:true class="price">${{item.price }}</p>
                          </div>
                      </div>
                  </li>
              </ul>
            </div>
        </div>
        <!-- side -->
        <div class="side">
              <div class="title">
                 <div class="i"><span>热卖单品</span></div>
              </div>
              <ul class="best-sellers">
                  <li v-for="item in hotList" :key="item.id">
                      <div class="img" :style="{backgroundImage : 'url(' + item.image_value +')'}"></div>
                      <div class="item-spec">
                          <p class="line-one">{{item.brand}}</p>
                          <p class="line-two">{{item.item_name}}</p>
                          <p class="line-three">{{item.promotion_title}}</p>
                          <p class="line-four"></p>
                          <div class="item-price">
                              <button v-ltsLoginShow:false>登录之后查看价格</button>
                              <p v-ltsLoginShow:true class="price">${{item.price }}</p>
                          </div>
                      </div>
                  </li>
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


._index{
    overflow: hidden;
    background-color: #eee;
    .banner{
        .img{
            height: auto;
            width:100%;
            background-size: cover;
            background-position: center;
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
            margin-right: 30px;
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
                    content:'';
                    width:3px;
                    height: 14px;
                    background: #3b85ff;
                    position: absolute;
                    top:5px;
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
                justify-content: space-between;
                flex-wrap: wrap;
                li {
                    // box-sizing: border-box;
                    background-color: #ffffff;
                    text-align: center;
                    min-width: 200px;
                    width: 24%;
                    margin-bottom: 12px;

                }
            }
        }
        .side{
            width: 290px;
            .title{
                margin-top: 14px;
                color:#737373;
            }
            .best-sellers{
                margin-top: 15px;
                background: #fff;
                li{
                    text-align: center;
                    background: #ffffff;
                    border-bottom: solid 1px #f2f2f2;
                    margin: 0 24px;
                    .img{
                        width:242px;
                        height: 242px;
                        background-position: center;
                        background-size: cover;
                    }
                }
                li::after{
                    content:'';
                    width:260px;
                    height: 1px;
                    background: #f2f2f2;
                    position: absolute;
                    top:100%;
                    left:15px;
                }
            }
        }
        li{
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
                }
                .line-three {
                    margin: 12px 0 24px;
                    font-size: 14px;
                    color: #a3a3a3;
                }
                .line-four {
                    width: 266px;
                    border-top: 1px solid #f2f2f2;
                    margin: 0 auto;
                }
                p{
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    padding-left: 24px;
                    padding-right: 24px;
                }
                .item-price{
                    margin-top:24px;
                    margin-bottom: 24px;
                    background-color: #ffffff;
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
