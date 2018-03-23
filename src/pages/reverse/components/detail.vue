<template>
    <div class="reverse-detail" v-if="detail">
        <div class="reverse-header">
            <p class="title" v-if="detail.reverse.status == 9">{{$t("main.order.list.mainOrLiClose")}}</p>
            <div class="remark" v-if="detail.reverse.status == 9">
                <div>{{$t("main.reverse.detail.mainRevDeOverTime")}}:{{detail.reverse.end_time | timestamp2str}}</div>
                <div>{{$t("main.reverse.detail.mainRevDeNotes")}}</div>
            </div>
            <p class="title" v-if="detail.reverse.status == 2">{{$t("main.reverse.detail.mainRevDeRefundSucc")}}</p>
            <div class="remark" v-if="detail.reverse.status == 2 ">
                <div v-if="detail.reverse.hd_status == 1">{{$t("main.reverse.detail.mainRevDeWaitGoods")}}</div>
                <div v-if="detail.reverse.hd_status == 2">{{$t("main.reverse.detail.mainRevDeWaitWrite")}}</div>
                <div v-if="detail.reverse.hd_status == 3">{{$t("main.reverse.detail.mainRevDeWrited")}}</div>
            </div>
            <p class="title" v-if="detail.reverse.status == 3">{{$t("main.reverse.detail.mainRevDeReject")}}</p>
            <div class="remark" v-if="detail.reverse.status == 3 ">
                <div>{{$t("main.reverse.detail.mainRevDeFuse")}}:{{detail.reverse.edate | timestamp2str}}</div>
            </div>
            <p class="title" v-if="detail.reverse.status == 4">{{$t("main.reverse.list.mainRevLiSuccess")}}</p>
            <div class="remark" v-if="detail.reverse.status == 4 ">
                <div>{{$t("main.reverse.detail.mainRevDeReturnSucc")}}:{{detail.reverse.tobuy_time | timestamp2str}}</div>
                <div>{{$t("main.reverse.detail.mainRevDeReturnTotal")}}<lts-money :money="detail.reverse.refund_real"></lts-money></div>
            </div>

            <p class="title" v-if="detail.reverse.status == 1">{{$t("main.reverse.detail.mainRevDeSuccRefund")}}</p>
            <p class="remark" v-if="detail.reverse.status == 1">{{$t("main.reverse.detail.mainRevDeSuccRefund")}}</p>
            <!--<p class="remark" v-if="detail.reverse.hd_status === 2">{{$t("main.reverse.detail.mainRevDeWaitLts")}}</p>-->
            <!--<p class="remark" v-if="">{{$t("main.reverse.detail.mainRevDeReceipt")}}</p>-->
            <!--<p class="remark" v-if="detail.reverse.hd_status === 3">{{$t("main.reverse.detail.mainRevDeRefundSucc")}}</p>-->
            <!--<p class="remark" v-if="detail.reverse.hd_status === 0">{{$t("main.reverse.detail.mainRevDeReject")}}</p>-->
        </div>
        <div class="detail-item">
            <div class="info-box">
                <div class="info">
                    <span>{{$t("main.cart.beforePay.mainCartBefOrderNum")}}:</span>
                    <span>{{detail.wholesale_order.tid}}</span>
                </div>
                <div class="info">
                    <span>{{$t("main.reverse.detail.mainRevDeApplyTime")}}:</span>
                    <span>{{detail.reverse.start_time | timestamp2str}}</span>
                </div>
                <div class="info">
                    <span>{{$t("main.reverse.detail.mainRevDeSaler")}}:</span>
                    <span>{{detail.wholesale_order.proxy_uid}}</span>
                </div>
            </div>
            <div class="item-info">
                <el-table :data="detail.wholesale_order.wholesale_order_items" border style="width: 100%">
                    <el-table-column :label='$t("main.cart.list.mainCartliGoodsInfo")' header-align="left" align="left">
                        <template slot-scope="scope">
                            <div class="order-item-detail">
                                <img :src="scope.row.wholesale_item_d_o.image_value + '!item_small'" class="item" />
                                <div>{{scope.row.wholesale_item_d_o.item_name}}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="num" :label='$t("main.reverse.detail.mainRevDeSaleNum")' width="80" header-align="center" align="center">
                        <template slot-scope="scope">
                            {{scope.row.num}}{{scope.row.wholesale_item_d_o.unit}}
                        </template>
                    </el-table-column>
                    <el-table-column :label='$t("main.cart.list.mainCartliUnitPrice")' width="100" header-align="center" align="center">
                        <template slot-scope="scope">
                            <del class="text-secondary" v-if="scope.row.price > scope.row.price_real">
                                <lts-money :money="scope.row.price"></lts-money>
                            </del>
                            <div>
                                <lts-money :money="scope.row.price_real"></lts-money>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column :label='$t("main.cart.list.mainCartliAllPrice")' width="100" header-align="center" align="center">
                        <template slot-scope="scope">
                            <del class="text-secondary" v-if="scope.row.pay > scope.row.pay_real">
                                <lts-money :money="scope.row.pay"></lts-money>
                            </del>
                            <div>
                                <lts-money :money="scope.row.pay_real"></lts-money>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column  :label='$t("main.order.reverse.mainOrReRejectNum")' width="100" header-align="center" align="center">
                        <template slot-scope="scope">
                            <div>{{detail.reverse.real_num}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column  :label='$t("main.reverse.detail.mainRevDeRefundMoney")' width="100" header-align="center" align="center">
                        <template slot-scope="scope">
                            <div><lts-money :money="detail.reverse.refund"></lts-money></div>
                        </template>
                    </el-table-column>
                    <el-table-column v-if="detail.reverse.status == 4"  :label='$t("main.order.reverse.mainOrReRejectSureTotalPay")' width="200" header-align="center" align="center">
                        <template slot-scope="scope">
                            <div><lts-money :money="detail.reverse.refund_real"></lts-money></div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-card class="box-card base-info">
            <div slot="header" class="clearfix">
                <span>{{$t("main.cart.settle.mainCartSeOrderInfo")}}</span>
            </div>
            <el-form label-position="left" inline class="form-row">
                <el-form-item :label='$t("main.reverse.detail.mainRevDeAcceptInfo")'>
                    <div>{{detail.wholesale_order.user_name}} {{detail.wholesale_order.receiver_mobile}}</div>
                    <div>{{detail.wholesale_order.user_addr}}</div>
                </el-form-item>
                <el-form-item :label='$t("main.order.detail.mainOrDePayInfo")' v-if="detail.wholesale_order.pay_info">
                    <div>
                        {{$t("main.order.detail.mainOrDeCard")}}
                        <lts-money v-if="detail.wholesale_order.pay_info.pay_remark && detail.wholesale_order.pay_info.pay_remark.ANET_CREDIT_CARD > 0" :money="detail.wholesale_order.pay_info.pay_remark.ANET_CREDIT_CARD" ></lts-money>
                        <span v-else>$0.00</span>
                    </div>
                    <div>
                        {{$t("main.order.detail.mainOrDeAccount")}}
                        <lts-money v-if="detail.wholesale_order.pay_info.pay_remark && detail.wholesale_order.pay_info.pay_remark.CREDIT > 0" :money="detail.wholesale_order.pay_info.pay_remark.CREDIT" ></lts-money>
                        <span v-else>$0.00</span>
                    </div>
                    <div>
                        {{$t("main.order.detail.mainOrDeYue")}}
                        <lts-money v-if="detail.wholesale_order.pay_info.balance_pay && detail.wholesale_order.pay_info.balance_pay > 0" :money="detail.wholesale_order.pay_info.balance_pay" ></lts-money>
                        <span v-else>$0.00</span>
                    </div>
                    <div>
                        {{$t("main.order.detail.mainOrDeGouwu")}}
                        <lts-money v-if="detail.wholesale_order.pay_info.acc_bonus_pay && detail.wholesale_order.pay_info.acc_bonus_pay" :money="detail.wholesale_order.pay_info.acc_bonus_pay" ></lts-money>
                        <span v-else>$0.00</span>
                    </div>
                </el-form-item>
                <el-form-item :label='$t("main.order.detail.mainOrDeOrderStatus")'>
                    {{detail.wholesale_order.status_title}}
                </el-form-item>
                <el-form-item :label='$t("main.order.detail.mainOrDeLogiInfo")'>
                    {{detail.reverse.express}}{{detail.reverse.express_num}}
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="box-card base-info">
            <div slot="header" class="clearfix">
                <span>{{$t("main.reverse.detail.mainRevDeSomeInfo")}}</span>
            </div>
            <el-form label-position="left" inline class="form-row">
                <el-form-item :label='$t("main.reverse.detail.mainRevDeRefundType")'>
                    <div v-if="detail.reverse.hd_status > 0">{{$t("main.reverse.detail.mainRevDeRefund")}}</div>
                    <div v-else>{{$t("main.reverse.detail.mainRevDeOnlyRefund")}}</div>
                </el-form-item>
                <el-form-item :label='$t("main.reverse.detail.mainRevDeFundReason")'>
                    <div>{{detail.reverse.reverse_reason_title}}</div>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="box-card base-info">
            <div slot="header" class="clearfix">
                <span>{{$t("main.reverse.detail.mainRevDeTalk")}}</span>
            </div>
            <div class="remark-box">
                <div class="remark-item" v-for="(value,index) in detail.reverse.remark" :class="[detail.reverse.user_id == value.uid ? 'left' : 'right' ]">
                    <div class="remark" v-if="detail.reverse.user_id == value.uid"><span>{{$t("main.reverse.detail.mainRevDeEngineer")}}:</span>{{value.remark}}</div>
                    <div class="remark" v-else>{{value.remark}}<span>:LTS</span></div>
                    <div class="remark-date">{{value.date}}</div>
                </div>
            </div>
        </el-card>
    </div>
</template>
<script>
    import revereService from '@/services/ReverseService'
    export default {
        props: {},
        components: {
        },
        data() {
            return {
                alertType: 'info',
                detail: {
                    id: '',
                    item_remark: {
                        order_cdate : ''
                    },
                    reverse_remark: {

                    },
                    reverse:{
                        start_time : '',
                    },
                    status: 0,
                    wholesale_order:{
                        wholesale_order_items : [],
                    }
                }
            }
        },
        methods: {
            get () {
                revereService.get(this.detail.id).then((resp) => {
                    resp.data.wholesale_order.pay_info.pay_remark = JSON.parse(resp.data.wholesale_order.pay_info.pay_remark_string)
                    resp.data.wholesale_order.sell_order_list[0].wholesale_order_items.forEach((value,index,array)=>{
                        if(value.tid == resp.data.reverse.oid){
                            resp.data.wholesale_order.wholesale_order_items.push(value);
                            return false;
                        }
                    })
                    this.detail = resp.data;
                }, (err) => {
                    this.$ltsMessage.show({type:'error',message:err.error_message})
                });
            }
        },
        mounted(){
            this.detail.id = this.$route.params.id;
            this.get();
        }
    }
</script>
<style lang="less">
    .reverse-detail{
        .reverse-header{
            border-bottom:solid 1px #ddd;
            .title{
                font-size: 20px;
                font-weight: bold;
                color: #ff3b41;
                margin-top: 24px;
            }
            .remark{
                font-size: 14px;
                color: #a3a3a3;
                margin-top: 12px;
                margin-bottom:12px;
            }
        }
        .info-box{
            display: flex;
            justify-content: space-between;
            color: #737373;
            margin: 24px 0 12px 0;
            .info{
                font-size: 14px;
                color: #737373;
                div{
                    line-height: 28px;
                }
            }
        }
        .el-card{
            border-radius: 4px;
            background-color: #fff;
            overflow: hidden;
            color: #303133;
            box-shadow: none;
            border: none;
            margin-top: 12px;
        }
        .el-card__header{
            padding: 9px 20px;
            background-color: #f6f6f6;
            font-size: 14px;
            color: #585858;
            font-weight: bold;
        }
        .detail-item{
            td{
                .order-item-detail{
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    .item {
                        width: 30px;
                        height: 30px;
                    }
                    div{
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                }
            }
            td:last-child{
                border-right:solid 1px #dddddd;
            }
            td:first-child{
                border-left:solid 1px #dddddd;
            }
        }
        .remark-box{
            border:solid 1px #ddd;
            height: 384px;
            width: 700px;
            overflow-y: scroll;
            .left{
                text-align: left;
            }
            .right{
                text-align: right;
            }
            .remark-item:first-child{
                padding-top: 24px;
            }
            .remark-item{
                padding: 0px  48px 12px;
                .remark{
                    font-size: 14px;
                    color: #a3a3a3;
                    span{
                        color: #737373;
                    }
                }
                .remark-date{
                    font-size: 12px;
                    color: #a3a3a3;
                }
            }
        }
        .form-row {
            font-size: 0;
            color: #a3a3a3;
            label {
                width: 100px;
                font-size: 14px;
            }
            .el-form-item {
                width: 100%;
                color: #666;
                margin-right: 0;
                margin-bottom: 0;
            }
        }
    }

</style>
