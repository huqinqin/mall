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
        <button v-login>{{$t("main.index.mainInImmeLogin")}}</button>
        <a href='/account#/register'><button class="sign">{{$t("main.index.mainInFreeRegis")}}</button></a>
      </div>
    </div>
    <!-- poster -->
    <div class="poster">
      <div class="one" v-if="posterBig.content">
        <a :href="posterBig.content.link_url">
          <img :src="posterBig.content.fix_url" :alt="posterBig.name">
        </a>
      </div>
      <div class="two">
        <a  v-if="posterSmall.top" :href="posterSmall.top.content.link_url" class="top">
          <img :src="posterSmall.top.content.fix_url" :alt="posterSmall.top.name">
        </a>
        <a  v-if="posterSmall.bottom" :href="posterSmall.bottom.content.link_url" class="top">
          <img :src="posterSmall.bottom.content.fix_url" :alt="posterSmall.bottom.name">
        </a>
      </div>
    </div>
    <!-- main -->
    <div class="content">
      <div class="item-box">
        <div class="hot-item">
          <div class="item-list-title">
            <div class="i">
              <span>{{$t("main.index.mainInHotSingle")}}</span>
            </div>
          </div>
          <ul class="item-list-box">
            <li v-for="item in hotList" :key="item.sin"
                v-bind:class="{'limit':item.type == 4,'reduce':item.discount_type == 2,'discount':item.discount_type == 1}">
              <a :href="'/detail#/?id=' + item.id" target="_blank">
                <div class="img" :style="{backgroundImage : 'url(' + item.image_value + '!item_middle)'}"></div>
                  <!--:style="{backgroundImage : 'url(' + 'http://res.500mi.com/item/' + item.url + ')'}"></div>-->
                <div class="item-spec">
                  <p class="line-two" :title="item.item_name">{{item.item_name}}</p>
                  <p class="line-four"></p>
                  <div class="item-price">
                    <button v-ltsLoginShow:false v-login>
                      {{$t("main.detail.info.mainDetInfoLoginPrice")}}
                    </button>
                    <p v-ltsLoginShow:true class="price">
                      <lts-money :money="item.price"></lts-money>
                    </p>
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
                <a :href="itemlist.url">
                    <span>{{$t("main.detail.info.mainInMore")}}</span>
                    <i class="iconfont icon-shangyiye-copy-copy rotate"></i>
                </a>
            </div>
          </div>
          <ul class="item-list-box">
            <li v-for="item in itemlist.items" :key="item.sin"
                v-bind:class="{'limit':item.type == 4,'reduce':item.discount_type == 2,'discount':item.discount_type == 1,'newSeller': item.isNew}">
              <a target="_blank" :href="'/detail#/?id=' + item.id" >
                <div class="img"
                     :style="{backgroundImage : 'url(' + item.image_value + '!item_middle)'}"></div>
                <div class="item-spec">
                  <p class="line-two" :title="item.item_name">{{item.item_name}}</p>
                  <p class="line-four"></p>
                  <div class="item-price">
                    <button v-ltsLoginShow:false="(itemlist.attribute | 4) != itemlist.attribute" v-login>
                      {{$t("main.detail.info.mainDetInfoLoginPrice")}}
                    </button>
                    <p v-ltsLoginShow:true="(itemlist.attribute | 4) == itemlist.attribute" class="price">
                      <lts-money :money="item.price"></lts-money>
                    </p>
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
          <div class="i"><span>{{$t("main.index.mainInHotSingle")}}</span></div>
        </div>
        <ul class="best-sellers">
          <li v-for="item in hotList" :key="item.id"
              v-bind:class="{'limit':item.type == 4,'reduce':item.discount_type == 2,'discount':item.discount_type == 1,'newSeller': item.isNew}">
            <a :href="'/detail#/?id=' + item.id" target="_blank">
              <div class="img" :style="{backgroundImage : 'url(' + item.image_value +'!item_middle)'}"></div>
              <div class="item-spec">
                <p class="line-two" :title="item.item_name">{{item.item_name}}</p>
                <div class="item-price">
                  <button v-ltsLoginShow:false v-login>
                    {{$t("main.detail.info.mainDetInfoLoginPrice")}}
                  </button>
                  <p v-ltsLoginShow:true class="price">
                    <lts-money :money="item.price"></lts-money>
                  </p>
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
    name: 'index',
    data () {
      return {
        isAuto: false,
        index_banner: [],
        posterSmall: {},
        posterBig: {},
        index_welcome: [
          {
            link: 'static/image/BANNERTU.png',
            href: ''
          },
          {link: 'static/image/BANNERTU.png'},
          {link: 'static/image/BANNERTU.png'}
        ],
        itemList: [],
        hotList: []
      }
    },
    methods: {
      login () {
        this.$emit('showLogin', 2)
      },
      getList () {
        homeService.getList().then((data) => {
          this.itemList = data.floor.datalist
            this.itemList.forEach((item) => {
                item.items.forEach((val) => {
                    if(val.tag.indexOf('新品') != -1){
                        val.isNew = true
                    }
                })
            })
          this.hotList = data.hot_buys.datalist[0].items

          if(data.fix_pic && data.fix_pic.datalist.length > 0 && data.fix_pic.datalist[0] && data.fix_pic.datalist[0].content){
            data.fix_pic.datalist[0].content = JSON.parse(data.fix_pic.datalist[0].content)
            this.posterBig = data.fix_pic.datalist[0]
          }else{
            this.posterBig = {
              name:'error_picture',
              content: {
                link_url:'javascript:void(0)',
                fix_url:'http://ltsb2b.oss-us-west-1.aliyuncs.com/tmp/Retail%20Solution1.png'
              }
            }
          }

          if(data.fix_pic_right2 && data.fix_pic_right2.datalist.length > 0 && data.fix_pic_right2.datalist[0] && data.fix_pic_right2.datalist[0].content){
            data.fix_pic_right2.datalist[0].content = JSON.parse(data.fix_pic_right2.datalist[0].content)
            this.posterSmall.bottom = data.fix_pic_right2.datalist[0]
          }else{
            this.posterSmall.bottom = {
              name:'error_picture',
              content: {
                link_url:'javascript:void(0)',
                fix_url:'http://ltsb2b.oss-us-west-1.aliyuncs.com/tmp/Retail%20Solution1.png'
              }
            }
          }

          if(data.fix_pic_right1 && data.fix_pic_right1.datalist.length > 0 && data.fix_pic_right1.datalist[0] && data.fix_pic_right1.datalist[0].content){
            data.fix_pic_right1.datalist[0].content = JSON.parse(data.fix_pic_right1.datalist[0].content)
            this.posterSmall.top = data.fix_pic_right1.datalist[0]
          }else{
            this.posterSmall.top = {
              name:'error_picture',
              content: {
                link_url:'javascript:void(0)',
                fix_url:'http://ltsb2b.oss-us-west-1.aliyuncs.com/tmp/Retail%20Solution1.png'
              }
            }
          }

          if(data.banner){
            data.banner.datalist.forEach((val, index) => {
                if(val.link_url){

                }else{
                    val.link_url = 'javascript:void(0)',
                    val.banner_url = 'http://ltsb2b.oss-us-west-1.aliyuncs.com/tmp/Retail%20Solution1.png'
                }
              this.index_banner.push(JSON.parse(val.content))
            })
          }
        }, (msg) => {
          this.$ltsMessage.show({type: 'error', message: msg.error_message})
        })
      }
    },
    mounted () {
      this.getList()
    }
  }
</script>
<style src="@/assets/iconfont/iconfont.css"></style>
<style lang="less" scoped>
  li {
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
  }

  li.reduce::before,li.discount::before,li.limit::before,li.newSeller::before{
      content:'';
      width:100px;
      height: 100px;
      position: absolute;
      top: 0px;
      left: 0px;
      background-position: 0 0;
      background-repeat: no-repeat;
      background-size: 100px 100px;
  }
  li.newSeller::before{
      background-image:url('../../assets/img/new.png');
  }
  li.reduce::before{
      background-image:url('../../assets/img/ONSALE.png');
  }
  li.discount::before{
      background-image:url('../../assets/img/Discount.png');
  }
  li.limit::before{
      background-image:url('../../assets/img/Doorbuster.png');
  }

  .b1200 {
    .side {
      display: none;
    }
    .hot-item {
      display: block;
    }
    .item-box {
      li {
        margin-right: 13px;
      }
      li:nth-child(4n) {
        margin-right: 0;
      }
    }
  }

  .b1500 {
    .side {
      margin-left: 30px;
      display: block;
    }
    .hot-item {
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

  ._index {
    overflow: hidden;
    background-color: #eee;
    .banner {
      .img {
        width: 100%;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
        height: 500px;
      }
    }

    .publicity {
      height: 60px;
      background-color: #fff;
      margin: 12px 0;
      text-align: center;
      display: flex;
      justify-content: space-between;
      .welcome {
        margin-left: 24px;
        display: flex;
        h3 {
          font: 24px/60px "MicrosoftYaHei-Bold";
          font-weight: bold;
          color: rgba(0, 0, 0, 0.7);
          letter-spacing: 1px;
          display: inline;
        }
        .info {
          margin-top: 18px;
          font-size: 12px;
          color: rgba(0, 0, 0, 0.7);
          margin-left: 24px;
          text-align: left;
        }
        .tm {
          width: 9px;
          height: 5px;
          background: #ce2127;
          font: 6px/60px "MicrosoftYaHei";
          line-height: 60px;
          color: #000000;
        }
      }
      .login {
        margin-top: 12px;
        button {
          min-width: 120px;
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
        button:focus {
          outline: none;
        }
        .sign {
          border: solid 1px rgba(0, 0, 0, 0.5);
          background: #ffffff;
          color: rgba(0, 0, 0, 0.7);
          margin-left: 12px;
          margin-right: 24px;
        }
      }
    }

    .poster {
      height: 350px;
      display: flex;
      justify-content: space-between;
      margin: 12px 0 24px 0;
      .one {
        width: 895px;
        height: 350px;
        margin-right: 12px;
      }
      .two {
        width: 592px;
        height: 350px;
        .top {
          display: block;
          margin-bottom: 12px;
          height : 169px;
        }
      }
      img {
          width: 100%;
          height: 100%;
      }
    }
    .content {
      display: flex;
      justify-content: space-between;
      .item-box {
        flex: 1;
        .item-list-title {
          display: flex;
          justify-content: space-between;
          height: 50px;
          align-items: center;
          color: #707070;
          .i {
            position: relative;
            padding-left: 11px;
          }
          .i::before {
            content: '';
            width: 3px;
            height: 14px;
            background: #3b85ff;
            position: absolute;
            top: 5px;
            left: 0px;
          }
          .more {
            font-size: 14px;
          }
          span {
            letter-spacing: 1px;
          }
          .rotate:before {
            transform: rotateY(180deg);
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
            a{
                display: block;
            }
          }
          li:nth-child(4n) {
            margin-right: 0%;
          }
        }
      }
      .side {
        width: 260px;
        .title {
          margin-top: 14px;
          color: #737373;
          .i {
            position: relative;
            padding-left: 11px;
          }
          .i::before {
            content: '';
            width: 3px;
            height: 14px;
            background: #3b85ff;
            position: absolute;
            top: 5px;
            left: 0px;
          }
        }
        .best-sellers {
          margin-top: 15px;
          li {
            text-align: center;
            background: #ffffff;
            border-bottom: solid 1px #f2f2f2;
            margin-bottom: 12px;
            .img {
              height: 242px;
              background-position: center;
              background-size: 190px auto;
              background-repeat: no-repeat;

            }
          }

        }
      }
      li:hover {
        -webkit-box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        -webkit-transform: translate3d(0, -2px, 0);
        transform: translate3d(0, -2px, 0);
      }
      .item-level:last-child {
        margin-bottom: 20px;
      }
      li {
        transition: all ease .2s;
        .img {
          background-size: 190px auto;
          background-position: center center;
          height: 242px;
          background-repeat: no-repeat;
        }
        .item-spec {
          .line-one {
            display: inline-block;
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
          p {
            padding-left: 24px;
            padding-right: 24px;
          }
          .item-price {
            margin-top: 24px;
            margin-bottom: 24px;
            background-color: #ffffff;
            font-weight: bold;
            .price {
              color: #ff3b41;
            }
          }
          button {
            border: none;
            width: 60%;
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
