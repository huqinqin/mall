<template>
  <div class="finish">
    <!--<div class="mark"><p>{{ $t("main.cart.finish.mainCartFiSuccess") }}</p></div>-->
    <div class="result">
        <div class="resultSucc">
           <div class="iconSuccess iconfont icon-chenggong1"></div>
           <div class="content">
        <h3>{{ $t("main.cart.finish.mainCartFiPaySuccess") }}</h3>
        <p>{{ $t("main.cart.fail.mainCartFaOrderNum") }}：{{tid}}</p>
        <p>{{ $t("main.cart.fail.mainCartFaConsignee") }}：{{this.detailOrder.user_name}}
          {{this.detailOrder.receiver_mobile}}</p>
        <p :title="this.detailOrder.user_addr_detail">{{addr}}：{{this.detailOrder.user_addr_detail}}</p>
        <p>{{ $t("main.cart.fail.mainCartFaLogisticsMode") }}：{{method}}</p>
        <div class="button">
          <a :href="'/order?t=' + new Date().getTime() + '#/'" @click="toOrder">
            <button class="go"><span>{{ $t("main.cart.fail.mainCartFaMyOrder") }}</span></button>
          </a>
          <a href="/">
            <button class="back"><span>{{ $t("main.cart.fail.mainCartFaFirstPage") }}</span></button>
          </a>
        </div>
      </div>
        </div>
    </div>
    <div class="splitTotal">
        <div class="split" :style="{backgroundImage : 'url(' + img + ')'}"></div>
        <div class="word" style="">Now On Sale</div>
        <div class="split" :style="{backgroundImage : 'url(' + img1 + ')'}"></div>
    </div>
      <a href="/search/#/detail?cateId=%5B%5D&discountype=0"><div class="banner1" :style="{backgroundImage : 'url(' + img2 + ')'}"></div></a>
  </div>
</template>
<script>
  import detailOrder from '@/services/OrderService'
  import {store} from 'ltsutil'
  export default {
    name: 'finish',
    data () {
      return {
            img: require('../../../assets/img/splitL.png'),
            img1: require('../../../assets/img/splitR.png'),
            img2:require('../../../assets/img/banner0512.png'),
            tid: 0,
            detailOrder: {},
            method: this.$t('main.cart.beforePay.mainCartBefExpress'),
            addr:this.$t("main.cart.fail.mainCartFaReceivingAddress")
      }
    },
    methods: {
        toOrder(){
            store.setItem('selected', this.$t("common.ltsMenu.commLtsMyOrder"));
        },
      getTid () {
        this.tid = this.$route.params.tid
        console.log(this.tid)
        detailOrder.detailOrder(this.tid).then((data) => {
          this.detailOrder = data.data
          if (this.detailOrder.sell_order_list.length > 0 && this.detailOrder.sell_order_list[0].wholesale_order_items.length > 0 && this.detailOrder.sell_order_list[0].wholesale_order_items[0].s_h_s_m === true) {
              this.method = this.$t('main.cart.beforePay.mainCartBefExpress')
              this.addr =  this.$t("main.cart.fail.mainCartFaReceivingAddress")
          } else {
            this.method = this.$t('main.cart.fail.mainCartFaSince');
            this.addr = this.$t('main.cart.settle.mainCartSeZitiAdress')
          }
        }, (msg) => {
          this.$ltsMessage.show({type: 'error', message: msg.error_message})
        })
      }
    },
    mounted () {
      this.getTid()
      this.$emit('submit', 4)
    }
  }
</script>
<style lang="less">
  .finish {
    .mark {
      margin: 24px 0;
      width: 100%;
      height: 40px;
      background-color: rgba(0, 0, 0, 0.05);
      color: rgba(0, 0, 0, 0.7);
      line-height: 40px;
      font-size: 12px;
      p {
        margin-left: 24px;
      }
    }
    .result {
        width:100%;
        height:320px;
        background:rgba(248,248,248,1);
        display: flex;
        align-items: center;
        justify-content: center;
        .resultSucc{
            display: flex;
            align-items: flex-start;
            justify-content: center;
        }
      img {
        width: 237px;
        height: 216px;
      }
      .content {
        text-align: left;
        h3 {
          font-size: 36px;
          color: #f13a40;
          line-height: 50px;
        }
        p {
          line-height: 24px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.5);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .button {
          button {
            margin-top: 10px;
            border-radius: 4px;
            min-width: 100px;
            height: 30px;
            border: none;
            cursor: pointer;
            span {
              color: white;
              font-size: 14px;
              line-height: 29PX;
            }
          }
          button + button {
            margin-left: 12px;
          }
          button.go {
            background-color: #f13a40;
          }
          button.back {
            background-color: rgba(0, 0, 0, 0.5);
          }
        }
      }
      .iconSuccess{
          color: #67C23A;
          font-size: 80px;
          margin-right: 30px;
      }
    }
      .splitTotal{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          .split{
              width: 127px;
              height: 100px;
              background-repeat: no-repeat;
              background-position: center center;
          }
          .word{
              line-height: 100px;
              margin: 0 10px;
          }
      }
      .banner1 {
          width: 100%;
          height: 300px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          border: 1px solid #f6f6f6;
      }
  }
</style>
