<template>
    <div class="coupon-shade" @click="closeThis">
        <main >
            <i class="iconfont icon-turnoff" @click.stop="closeThis"></i>
            <div class="top-content" :style="{backgroundImage:'url(' + bgImg + ')'}">
                <ul class="coupon-list">
                    <li v-for="bonus in dataList" v-if="dataList.length">
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
            </div>
            <p>The coupon has been sent to your account. You can view it in the</p>
            <p>personal center > shopping center</p>
            <el-button type="primary" @click="hrefToCoupon" round size="medium">MORE</el-button>
        </main>
    </div>
</template>

<script>
    export default {
        name: "coupon-shade",
        props:{
            dataList: {
                type: Array,
                required: true
            },
        },
        data(){
            return{
                ableHeadImg:require('@/assets/img/able-coupon.png'),
                bgImg:require('@/assets/img/coupon-shade-img.png'),
            }
        },
        methods:{
            closeThis(){
                this.selfContext.$emit('closeShade')
            },
            hrefToCoupon(){
                location.href = '/someinfo?t='+ new Date().getTime() + '#/coupon'
            }
        }
    }
</script>

<style scoped lang="less">
    .coupon-shade{
        overflow: hidden;
        position: fixed;
        top:0;
        left:0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.8);
        z-index: 233;
        main{
            margin: 10vh auto;
            width: 740px;
            position: relative;
            .icon-turnoff{
                position: absolute;
                top:0;
                right:-30px;
                color:#fff;
                cursor: pointer;
            }
            .top-content{
                width: 690px;
                height: 500px;
                background-size: contain;
                padding: 250px 25px 0 25px;
                margin-bottom: 24px;
                ul{
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    li{
                        height: 150px;
                        width: 335px;
                        background-color: #fff;
                        margin-bottom: 12px;
                        position: relative;
                        border-bottom:2px solid #4B8CFF;
                    }
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
                    height: 150px;
                    width: 335px;
                    .header{
                        height: 16px;
                        width: 335px;
                        background-size: contain;
                        background-repeat: no-repeat;
                    }
                    .content{
                        margin:0 20px;
                        padding:8px 0 0 0;
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
                                top: -17px;
                            }
                            .num{
                                margin-right: 4px;
                                font-size: 52px;
                            }
                            .icon-logo1{
                                font-size: 52px;
                                color:#d02128;
                                position: relative;
                                top:-10px;
                            }
                        }
                        .descript p{
                            font-weight: bold;
                            font-size: 16px;
                            line-height: 1.5;
                            color:#585858;
                            text-align: left;
                        }
                    }
                }
            }
            p{
                text-align: center;
                color:#fff;
                line-height: 1.2;
            }
            .el-button{
                display: block;
                color:#fff;
                margin:12px auto;
                font-weight: bold;
            }
        }
    }
</style>
