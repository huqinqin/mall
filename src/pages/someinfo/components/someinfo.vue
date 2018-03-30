<template>
    <div class="someinfo">
        <div class="someInfoWrapper">
            <div class="infoLeft">
                <span class="iconfont icon-icon"></span>
                <!--<div><img :src="engineerInfo.user.url" alt=""></div>-->
            </div>
            <div class="infoRight">
                <div>{{$t("main.someinfo.mainSomeDear")}}<span class="name">{{engineerInfo.user.name}}</span>,  {{$t("main.someinfo.mainSomeHello")}}！</div>
                <p style="font-weight: bold;margin-top: 10px">{{$t("main.someinfo.mainSomeLever")}}:<span style="margin-left: 4px;font-weight: bold">{{engineerInfo.level1}}</span></p>
                <hr class="flagLine">
                <div>
                    <span>{{$t("main.someinfo.mainSomeAccountBala")}}:<span class="name">${{engineerInfo.cash}}</span></span>
                    <span v-show="hasTerms" style="margin-left: 23px">{{$t("main.someinfo.mainSomePayBalance")}}:<span class="name">${{account}}</span><span>({{$t("main.someinfo.mainSomeUsed")}}<span>${{usedAcc}}</span>)</span></span>
                    <span style="margin-left: 23px">{{$t("main.someinfo.mainSomeShopCoupon")}}:
                        <el-tooltip placement="top" effect="light">
                            <div slot="content" v-if="len>0">
                                <div class="bgDiscount">
                                    <div class="el-icon-close iconClose" @click="closeAll"></div>
                                    <h2>{{$t("main.someinfo.mainSomeCoupon")}}</h2>
                                    <div class="sale" v-for="item in discountData" style="margin-top: 20px">
                                        <div class="saleTop">
                                            <div class="saleTopTop">
                                                <div class="saleTopLeft">
                                                    <div class="dollar">
                                                      <span>$</span><span>{{item.balance}}</span>
                                                    </div>
                                                </div>
                                                <div class="saleTopRight">
                                                    <div style="color: #ff3b41">{{$t("main.someinfo.mainSomeFullCoupon")}}</div>
                                                    <div>{{item.remark}}</div>
                                                    <div>{{$t("main.someinfo.mainSomeFull")}}<span>{{item.startMoney}}</span>{{$t("main.someinfo.mainSomeDollar")}}（{{$t("main.someinfo.mainSomeFull")}}<span>{{item.startMoney}}</span> - <span>{{item.value}}</span>）</div>
                                                </div>
                                            </div>
                                            <div class="saleBottomBottom">
                                                <span style="margin-right: 10px">{{$t("main.someinfo.mainSomeUsedTime")}}:</span><span>{{item.startTime}}</span><span>{{$t("main.someinfo.mainSomeRange")}}</span><span>{{item.endTime}}</span>
                                            </div>
                                        </div>
                                        <hr class="dosh">
                                        <div class="saleBottom"></div>
                                    </div>
                                </div>
                            </div>
                            <span class="name">{{len}}{{$t("main.someinfo.mainSomeEvery")}}</span>
                        </el-tooltip>
                    </span>
                </div>
            </div>
        </div>
        <div class="history">
            <h2>{{$t("main.someinfo.mainSomeHistory")}}</h2>
            <ul>
                <div>
                    <el-button class="el-icon-arrow-left icon" :disabled="this.pagination.page === 1" @click="pre" v-if="historyData.length > 0"></el-button>
                </div>
               <li v-for="item in historyData">
                   <a :href=" '/detail#/?id=' + item.id">
                       <div class="pic"><img :src="item.image_value" alt=""></div>
                       <div class="decs">{{item.item_name}}</div>
                       <hr>
                       <div class="price" v-if="item.price > 0"><lts-money :money="item.price"></lts-money></div>
                   </a>
               </li>
                <div>
                   <el-button class="el-icon-arrow-right icon" :disabled="this.pagination.page === this.pages" @click="next" v-if="historyData.length > 0"></el-button>
                </div>
            </ul>
        </div>
    </div>
</template>

<script>
    import checkService from '@/services/CheckService'
    import $ from 'jquery'
    export default {
        name: "someinfo",
        data(){
            return{
                hasTerms:false,
                tableData:[],
                engineerInfo:{
                    user: {
                        url:''
                    },
                    acc_books: {},
                    level1:0,
                },
                account: 0,
                usedAcc: 0,
                len: 0,
                pagination: {
                    page: 1,
                    pageSize: 4,
                    total: 0
                },
                historyData: {},
                historyLen: 0,
                pages: 0,
                discountData: [],
                isShow: true,
                value:0,
                startMoney:0
            }
        },
        created(){},
        mounted(){
            this.checkInfo();
            this.history();
        },
        methods: {
            /*日期补齐前缀*/
            PrefixInteger(num, n) {
               return (Array(n).join(0) + num).slice(-n);
            },
            gettime(t){
               var _time=new Date(t);
               var year=_time.getFullYear();//2017
               var month=_time.getMonth()+1;//7
                month = this.PrefixInteger(month,2);
               var date=_time.getDate();//10
                date = this.PrefixInteger(date,2);
               var hour=_time.getHours();//10
               var minute=_time.getMinutes();//56
               var second=_time.getSeconds();//15
                return   date+"-"+month+"-"+year;
            },
            closeAll(){
                $('.el-tooltip__popper').css("display",'none');
                this.isShow = false
            },
            checkInfo(){
                this.account = this.account.toFixed(2);
                this.usedAcc = this.usedAcc.toFixed(2);
                checkService.checkInfo().then((data) => {
                    this.engineerInfo = data.data;
                    this.engineerInfo.level1 = data.data.vip;
                    this.engineerInfo.user.url = data.data.user.avatar;
                    console.log(this.engineerInfo.level1);
                    this.engineerInfo.acc_books.forEach((item) => {
                        if(item.subject === 2010101){
                            this.engineerInfo.cash = (item.use_balance / 100).toFixed(2);
                        }
                        if(item.subject === 2010106){
                            this.hasTerms = true
                            item.rule_blc1 = JSON.parse(item.rule_blc);
                            /*this.usedAcc = ((item.rule_blc1.limit + item.balance) / 100).toFixed(2);*/
                            this.usedAcc = (((item.use_balance) / 100).toFixed(2)).slice(1);
                            let sum = item.rule_blc1.limit + item.use_balance;
                            this.account = ( sum / 100).toFixed(2);
                            console.log(this.account,item.rule_blc1.limit + item.use_balance,this.account);
                        }
                        if(item.subject === 2010102 && item.bonus){
                            item.bonus.datalist.forEach((item) => {
                                this.len++;
                            })
                        }
                    });
                    data.data.acc_books.forEach((item) => {
                        if(item.subject === 2010102 && item.bonus){
                            this.discountData = item.bonus.datalist;
                            this.discountData.forEach((item) => {
                                item.balance = (item.balance / 100).toFixed(2);
                                item.rule1 =  JSON.parse(item.rule);
                                item.value = (item.rule1[0].value / 100).toFixed(2);
                                item.startMoney = (item.rule1[0].startV / 100).toFixed(2);
                                item.startTime = this.gettime(item.start_time);
                                item.endTime = this.gettime(item.end_time);
                            })
                        }
                    })
                })
            },
            history(){
                let params = {
                    'page': this.pagination.page,
                    'page_size': this.pagination.pageSize,
                };
                checkService.history(params).then((data) => {
                    this.pagination.total = data.total;
                    this.pages = Math.ceil(this.pagination.total / this.pagination.pageSize);
                    this.historyData = data.datalist;
                    this.historyData.forEach((item) => {
                        item.price = item.price.toFixed(2);
                        this.historyLen++;
                    });
                })
            },
            pre(){
              if(this.pagination.page !== 1){
                  this.pagination.page--;
                  this.history();
              }else{
                  return;
              }
            },
            next(){
                this.pages = Math.ceil(this.pagination.total / this.pagination.pageSize);
                if(this.pagination.page !== this.pages){
                    this.pagination.page++;
                    this.history();
                }else{
                    return;
                }
            }
        }
    }
</script>

<style lang="less">
    .bgDiscount{
        box-sizing: border-box;
        padding:10px;
        width: 430px;
        background-color: #f2f8fe;
        font-family: "Microsoft YaHei";
        font-size: 14px;
        position: relative;
        color: #777;
        height: 300px;
        overflow-y: scroll;
        .iconClose{
            position: absolute;
            right:10px;
            top:10px;
            font-size: 30px;
            font-weight: bold;
        }
        h2{
            font-size: 18px;
            margin-top: 10px;
        }
        .sale{
            width: 80%;
            background-color: #FFDA22;
            margin: 0 auto;
            border-radius: 10px;
            margin-bottom: 10px;
            .saleTop{
                padding:10px;
                box-sizing: border-box;
                .saleTopTop{
                    display: flex;
                    .saleTopLeft{
                        text-align: center;
                        flex: 0 0 100px;
                        color: darkred;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        .dollar{
                            position: relative;
                            span:first-child{
                                font-size: 18px;
                                position: absolute;
                                left:-10px;
                                top:0;
                            }
                            span:nth-child(2){
                                font-size: 30px;
                            }
                        }
                    };
                    .saleTopRight{
                        flex: 1;
                        margin-left: 10px;
                        div{
                            margin-bottom: 5px;
                        }
                    }
                }
                .saleBottomBottom{
                    margin-top: 5px;
                    text-align: center;
                }
            }
            .dosh{
                border: none;
                border-top: 1px dashed #a3a3a3;
            }
            .saleBottom{
                height: 20px;
            }
        }
    }
    .someinfo{
        padding:40px;
        font-family: "Microsoft YaHei";
        font-size: 14px;
        color: #777;
        .someInfoWrapper{
            display: flex;
            align-items: center;
            margin-left: 50px;
            .infoLeft{
                flex:0 0 102px;
                /*border: 1px solid #a3a3a3;
                width: 102px;
                height: 102px;
                border-radius: 50%;
                background-color: #55a532;*/
                .iconfont{
                    font-size: 72px;
                    color: white;
                    background-color: #bbb;
                    border-radius: 50%;
                    padding:12px 14px;
                }
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            .infoRight{
                flex:1;
                margin-left: 32px;
                .name{
                    color: #ff3b41;
                    margin-left: 3px;
                    font-weight: bold;
                }
                h2{
                   font-size: 18px;
                    margin-bottom: 12px;
                }
                .flagLine{
                    border: none;
                    border-top: 1px solid #eee;
                    margin: 24px 0;
                    width: 90%;
                }
            }
        }
        .history{
            margin-top: 20px;
            h2{
                font-size: 18px;
                margin-bottom: 12px;
                margin-left: 60px;
            }
            ul{
                width: 100%;
                display: flex;
                align-items: center;
                .icon{
                    font-size: 30px;
                    font-weight: bold;
                }
                li:nth-child(2){
                    margin-left: 20px;
                }
                li{
                   box-sizing: border-box;
                   padding:5px;
                   width: 240px;
                   margin-right: 10px;
                   border: 1px solid #a3a3a3;
                    a{
                        display: inline-block;
                        width: 100%;
                        text-align: center;
                        .pic{
                            width: 100%;
                            height: 200px;
                            img{
                                width:80%;
                            }
                        }
                        .company{
                            font-size: 18px;
                            font-weight: bold;
                        }
                        .decs{
                            min-height: 100px;
                        }
                        hr{
                            border: none;
                            border-top: 1px solid #a3a3a3;
                        }
                        .price{
                            line-height: 50px;
                            color: #ff3b41;
                            font-size: 20px;
                            font-weight: bold;
                        }
                    }
                }
            }
        }
    }
</style>
