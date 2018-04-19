<template>
    <div class="search">
        <div class="banner" :style="{backgroundImage : 'url(' + img + ')'}"></div>
        <div class="navBar11">
            <p class="navBarSave">Save 50% on selected items</p>
            <p class="navBarDate"><span class="navBarDate1">This round starts in:</span><span class="timeBorder time0">04<span>D</span></span><span class="timeBorder time1">04</span><span>:</span><span class="timeBorder time2">04</span><span>:</span><span class="timeBorder time3">04</span></p>
        </div>
        <div class="content" v-if="data.length > 0">
            <div class="search-result">
                <ul class="result">
                    <li v-for="item in data" :key="item.id" class="fiveDis">
                        <div>
                            <a :href="'/detail?t=' + new Date().getTime() +'#/info?id=' + item.id" target="_blank">
                                <div class="img" :style="{backgroundImage : 'url(' + item.image_value + '!item_middle)'}" :class="checkedSpu1.storage > 0? '' : 'error1'"></div>
                                <p class="name" :title="item.item_name">{{item.item_name}}</p>
                                <div class="item-price">
                                    <button v-ltsLoginShow:false v-login>{{$t("main.search.mainSeaLogin")}}</button>
                                    <!--<p class="price" v-ltsLoginShow:true v-if="item.activity_price">-->
                                    <!--<lts-money :money="item.activity_price"></lts-money>-->
                                    <!--</p>-->
                                    <p class="price" v-ltsLoginShow:true>
                                    <span class="realPrice" v-if="item.item_props[0] && item.item_props[0].price_real > 0">
                                        <template v-if="item.discount_type ==1">
                                            <lts-money :money="item.item_props[0].price_real"></lts-money>
                                        </template>
                                        <template v-else-if="item.discount_type ==2">
                                            <lts-money :money="item.price - item.discount"></lts-money>
                                        </template>
                                        <template v-else-if="item.discount_type ==4">
                                            <lts-money :money="item.sale_rule_do.price"></lts-money>
                                        </template>
                                        <template v-else>
                                            <lts-money :money="item.item_props[0].price_real"></lts-money>
                                        </template>
                                    </span>
                                    <span class="realPrice" v-else>
                                        <template v-if="item.discount_type ==1">
                                            <lts-money :money="item.price_real"></lts-money>
                                        </template>
                                        <template v-else-if="item.discount_type ==2">
                                            <lts-money :money="item.price - item.discount"></lts-money>
                                        </template>
                                        <template v-else-if="item.discount_type ==4">
                                            <lts-money :money="item.sale_rule_do.price"></lts-money>
                                        </template>
                                        <template v-else>
                                            <lts-money :money="item.price_real"></lts-money>
                                        </template>
                                    </span>
                                    <span class="oldPrice" v-if="item.item_props[0] &&item.item_props[0].price > 0">
                                        <template v-if="item.discount_type != 0">
                                            <lts-money :money="item.item_props[0].price"></lts-money>
                                        </template>
                                    </span>
                                    <span class="oldPrice" v-else>
                                        <template v-if="item.discount_type != 0">
                                            <lts-money :money="item.price"></lts-money>
                                        </template>
                                    </span>
                                    </p>
                                </div>
                            </a>
                            <button class="iconfont" v-ltsLoginShow:true @click="addCart(item,item.item_props[0])" v-if="item.item_props[0]&&checkedSpu1.storage > 0" :class="item.flag ? 'icon-chenggong1 cart1':'icon-gouwuche-copy cart'"></button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="navBar11" style="background-color: #F2AC31">
            <p class="navBarSave">Save <span style="color: #D82929">$50</span>for every <span style="color: #D82929">$500</span>purchase on frequently bought together items</p>
            <p class="navBarDate"><span class="navBarDate1">This round starts in:</span><span class="timeBorder timeBorder1 time0">04</span><span class="timeBorder timeBorder1 time1">04</span><span>:</span><span class="timeBorder timeBorder1 time2">04</span><span>:</span><span class="timeBorder timeBorder1 time3">04</span></p>
        </div>
        <div class="content" v-if="data.length > 0">
            <div class="search-result">
                <ul class="result">
                    <li v-for="item in data1" :key="item.id" class="fiveMan">
                        <div>
                           <a :href="'/detail?t=' + new Date().getTime() +'#/info?id=' + item.id" target="_blank">
                            <div class="img" :style="{backgroundImage : 'url(' + item.image_value + '!item_middle)'}" :class="checkedSpu2.storage > 0? '' : 'error1'"></div>
                            <p class="name" :title="item.item_name">{{item.item_name}}</p>
                            <div class="item-price">
                                <button v-ltsLoginShow:false v-login>{{$t("main.search.mainSeaLogin")}}</button>
                                <!--<p class="price" v-ltsLoginShow:true v-if="item.activity_price">-->
                                <!--<lts-money :money="item.activity_price"></lts-money>-->
                                <!--</p>-->
                                <p class="price" v-ltsLoginShow:true>
                                    <span class="realPrice" v-if="item.item_props[0].price_real > 0">
                                        <template v-if="item.discount_type ==1">
                                            <lts-money :money="item.item_props[0].price_real"></lts-money>
                                        </template>
                                        <template v-else-if="item.discount_type ==2">
                                            <lts-money :money="item.price - item.discount"></lts-money>
                                        </template>
                                        <template v-else-if="item.discount_type ==4">
                                            <lts-money :money="item.sale_rule_do.price"></lts-money>
                                        </template>
                                        <template v-else>
                                            <lts-money :money="item.item_props[0].price_real"></lts-money>
                                        </template>
                                    </span>
                                    <span class="oldPrice" v-if="item.item_props[0].price > 0">
                                        <template v-if="item.discount_type != 0">
                                            <lts-money :money="item.item_props[0].price"></lts-money>
                                        </template>
                                    </span>
                                </p>
                            </div>
                        </a>
                           <button class="iconfont icon-gouwuche-copy" v-ltsLoginShow:true  @click="addCart(item,item.item_props[0])" v-if="item.item_props[0]&&checkedSpu2.storage > 0" :class="item.flag ? 'icon-chenggong1 cart1':'icon-gouwuche-copy cart'"></button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div v-else-if="data.length <= 0 && isLoadEnding" class="error">
            <div :style="{backgroundImage: 'url('+errorImg+')'}">
            </div>
        </div>
        <ul class="moreIcon">
            <li><div class="img2"><img :src= img3 alt=""></div><p>Credit Card Checkout</p></li>
            <li><div style="margin: 10px auto;">30-DAY</div><p>Return Guarantee</p></li>
            <li><div class="img2"><img :src= img4 alt=""></div><p>Free IP Consulting</p></li>
            <li><div class="img2"><img :src= img2 alt=""></div><p>Up to 3 Year Warranty</p></li>
        </ul>
        <a href="/search/#/detail?cateId=%5B%5D&discountype=0"><div class="banner1" :style="{backgroundImage : 'url(' + img1 + ')'}"></div></a>
        <el-dialog
            title="Tooltip"
            :close-on-click-modal="false"
            :visible.sync="centerDialogVisible"
            @close="backPage"
            width="30%"
            center>
            <span style="text-align: center">Ugh oh. You are here too late. This offer is already over.</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false"><a href="/">Back to Home Page</a></el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import $ from 'jquery'
    import ItemService from '@/services/ItemService'
    import TimeService from '@/services/TimeService'
    import cartService from '@/services/CartService'
    export default {
        name: "activity",
        data(){
            return{
                img:require('../../../assets/img/newbanner.png'),
                img1:require('../../../assets/img/saleall.png'),
                img2:require('../../../assets/img/icon.png'),
                img3:require('../../../assets/img/card.png'),
                img4:require('../../../assets/img/music.png'),
                soldout:require('../../../assets/img/soldout.png'),
                activeLi: '',
                activeOrderBy: '',
                selectedItem: '',
                minItem: 3,
                tag:[],
                showRange: false,
                condition: [],
                activeItem: this.$t("main.search.mainSeaCompre"),
                priceDesc: false,
                cdateDesc: false,
                search:{
                    condition:[],
                    text:'',
                    page:1,
                    pageSize:20,
                    totalPage:1,
                    cateId:'',
                    itemName:'',
                    brand:'',
                    puserId:'',
                    attribute_1:'',
                    discountType:'',
                    allStatus:'',
                    sin:'',
                    propValues:'',
                    orderBy:''
                },
                tags: [],
                data:[],
                data1:[],
                rightTotal : 0,
                closeProps : false,
                errorImg : require('@/assets/img/error.png'),
                isLoadEnding : false,
                conditions:{},
                checkedSpu2:{},
                checkedSpu1:{},
                centerDialogVisible: false
            }

        },
        mounted(){
            $("html").attr('class','gray !important');
            this.timeService();
            /*this.getTimeService();*/
            this.getList();
            this.tags = this.$route.query.tags ? this.$route.query.tags.split(',') : [];
        },
        methods: {
            backPage(){
                location.href = '/'
            },
             addCart(item, spu) {
                cartService.putCartPlus(item, spu).then((data) => {
                    item.flag = true;
                    this.selfContext.$emit('addCartSuccess');
                    this.$ltsMessage.show({type:'success',message:'Successfully added to your shopping cart'});
                }, (msg) => {
                    this.$ltsMessage.show({type: 'error', message: msg.error_message})
                })
            },
             add0(m){return m<10?'0'+m:m },
             formatDate(needTime) {
                 var leftTime =   needTime /1000;
                 leftTime = leftTime & leftTime
                 var d = leftTime/60/60/24;
                 d = d & d;
                 leftTime = leftTime - d * 60 * 60 *24;
                 var h = leftTime/60/60;
                 h = h & h;
                 leftTime = leftTime - h * 60 * 60;
                 var mm = leftTime / 60 ;
                 mm =  mm & mm;
                 leftTime = leftTime - mm * 60 ;
                 var s = leftTime;
                  document.getElementsByClassName("time0")[0].innerHTML = this.add0(d) + "D"
                  document.getElementsByClassName("time1")[0].innerHTML = this.add0(h);
                  document.getElementsByClassName("time2")[0].innerHTML = this.add0(mm);
                  document.getElementsByClassName("time3")[0].innerHTML = this.add0(s);
                  document.getElementsByClassName("time0")[1].innerHTML = this.add0(d) + "D";
                  document.getElementsByClassName("time1")[1].innerHTML = this.add0(h);
                  document.getElementsByClassName("time2")[1].innerHTML = this.add0(mm);
                  document.getElementsByClassName("time3")[1].innerHTML = this.add0(s);
                },
             timeService(){
                TimeService.getTimeAndZone().then((data) =>{
                    let date = new Date(data.current_time);
                    let UCurrentTime = date.getTime();
                    let time = '2018-04-20 00:00:00'
                    TimeService.getUtcTime(time).then((data) =>{
                        let date = new Date(data.time);
                        let deadTime = date.getTime();
                        let diff = deadTime - UCurrentTime;
                        if(diff > 0){
                            var timer;
                            timer = setInterval(() =>{
                                diff = diff - 1000;
                                if(diff <= 0){window.clearInterval(timer);location.reload();}
                                this.formatDate(diff);
                            },1000);
                        }else{
                            window.clearInterval(timer);
                            this.timeService1();
                            $('.navBarDate1').html("This round ends in:");
                        }
                    })
                })
            },
            timeService1(){
                TimeService.getTimeAndZone().then((data) =>{
                    let date1 = new Date(data.current_time);
                    let UCurrentTime1 = date1.getTime();
                    let time1 = '2018-04-21 00:00:00'
                    TimeService.getUtcTime(time1).then((data) =>{
                        let date1 = new Date(data.time);
                        let deadTime1 = date1.getTime();
                        let diff1 = deadTime1 - UCurrentTime1;
                        if(diff1 > 0){
                            var timer1;
                            timer1 = setInterval(() =>{
                                diff1 = diff1 - 1000;
                                if(diff1 <= 0){window.clearInterval(timer1);location.reload();this.centerDialogVisible = true;}
                                this.formatDate(diff1);
                            },1000);
                        }else{
                            window.clearInterval(timer1);
                            this.centerDialogVisible = true;
                        }
                    })
                })
            },
            getList(){
                let tags = ['5折','关联商品'];
                let search = {
                    page: this.search.page,
                    pageSize: this.search.pageSize,
                    orderBy: 'cdate desc'
                }
                ItemService.searchList(search,tags).then((resp) => {
                    resp.data.item_d_o_list.forEach((item) => {
                        item.flag = false;
                        if(item.tag == "5折"){
                            this.data.push(item);
                            item.item_props = []
                            item.item_struct_props.every((value) => {
                                if(value.sku && value.storage > 0){
                                    this.flag = false;
                                    item.item_props.push(value);
                                    item.spu_id = value.spu_id;
                                    item.num = 1;
                                    this.checkedSpu1 = value;
                                    return false;
                                }
                            })
                        }else if(item.tag == "关联商品"){
                            this.data1.push(item);
                            item.item_props = []
                            item.item_struct_props.every((value) => {
                                if(value.sku && value.storage > 0){
                                    this.flag = false;
                                    item.item_props.push(value);
                                    item.spu_id = value.spu_id;
                                    item.num = 1;
                                    this.checkedSpu2 = value;
                                    return false;
                                }
                            })
                        }
                    });
                    console.log(this.data1);
                })
            },
            changePage(currentPage){
                this.search.page = currentPage;
                /*this.searchWithText()*/
            },
            // 上下一页
            prePage(){
                this.search.page--
            },
            nextPage(){
                this.search.page++
            },
        }
    }
</script>

<style lang="less">
    .b1200 .search-result{
        li{
            margin-right: 10px;
        }
        li:nth-child(4n){
            margin-right: 0;
        }
    }
    .b1500 .search-result{
        li{
            margin-right: 10px;
        }
        li:nth-child(5n){
            margin-right: 0;
        }
    }
    .search{
        background-color: #eee;
        font-family: "Microsoft YaHei";
        *{
            box-sizing: border-box;
        }
        min-width: 1200px;
        li{
            box-sizing: border-box;
            position: relative;
            overflow: hidden;
            background-color: white;
        }
        .moreIcon{
            width: 100%;
            display: flex;
            align-items: center;
            height: 90px;
            margin-top: 12px;
            li{
                flex: 1;
                color:#D31927;
                text-align: center;
                height: 100%;
                div{
                    font-size: 24px;
                };
                p{
                    color: #000;
                    font-size: 14px;
                }
            }
        }
        button{
            cursor:pointer;
        }
        button:focus{
            outline: none;
        }
        overflow: hidden;
        ul{
            display: flex;
        }
        .nav {
            display: flex;
            justify-content: flex-start;
            .el-breadcrumb {
                margin-top: 4px;
                span{
                    color:#777;
                    font-size: 16px;
                    font-weight: normal;
                    i{
                        margin:0;
                    }
                }
            }
            .tags{
                margin-left: 12px;
                .el-tag{
                    border:1px solid #ff3b41;
                    height: 20px;
                    line-height: 18px;
                    background: #fff;
                    color: #ff3b41;
                    margin-right: 10px;
                    border-radius: 0;
                    i:hover{
                        color: #ff3b41;
                    }
                }
                .el-tag__close:hover{
                    background-color: transparent;
                }
            }
        }
        .shown{
            .condition{
                max-height: 2000px !important;
            }
        }
        .condition{
            width:100%;
            max-height: 108px;
            margin-top: 34px;
            display:inline-block;
            transition: all ease .5s;
            overflow: hidden;
            border: solid 1px #e0e0e0;
            .el-form{
                border:1px solid #e3e3e3;
            }
            .el-form-item:last-child{
                border-bottom:none;
            }
            .el-form-item{
                height: 36px;
                overflow: hidden;
                position: relative;
                border-bottom: 1px dashed #e3e3e3;
                margin-bottom: 0;
                padding-left: 50px;
                label{
                    line-height: 36px;
                    overflow: hidden;
                }
                label::after{
                    content:':';
                }
                ul{
                    width:80%;
                    display: flex;
                    flex-wrap: wrap;
                    li{
                        color:#ff3b41;
                        font-size: 14px;
                        line-height: 36px;
                        margin-right: 12px;
                        cursor:pointer;
                    }
                    li:hover{
                        color: #ff3b41;
                    }
                }
                .buttons{
                    position: absolute;
                    z-index: 20;
                    right: 97px;
                    top:-3px;
                    color:#777;
                    font-size: 12px;
                    cursor: pointer;
                    button{
                        width: 62px;
                        height: 26px;
                        background: #fff;
                        border:1px solid #777;
                        padding-left: 0;
                        color:#777;
                        cursor: pointer;
                    }
                    i{
                        position: absolute;
                        right:2px;
                        top:0;
                    }
                }
            }
            .el-form-item.showAll{
                height:auto;
                overflow: visible;
                .el-form-item{
                    min-height: 36px;
                    label{
                        min-height: 36px;
                    }
                }
            }
            position: relative;
            /*
            * 没有显示全的样式
            *
            */
            .el-form{
                border-bottom: 1px solid #e3e3e3;
                .el-form-item:nth-child(3){
                    border-bottom:none;
                }
            }
        }
        .loadMore{
            color: #777;
            position: relative;
            left: 50%;
            margin-left: -123px;
            margin-top: -6px;
            button{
                width: 247px;
                height: 42px;
                color: #777;
                background: #fff;
                font-size: 12px;
                border: 1px solid #e3e3e3;
                border-top: 1px solid #fff;
                cursor: pointer;
                display: flex;
                span{
                    flex:1;
                }
                i{
                    cursor: pointer;
                    display: block;
                    transition: all ease .2s;
                }
                .show{
                    transform: rotateZ(180deg);
                }
            }
        }
        .condition.shown{
            /*
            * 显示全了的样式
            *
            */
            .el-form{
                .el-form-item:nth-child(3){
                    border-bottom:1px dashed #e3e3e3;
                }
                .el-form-item:last-child{
                    border-bottom:none;
                }

            }
        }
        .content{
            margin-top: 12px;
            /*padding-bottom: 100px;*/
            .header{
                line-height: 40px;
                height:40px;
                width:100%;
                border:1px solid #e3e3e3;
                display: flex;
                justify-content: space-between;
                border-right: 0;
                .left{
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    color:#777;
                    div{
                        line-height: 40px;
                        border-right:1px solid #e3e3e3;
                        text-align: center;
                        cursor: pointer;
                    }
                    .synth{
                        min-width:58px;
                        padding: 0 10px;
                    }
                    .price{
                        width:92px;
                    }
                    .time{
                        width:119px;
                    }
                    div.active{
                        color:white;
                        background: #ff3b41;
                        border-right:1px solid #ff3b41;
                    }
                    div.isDesc{
                        i{
                            display: inline-block;
                            transform: rotate(180deg)
                        }
                    }

                    div.hr{
                        width:25px;
                        height: 1px;
                        background: #777;
                        border-right: 0;
                        margin: 3px  -20px 0 4px;
                    }
                    div.input{
                        border:none;
                        position: relative;
                        margin-top: -4px;
                        i{
                            display: block;
                            position: absolute;
                            left: 28px;
                            top: 2px;
                            color:#777;
                            z-index: 10;
                        }
                        input{
                            height: 24px;
                            width:72px;
                            padding-left: 20px;
                            vertical-align: middle;
                            position: relative;
                            margin-left: 24px;
                        }
                    }
                    button{
                        margin-left:24px;
                        width:44px;
                        color:#fff;
                        font-size: 14px;
                        border-radius: 2px;
                        border:1px solid #ff3b41;
                        background: #ff3b41;
                        line-height: 20px;
                    }
                }
                .right{
                    width:124px;
                    display: flex;
                    justify-content: space-between;
                    color: #999;
                    .buttons{
                        button{
                            padding:0;
                            height: 24px;
                            width:36px;
                            background: #fff;
                            margin:6px 0 0 -6px;
                            border-radius: 0;
                            position: relative;

                        }
                    }
                    span{
                        color: #ff3b41;
                    }
                }
            }

            .search-result{
                position: relative;
                ul.result{
                    display: flex;
                    flex-wrap: wrap;
                    width:100%;
                    /*margin-bottom: 20px;*/
                    li:hover{
                        -webkit-box-shadow: 0 15px 30px rgba(0,0,0,0.1);
                        box-shadow: 0 15px 30px rgba(0,0,0,0.1);
                        -webkit-transform: translate3d(0, -2px, 0);
                        transform: translate3d(0, -2px, 0);
                    }
                    li{
                        transition: all ease .2s;
                        width:290px;
                        overflow: hidden;
                        /*margin-top: 36px;*/
                        text-align: center;
                        border:1px  solid #f2f2f2;
                        .img{
                            width:100%;
                            height: 222px;
                            background-position: center center;
                            background-size: 190px auto;
                            background-repeat: no-repeat;
                            transition: all ease .4s;
                        }
                        p.name{
                            margin: 10px;
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
                        .item-price{
                            border-top:solid 1px #f2f2f2;
                            color:#ff3d41;
                            font-size: 26px;
                            font-weight: bold;
                            margin-top: 24px;
                            padding: 24px 0 30px 0;
                            button {
                                border: none;
                                width:60%;
                                height: 26px;
                                font-weight: bold;
                                font-size: 12px;
                                color: #ff3b41;
                                background: #fff;
                                box-shadow: 0px 2px 15px 2px #ebebeb;
                            }
                            .price{
                                position: relative;
                                .oldPrice{
                                    font-size: 14px;
                                    position: absolute;
                                    top:12px;
                                    text-decoration: line-through;
                                    color: #a3a3a3;
                                }
                            }
                        }
                        position: relative;
                        .handle{
                            display: flex;
                            button{
                                width:50%;
                                height: 52px;
                                background: red;
                                border:none;
                                color: #fff;
                                font-size: 29px;
                                i{
                                    font-size: 29px;
                                }
                            }
                            button.cart{
                                background: #ce2127;
                            }
                            button.cart:focus{
                                background: #9b0e13;
                                border:none;
                            }
                            button.favo{
                                background: #999;
                            }
                            button.favo:focus{
                                background: #666;
                                border:none;
                            }
                        }
                    }
                    li::after{
                        content:'';
                        width:260px;
                        height: 1px;
                        background: #ddd;
                        position: absolute;
                        top:100%;
                        left:15px;

                    }
                    .fiveDis{
                    }
                    .cart{
                        position: absolute;
                        right: 8px;
                        bottom: 30px;
                        font-size: 17px;
                        color: #FF3B41;
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        border: 1px solid #FF3B41;
                        line-height: 30px;
                        background-color: white;
                    }
                    /*.fiveDis{*/
                        .fiveDis::before{
                            content:'';
                            width:50px;
                            height: 50px;
                            position: absolute;
                            top: 12px;
                            left: 12px;
                            background-position: 0 0;
                            background-repeat: no-repeat;
                            background-size: 50px 50px;
                            background-image:url('../../../assets/img/five.png');
                        }
                    /*.fiveDis::after{
                        content:'';
                        width:40px;
                        height: 40px;
                        position: absolute;
                        left: 81%;
                        top: 81%;
                        background-position: 0 0;
                        background-repeat: no-repeat;
                        background-size: 40px 40px;
                        background-image:url('../../../assets/img/fiveIcon.png');
                    }*/
                    /*}*/

                }
                .el-pagination{
                    position: absolute;
                    right:0;
                    bottom: -45px;
                    display: flex;
                    .btn-next{
                        padding: 0 8px;
                    }
                    .btn-prev{
                        padding: 0 8px;
                    }
                }
            }
        }
        .error{
            width: 818px;
            height: 417px;

            margin: auto;
            div{
                width: 100%;
                height: 100%;
                background-size: cover;
                background-repeat: no-repeat;
            }
        }
        .banner{
            width: 100%;
            height: 500px;
            background-size: 100% 100%;
            background-position: center;
            background-repeat: no-repeat;
            border: 1px solid #f6f6f6;
        }
        .banner1{
            width: 100%;
            height: 300px;
            background-size: 100% 100%;
            background-position: center;
            background-repeat: no-repeat;
            border: 1px solid #f6f6f6;
            margin-top: 12px;
        }
        .navBar11{
            width: 100%;
            background-color: #D82929;
            box-sizing: border-box;
            padding-left: 20px;
            padding-right: 20px;
            height: 60px;
            line-height: 60px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 12px 0;
            .navBarSave{
                color: #fff;
                font-size: 18px;
                font-weight: bold;
            }
            .navBarDate{
                color: #fff;
                font-size: 18px;
                span:nth-child(2){
                    margin-left: 10px;
                };
                .timeBorder{
                    width: 40px;
                    height: 40px;
                    line-height: 40px;
                    background-color: #a91414;
                    border: 1px solid #a91414;
                    color: #fff;
                    font-size: 24px;
                    font-weight: bold;
                    margin: 0 5px;
                    border-radius: 4px;
                }
            }
        }
        .error1{
            width: 100%;
            height: 100%;
            position: relative;
            z-index: 1000;
            opacity: 0.6;
            background-image: url("../../../assets/img/soldout.png") !important;
        }
        .error2{
            background-color: #333333;
        }
        .img2{
            width: 40px;
            height: 40px;
            margin: 10px auto;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .cart1{
            position: absolute;
            right: 8px;
            bottom: 30px;
            font-size: 24px;
            color: #f2ac31;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            border: 1px solid white;
            background-color: white;
        }
        .price{
            text-align: left;
            margin-left: 24px;
        }
        .realPrice{
            margin-right: 6px;
        }
        .timeBorder1{
            background-color: #e67409 !important;
            border: 1px solid #e67409 !important;
        }
    }

</style>
