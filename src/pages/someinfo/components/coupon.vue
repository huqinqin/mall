<template>
    <div class="coupon-info">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="Available Coupons" name="first">
                <ul class="coupon-list">
                    <li v-for="bonus in ableBonusList" v-if="ableBonusList.length">
                        <div class="expiring" v-if="bonus.expire">Expiring</div>
                        <div class="coupon-item">
                            <div class="header" :style="{backgroundImage: 'url(' + ableHeadImg + ')'}"></div>
                            <div class="content">
                                <div class="topline">
                                    <div class="amount"><i class="iconfont icon-ziyuanjrit"></i><span class="num">{{bonus.rule_value[0].value / 100}}</span><span>off</span></div>
                                    <div class="lts-logo"><i class="iconfont icon-logo1"></i></div>
                                </div>
                                <div class="descript">
                                    <p>${{bonus.rule_value[0].startV / 100}} purchase</p>
                                    <p>{{bonus.start}} to {{bonus.end}}</p>
                                </div>
                            </div>
                        </div>
                        <!--<div class="recommend"><i class="iconfont icon-tuijiansuode1"></i></div>-->
                    </li>
                </ul>
            </el-tab-pane>
            <el-tab-pane label="Failure" name="second">
                <ul class="coupon-list failure">
                    <li v-for="bonus in unableBonusList" v-if="unableBonusList.length">
                        <div class="coupon-item">
                            <div class="header" :style="{backgroundImage: 'url(' + unableHeadImg + ')'}"></div>
                            <div class="content">
                                <div class="topline">
                                    <div class="amount"><i class="iconfont icon-ziyuanjrit"></i><span class="num">{{bonus.rule_value[0].value / 100}}</span></div>
                                    <div class="lts-logo"><i class="iconfont icon-logo1"></i></div>
                                </div>
                                <div class="descript">
                                    <p>${{bonus.rule_value[0].startV / 100}} purchase</p>
                                    <p>{{bonus.start}} to {{bonus.end}}</p>
                                </div>
                            </div>
                        </div>
                        <!--<div class="recommend"><i class="iconfont icon-tuijiansuode1"></i></div>-->
                    </li>
                </ul>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import checkService from '@/services/CheckService'
    import timeService from '@/services/TimeService'
    import dateUtils from '@/utils/DateUtils.js'
    export default {
        name: "coupon",
        data(){
            return{
                activeName:'first',
                unableBonusList:[],
                ableBonusList:[],
                now:'',
                ableHeadImg:require('@/assets/img/ableCoupon.png'),
                unableHeadImg:require('@/assets/img/unableCoupon.png')
            }
        },
        methods:{
            handleClick(tab, event) {
                // console.log(tab, event);
            },
            getNowTime(){
                timeService.getTimeAndZone().then(time => {
                    this.now = new Date(time.current_time).getTime()
                    this.getBonusList()
                },err => {
                    this.$ltsMessage({type:'error',message:err.error_message})
                })

            },
            getBonusList(){
                checkService.checkInfo().then((data) => {
                    data.data.acc_books.forEach(t => {
                        if(t.subject === 2010102 && t.bonus){
                            t.bonus.datalist.forEach(item => {
                                item.rule_value = JSON.parse(item.rule)
                                item.end = dateUtils.format(new Date(parseInt(item.end_time)), 'MM-dd-yyyy')
                                item.start = dateUtils.format(new Date(parseInt(item.start_time)), 'MM-dd-yyyy')
                                if((item.end_time - this.now) / 1000 / 3600 / 24 > 5){
                                    item.expire = false
                                }else{
                                    item.expire = true
                                }
                                if(item.end_time < this.now){
                                    this.unableBonusList.push(item)
                                }else{
                                    this.ableBonusList.push(item)
                                }
                            })
                        }
                    })
                },(msg) => {
                    this.$ltsMessage({type:'error',message:msg.error_message})
                })
            }
        },
        mounted(){
            this.getNowTime()
        }
    }
</script>

<style scoped lang="less">
    .coupon-info{
        .coupon-list{
            display: flex;
            flex-wrap: wrap;
        }
        .coupon-list li{
            position: relative;
            margin-bottom: 12px;
            margin-right: 24px;
            .expiring{
                position: absolute;
                top:0;
                left: 0;
                height: 20px;
                width: 80px;
                background: #FB8228;
                font-weight: bold;
                color:#fff;
                text-align: center;
                line-height: 20px;
            }
            .recommend{
                position: absolute;
                bottom: -20px;
                right: 0;
                .iconfont{
                    font-size: 120px;
                    color:#FB8228;
                }
            }
        }
        .coupon-item{
            height: 125px;
            width: 276px;
            border:1px solid #ddd;
            .header{
                height: 10px;
                width: 276px;
                background-size: contain;
            }
            .content{
                margin:0 20px;
                padding:8px 0 0 0;
                border-bottom: 1px dashed #ddd;
                .topline{
                    display: flex;
                    justify-content: space-between;
                    vertical-align: top;
                    .amount{
                        color:#4B8CFF;
                        font-weight: bold;
                        span{
                            font-weight: bold;
                        }
                    }
                    .icon-ziyuanjrit{
                        font-size: 20px;
                        position: relative;
                        top: -10px;
                    }
                    .num{
                        margin-right: 4px;
                        font-size: 40px;
                    }
                    .icon-logo1{
                        font-size: 40px;
                        color:#CC232D;
                        position: relative;
                        top:-10px;
                    }
                }
                .descript p{
                    font-weight: bold;
                    line-height: 1.5;
                    color:#585858;
                }
            }
        }
        .failure{
            .icon-ziyuanjrit,.num,.icon-logo1,p,.icon-tuijiansuode1{
                color:#8E8E8E !important;
            }
        }
    }
</style>
