<template>
    <div class="someinfo">
        <div class="someInfoWrapper">
            <div class="infoLeft">
                <img src="" alt="">
            </div>
            <div class="infoRight">
                <h2>尊敬的<span class="name">{{engineerInfo.user.name}}</span>,您好！</h2>
                <p>会员等级:<span>银牌会员</span></p>
                <hr>
                <div>
                    <span>账户余额:<span class="name">{{engineerInfo.cash}}</span></span>
                    <span style="margin-left: 23px">账期余额:<span class="name">{{engineerInfo.account}}</span><span>(已使用<span>{{engineerInfo.usedAcc}}</span>)</span></span>
                    <span style="margin-left: 23px">购物券:
                        <el-tooltip placement="top">
                            <div slot="content">多行信息<br/>第二行信息</div>
                            <span class="name">6个</span>
                        </el-tooltip>
                    </span>
                </div>
            </div>
        </div>
        <div class="history">
            <h2>历史购买记录</h2>
            <ul>
                <span class="el-icon-arrow-left icon"></span>
               <li v-for="item in tableDate">
                   <a href="#">
                       <div class="pic"><img :src="item.url" alt=""></div>
                       <div class="company">{{item.company}}</div>
                       <div class="decs">{{item.desc}}</div>
                       <hr>
                       <div class="price">{{item.price}}</div>
                   </a>
               </li>
                <span class="el-icon-arrow-right icon"></span>
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
                tableDate:[
                    {url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519827728720&di=7e49169bcabc7c75a4f4fd88ae6498de&imgtype=0&src=http%3A%2F%2Fwww.wallcoo.com%2Fflower%2FAmazing_Color_Flowers_2560x1600_IV%2Fwallpapers%2F2560x1600%2FFlowers_Wallpapers_144.jpg',company:"海康威视",desc:'hahah',price:"$100"},
                    {url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519827728720&di=7e49169bcabc7c75a4f4fd88ae6498de&imgtype=0&src=http%3A%2F%2Fwww.wallcoo.com%2Fflower%2FAmazing_Color_Flowers_2560x1600_IV%2Fwallpapers%2F2560x1600%2FFlowers_Wallpapers_144.jpg',company:"海康威视",desc:'hahah',price:"$200"},
                    {url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519827728720&di=7e49169bcabc7c75a4f4fd88ae6498de&imgtype=0&src=http%3A%2F%2Fwww.wallcoo.com%2Fflower%2FAmazing_Color_Flowers_2560x1600_IV%2Fwallpapers%2F2560x1600%2FFlowers_Wallpapers_144.jpg',company:"海康威视",desc:'hahah',price:"$300"},
                    {url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519827728720&di=7e49169bcabc7c75a4f4fd88ae6498de&imgtype=0&src=http%3A%2F%2Fwww.wallcoo.com%2Fflower%2FAmazing_Color_Flowers_2560x1600_IV%2Fwallpapers%2F2560x1600%2FFlowers_Wallpapers_144.jpg',company:"海康威视",desc:'hahah',price:"$400"}
                ],
                engineerInfo:{
                    user:{}
                }
            }
        },
        created(){},
        mounted(){
            this.checkInfo();
        },
        methods: {
            checkInfo(){
                checkService.checkInfo().then((data) => {
                    this.engineerInfo = data.data;
                    this.engineerInfo.acc_books.forEach((item) => {
                        if(item.subject === 2010101){
                            this.engineerInfo.cash = item.use_balance
                        }
                        if(item.subject === 2010106){
                            item.rule_blc1 = JSON.parse(item.rule_blc);
                            this.engineerInfo.account = item.rule_blc1.limit;
                            this.engineerInfo.usedAcc = item.rule_blc1.limit + item.balance;
                            console.log(item.rule_blc1);
                        }
                    })
                })
            }
        }
    }
</script>

<style lang="less">
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
                hr{
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
                   flex:1;
                   margin-right: 20px;
                   border: 1px solid #a3a3a3;
                    a{
                        display: inline-block;
                        width: 100%;
                        text-align: center;
                        .pic{
                            width: 100%;
                            height: 300px;
                            img{
                                width:100%;
                                height: 100%;
                            }
                        }
                        .company{
                            font-size: 18px;
                            font-weight: bold;
                        }
                        .decs{}
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
