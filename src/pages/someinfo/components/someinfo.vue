<template>
    <div class="someinfo">
        <div class="someInfoWrapper">
            <div class="infoLeft">
                <img src="" alt="">
            </div>
            <div class="infoRight">
                <h2>尊敬的<span class="name">{{engineerInfo.user.name}}</span>,您好！</h2>
                <p>会员等级:<span>银牌会员</span></p>
                <hr class="flagLine">
                <div>
                    <span>账户余额:<span class="name">${{engineerInfo.cash}}</span></span>
                    <span style="margin-left: 23px">账期余额:<span class="name">${{account}}</span><span>(已使用<span>{{usedAcc}}</span>)</span></span>
                    <span style="margin-left: 23px">购物券:
                        <el-tooltip placement="top" effect="light">
                            <div slot="content">
                                <div class="bgDiscount">
                                    <div class="el-icon-close iconClose" @click="closeAll"></div>
                                    <h2>优惠券</h2>
                                    <div class="sale" v-for="item in discountData">
                                        <div class="saleTop">
                                            <div class="saleTopTop">
                                                <div class="saleTopLeft">
                                                    <div class="dollar">
                                                      <span>$</span><span>{{item.price}}</span>
                                                    </div>
                                                </div>
                                                <div class="saleTopRight">
                                                    <div>满减劵</div>
                                                    <div>{{item.desc}}</div>
                                                    <div>{{item.discount}}</div>
                                                </div>
                                            </div>
                                            <div class="saleBottomBottom">
                                                <span style="margin-right: 10px">使用时间:</span><span>02-12-2018</span><span>至</span><span>03-15-2018</span>
                                            </div>
                                        </div>
                                        <hr class="dosh">
                                        <div class="saleBottom"></div>
                                    </div>
                                </div>
                            </div>
                            <span class="name">{{len}}个</span>
                        </el-tooltip>
                    </span>
                </div>
            </div>
        </div>
        <div class="history">
            <h2>历史购买记录</h2>
            <ul>
                <div style="width:40px;height: 40px">
                    <span class="el-icon-arrow-left icon" v-show="this.pagination.page > 1" @click="pre"></span>
                </div>
               <li v-for="item in historyData">
                   <a href="#">
                       <div class="pic"><img :src="item.image_value" alt=""></div>
                       <div class="decs">{{item.item_name}}</div>
                       <hr>
                       <div class="price">${{item.price}}</div>
                   </a>
               </li>
                <div style="width:40px;height: 40px">
                   <span class="el-icon-arrow-right icon" v-show="this.pagination.page < this.pages" @click="next"></span>
                </div>
            </ul>
        </div>
    </div>
</template>

<script>
    import checkService from '@/services/CheckService'
    export default {
        name: "someinfo",
        data(){
            return{
                tableData:[
                    {url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519827728720&di=7e49169bcabc7c75a4f4fd88ae6498de&imgtype=0&src=http%3A%2F%2Fwww.wallcoo.com%2Fflower%2FAmazing_Color_Flowers_2560x1600_IV%2Fwallpapers%2F2560x1600%2FFlowers_Wallpapers_144.jpg',company:"海康威视",desc:'hahah',price:"$100"},
                    {url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519827728720&di=7e49169bcabc7c75a4f4fd88ae6498de&imgtype=0&src=http%3A%2F%2Fwww.wallcoo.com%2Fflower%2FAmazing_Color_Flowers_2560x1600_IV%2Fwallpapers%2F2560x1600%2FFlowers_Wallpapers_144.jpg',company:"海康威视",desc:'hahah',price:"$200"},
                    {url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519827728720&di=7e49169bcabc7c75a4f4fd88ae6498de&imgtype=0&src=http%3A%2F%2Fwww.wallcoo.com%2Fflower%2FAmazing_Color_Flowers_2560x1600_IV%2Fwallpapers%2F2560x1600%2FFlowers_Wallpapers_144.jpg',company:"海康威视",desc:'hahah',price:"$300"},
                    {url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519827728720&di=7e49169bcabc7c75a4f4fd88ae6498de&imgtype=0&src=http%3A%2F%2Fwww.wallcoo.com%2Fflower%2FAmazing_Color_Flowers_2560x1600_IV%2Fwallpapers%2F2560x1600%2FFlowers_Wallpapers_144.jpg',company:"海康威视",desc:'hahah',price:"$400"}
                ],
                engineerInfo:{
                    user: {},
                    acc_books: {},
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
                discountData: [{
                    price:50,
                    desc: "全球年货节",
                    discount: "满499美元使用（满499 - 50）"
                }, {
                    price:50,
                    desc: "新用户专享",
                    discount: "满499美元使用（满499 - 50）"}],
                isShow: true
            }
        },
        created(){},
        mounted(){
            this.checkInfo();
            this.history();
        },
        methods: {
            closeAll(){
                $('.el-tooltip__popper').css("display",'none');
                this.isShow = false
            },
            checkInfo(){
                checkService.checkInfo().then((data) => {
                    this.engineerInfo = data.data;
                    this.engineerInfo.acc_books.forEach((item) => {
                        if(item.subject === 2010101){
                            this.engineerInfo.cash = item.use_balance
                        }
                        if(item.subject === 2010106){
                            item.rule_blc1 = JSON.parse(item.rule_blc);
                            this.account = item.rule_blc1.limit ? item.rule_blc1.limit : 0;
                            this.usedAcc = item.rule_blc1.limit + item.balance;
                            console.log(item.rule_blc1);
                        }
                        if(item.subject === 2010102){
                            item.bonus.datalist.forEach((item) => {
                                this.len++;
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
                    this.historyData = data.datalist;
                    this.historyData.forEach((item) => {
                        this.historyLen++;
                    })
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
                if(this.pagination.page !== pages){
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
                border: 1px solid #a3a3a3;
                width: 102px;
                height: 102px;
                border-radius: 50%;
                background-color: #55a532;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .infoRight{
                flex:1;
                margin-left: 32px;
                .name{
                    color: #ff3b41;
                    margin-left: 3px;
                }
                h2{
                   font-size: 18px;
                    margin-bottom: 12px;
                }
                .flagLine{
                    border: none;
                    border-top: 1px solid #a3a3a3;
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
                    font-size: 40px;
                    font-weight: bold;
                }
                li:nth-child(2){
                    margin-left: 20px;
                }
                li{
                   box-sizing: border-box;
                   padding:10px;
                   width: 300px;
                   margin-right: 20px;
                   border: 1px solid #a3a3a3;
                    a{
                        display: inline-block;
                        width: 100%;
                        text-align: center;
                        .pic{
                            width: 100%;
                            img{
                                width:80%;
                            }
                        }
                        .company{
                            font-size: 18px;
                            font-weight: bold;
                        }
                        .decs{
                            height: 65px;
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
