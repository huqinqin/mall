<template>
    <div class="_index">
        <!-- banner -->
        <div class="banner" :style="{backgroundImage : 'url(' + img + ')'}"></div>
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
                <a :href="'/account?t=' + new Date().getTime() +'#/register'">
                    <button class="sign">{{$t("main.index.mainInFreeRegis")}}</button>
                </a>
            </div>
        </div>
        <!-- poster -->
        <!-- main -->
        <div class="content">
            <div class="item-box">
                <div v-for="(itemlist,index) in itemList" :key="itemlist.name" class="item-level" :id="index"
                     v-if="itemList.length > 0">
                    <a :href="itemlist.url">
                        <div class="item-list-title">
                            <div class="i">
                                <span class="border"></span>
                                <span>{{itemlist.name}}</span>
                            </div>
                        </div>
                    </a>
                    <ul class="item-list-box">
                        <li v-for="item in itemlist.items" :key="item.id" v-if="itemlist.items.length > 0"
                            v-bind:class="{'limit':item.type == 4,'reduce':item.discount_type == 2,'discount':item.discount_type == 1,'flashSale':item.discount_type == 0,'newSeller': item.isNew}">
                            <a :href="'/detail?t=' + new Date().getTime() +'#/info?id=' + item.id" target="_blank">
                                <!--<a :href="'/detail#/?id=' + item.id" target="_blank">-->
                                <!--<div @click="href(item.id)" >-->
                                <div class="img"
                                     :style="{backgroundImage : 'url(' + item.image_value + '!item_middle)'}"></div>
                                <div class="item-spec">
                                    <p class="line-two" :title="item.item_name"><span class="coupon">COUPON</span>{{item.item_name}}
                                    </p>
                                    <p class="line-four"></p>
                                    <div class="item-price">
                                        <button v-ltsLoginShow:false="(itemlist.attribute | 4) != itemlist.attribute"
                                                v-login class="login">
                                            {{$t("main.detail.info.mainDetInfoLoginPrice")}}
                                        </button>
                                        <p v-ltsLoginShow:true="(itemlist.attribute | 4) == itemlist.attribute"
                                           class="price">
                                            <span class="realPrice">
                                              <template v-if="item.discount_type == 1">
                                                  <lts-money :money="item.price * item.discount / 100"></lts-money>
                                              </template>
                                              <template v-else-if="item.discount_type == 2">
                                                  <lts-money :money="item.price - item.discount"></lts-money>
                                              </template>
                                              <template v-else-if="item.discount_type == 4">
                                                  <lts-money :money="JSON.parse(item.sale_rule).price"></lts-money>
                                              </template>
                                              <template v-else>
                                                  <lts-money :money="item.price_real"></lts-money>
                                              </template>
                                          </span>
                                          <span class="oldPrice">
                                              <template v-if="item.discount_type != 0 ||  item.price != item.price_real">
                                                  <lts-money :money="item.price"></lts-money>
                                              </template>
                                          </span>
                                        </p>
                                    </div>
                                </div>
                                <!--</div>-->
                            </a>
                            <button class="iconfont" v-ltsLoginShow:true @click="addCart(item)"
                                    :class="item.flag ? 'icon-chenggong1 cart1':'icon-gouwuche2 cart'"></button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <ul class="moreIcon">
            <li>
                <div class="img2"><img :src=img3 alt=""></div>
                <p>Credit Card Checkout</p></li>
            <li>
                <div style="margin: 10px auto;height: 40px;font-weight: bold;line-height: 40px">30-DAY</div>
                <p>Return Guarantee</p></li>
            <li>
                <div class="img2"><img :src=img4 alt=""></div>
                <p>Free IP Consulting</p></li>
            <li>
                <div class="img2"><img :src=img2 alt=""></div>
                <p>Up to 3 Year Warranty</p></li>
        </ul>
    </div>
</template>
<script>
    import homeService from '@/services/HomeService.js'
    import ItemService from '@/services/ItemService.js'
    import {floorNum} from '@/const/floorNumConst.js';
    import cartService from '@/services/CartService'
    import $ from 'jquery'

    export default {
        data() {
            return {
                img: require('../../../assets/img/banner0523.png'),
                img2: require('../../../assets/img/icon.png'),
                img3: require('../../../assets/img/card.png'),
                img4: require('../../../assets/img/music.png'),
                isAuto: true,
                showDownload: false,
                appDown: require('@/assets/img/download.png'),
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
            addCart(val) {
                ItemService.getItemDetail(val.id).then((item) => {
                    let props = item.data.item.item_struct_props;
                    for (var i = 0; i < props.length; i++) {
                        if (props[i].sku === true && props[i].storage > 0) {
                            val.flag = true;
                            break;
                        }
                    }
                    val.num = 1;
                    console.log(this.itemList);
                    cartService.putCartPlus(val, props[i]).then((data) => {
                        val.flag = true;
                        this.selfContext.$emit('addCartSuccess');
                        this.$ltsMessage.show({type: 'success', message: 'Successfully added to your shopping cart'});
                        }, (msg) => {
                        this.$ltsMessage.show({type: 'error', message: msg.error_message})
                    })
                });
            },
            login() {
                this.$emit('showLogin', 2)
            },
            href(id) {
                let winOpen = window.open("", "_blank"); //首先打开一个新页面
                winOpen.location = "/detail#/info/?id=" + id;
            },
            getList11() {
                let params = {
                    ids: '10185,10072,10198,10202,10023,10152,10033,10001,10064,10168,10207,10246,10100,10199,10189,' +
                    '10230,10217,10250,10254,10247,10249,10222,11432,10244,10213,10237,11433,10245,10203,10225,11638' +
                    '10060,10034,10029,10017,10079,10123,10039,10084,10067,10070,10063,10068,10117,10036,10401,10156' +
                    '10399,10153,10143,10398,10140,10138,10146,10169,11756,10814,10400,10134,10813,10065,10094,10062' +
                    '10279,10058,10273,10305,10276,10048,10083,10302,10066,10274,10789,10085,10234,10232,10219,10024' +
                    '10026,10028,10791,10022,10224,10221,10226,10216,10229,10796,10801,10780,11756,11756,10853,11437' +
                    '10777,11132,10886,10776,11056,10895,10899,10906,11136'
                };
                ItemService.getActivityItemList(params).then((data) => {
                    data.datalist.forEach( (item) => {
                        item.flag = false;
                    })
                    let floor = data.datalist.length / floorNum;
                    let arr = ["IP Camera", "NVR", "HD-TVI Camera", "DVR", "Accessories", "Access Control", "Alarm"]
                    let j = 0;
                    for (var i = 0; i < arr.length; i++) {
                        let obj = {};
                        obj.name = arr[i];
                        obj.items = [];
                        this.itemList.push(obj)
                    }
                    for (var i = 0; i < data.datalist.length; i+=15){
                        if( i%15 === 0){
                            j = i/15;
                        }
                        this.itemList[j].items.push(...(data.datalist.slice(i,i+15)));
                    }
                }, (msg) => {
                    this.$ltsMessage.show({type: 'error', message: msg.error_message})
                });
                console.log(this.itemList);
            }
        },
        mounted() {
            $("html").attr('class', 'gray')
            this.level = window.localStorage.getItem('userLevel')
            this.getList11()
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

    li.reduce::before, li.discount::before, li.limit::before, li.newSeller::before, li.flashSale::before {
        content: '';
        width: 100px;
        height: 100px;
        position: absolute;
        top: 0px;
        left: 0px;
        background-position: 0 0;
        background-repeat: no-repeat;
        background-size: 100px 100px;
    }

    li.newSeller::before {
        background-image: url('../../../assets/img/new.png');
    }

    /*li.reduce::before{
        background-image:url('../../../assets/img/ONSALE.png');
    }*/
    /*li.discount::before{
        background-image:url('../../../assets/img/Discount.png');
    }*/
    /*li.limit::before{
        background-image:url('../../../assets/img/Doorbuster.png');
    }*/
    li.flashSale::before {
        top: 12px;
        left: 12px;
        width: 50px;
        height: 50px;
        background-size: 100% 100%;
        background-image: url('../../../assets/img/flashSale.png');
    }
    button{
        outline: none;
    }

    .b1200 {
        .side {
            display: none;
        }
        .slider {
            height: 400px;
            .img {
                height: 400px;
            }
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
        .slider {
            height: 500px;
            .img {
                height: 500px;
            }
        }
        .hot-item {
            display: none;
        }
        .item-box {
            li {
                margin-right: 12px;
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
            height: 500px;
            background-size: 100% 100%;
            /*.img {
                width: 100%;
                background-size: contain;
                background-position: center center;
                background-repeat: no-repeat;
                !*height: 500px;*!
            }*/
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
                    height: 169px;
                }
                .app {
                    position: relative;
                    height: 169px;
                    margin-bottom: 12px;
                    background-size: 100% 169px;
                    background-repeat: no-repeat;
                    .wrapper {
                        position: absolute;
                        display: flex;
                        justify-content: space-between;
                        top: 70%;
                        left: 19%;
                        width: 40%;
                        a {
                            display: block;
                        }
                        img {
                            width: 76px;
                            height: 26px;
                        }
                    }
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
                        padding-left: 11px;
                        display: flex;
                        align-items: center;
                        span.border {
                            display: block;
                            width: 3px;
                            height: 14px;
                            background: #3b85ff;
                        }
                        span:last-child {
                            display: block;
                            margin-left: 12px;
                        }
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
                        transition: all .2s ease;
                        width: 290px;
                        overflow: hidden;
                        text-align: left;
                        border: 1px solid #f2f2f2;
                        margin-bottom: 12px;
                        position: relative;
                        a {
                            display: block;
                        }
                    }
                   /* li:nth-child(4n) {
                        margin-right: 0%;
                    }*/
                    .coupon {
                        width: 79px;
                        height: 24px;
                        background-color: #FFA000;
                        padding: 2px;
                        line-height: 24px;
                        display: inline-block;
                        box-sizing: border-box;
                        font-size: 14px;
                        text-align: center;
                        margin-right: 2px;
                        font-weight: bold;
                        color: #000;
                    }
                    .cart1 {
                        position: absolute;
                        right: 8px;
                        bottom: 22px;
                        font-size: 24px;
                        color: #f2ac31;
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        border: 1px solid white;
                        background-color: white;
                        cursor: pointer;
                    }
                    .cart {
                        position: absolute;
                        right: 8px;
                        bottom: 22px;
                        font-size: 16px;
                        color: #FF3B41;
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        border: 1px solid #FF3B41;
                        line-height: 30px;
                        background-color: white;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                    }
                }
            }
            .side {
                width: 260px;
                .title {
                    margin-top: 14px;
                    color: #737373;
                    .i {
                        display: flex;
                        align-items: center;
                        padding-left: 11px;
                        span.border {
                            display: block;
                            width: 3px;
                            height: 14px;
                            background: #3b85ff;
                        }
                        span:last-child {
                            display: block;
                            margin-left: 12px;
                        }
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
                            position: relative;
                            .oldPrice {
                                font-size: 14px;
                                position: absolute;
                                top: 2px;
                                text-decoration: line-through;
                                color: #a3a3a3;
                            }
                        }
                    }
                    button {
                        border: none;
                        width: 60%;
                        height: 26px;
                        font-weight: bold;
                        font-size: 12px;
                        color: #ff3b41;
                        background: #fff;
                        box-shadow: 0px 2px 15px 2px #ebebeb;
                    }
                }
            }

        }
        .moreIcon {
            width: 100%;
            display: flex;
            align-items: center;
            height: 90px;
            margin-top: 12px;
            background-color: white;
            li {
                flex: 1;
                color: #D31927;
                text-align: center;
                height: 100%;
                div {
                    font-size: 24px;
                }
            ;
                p {
                    color: #000;
                    font-size: 14px;
                }
            }
        }
        .img2 {
            width: 40px;
            height: 40px;
            margin: 10px auto;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }

</style>
