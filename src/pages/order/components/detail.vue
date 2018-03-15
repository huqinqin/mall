<template>
    <div class="orderDetail">
        <el-alert
            title=""
            :closable="false"
            type="info">
            <div>
                {{$t("main.order.detail.mainOrDeOrderStatus")}}:{{order.status_title}}
                <span v-if="order.status == 2">{{$t("main.order.detail.mainOrDeAuto")}}</span>
            </div>
        </el-alert>
        <el-card class="box-card base-info">
            <div slot="header" class="clearfix">
                <span>{{$t("main.cart.settle.mainCartSeOrderInfo")}}</span>
            </div>
            <el-form label-position="left" inline class="form-row" label-width="130px">
                <el-form-item :label='$t("main.order.detail.mainOrDeBuyerInfo")'>
                    {{order.user_name}} {{order.receiver_mobile}}
                </el-form-item>
                <el-form-item :label='$t("main.order.detail.mainOrDeMyAddr")'>
                    {{order.user_addr}}
                </el-form-item>
                <el-form-item :label='$t("main.cart.settle.mainCartSeBuyersTalk")'>
                    <span v-for="(remark, index) in order.trade_remark_list" :key="index" v-if="remark.uid == order.customer.id">
                        {{remark.remark}}
                    </span>
                </el-form-item>
                <el-form-item :label='$t("main.cart.fail.mainCartFaOrderNum")'>
                    {{order.tid}}
                </el-form-item>
                <el-form-item :label='$t("main.order.detail.mainOrDeCreateTime")'>
                    {{order.cdate | timestamp2str}}
                </el-form-item>
                <el-form-item :label='$t("main.order.detail.mainOrDePayTime")'>
                    {{order.cdate | timestamp2str}}
                </el-form-item>
                <el-form-item :label='$t("main.order.detail.mainOrDePayInfo")' v-if="order.status == 1">
                    <div>
                        {{$t("main.order.detail.mainOrDeCard")}}
                        <lts-money v-if="order.pay_info.pay_remark && order.pay_info.pay_remark.ANET_CREDIT_CARD > 0" :money="order.pay_info.pay_remark.ANET_CREDIT_CARD" ></lts-money>
                        <span v-else>$0.00</span>
                    </div>
                    <div>
                        {{$t("main.order.detail.mainOrDeAccount")}}
                        <lts-money v-if="order.pay_info.pay_remark && order.pay_info.pay_remark.CREDIT > 0" :money="order.pay_info.pay_remark.CREDIT" ></lts-money>
                        <span v-else>$0.00</span>
                    </div>
                    <div>
                        {{$t("main.order.detail.mainOrDeYue")}}
                        <lts-money v-if="order.pay_info.balance_pay && order.pay_info.balance_pay > 0" :money="order.pay_info.balance_pay" ></lts-money>
                        <span v-else>$0.00</span>
                    </div>
                    <div>
                        {{$t("main.order.detail.mainOrDeGouwu")}}
                        <lts-money v-if="order.pay_info.acc_bonus_pay && order.pay_info.acc_bonus_pay" :money="order.pay_info.acc_bonus_pay" ></lts-money>
                        <span v-else>$0.00</span>
                    </div>
                </el-form-item>
                <el-form-item :label='$t("main.order.detail.mainOrDePayStatus")'>
                    {{order.pay_info.pay_status_title}}
                </el-form-item>
            </el-form>
        </el-card>
        <div class="detail-item" v-for="(shop,index) in order.sell_order_list">
            <div class="info-box">
                <div class="info">
                    <span>{{$t("main.order.detail.mainOrDeBag")}}:</span>
                    <span>{{shop.shop.shop_name}}</span>
                </div>
                <div class="info">
                    <span>{{$t("main.order.detail.mainOrDeLogiInfo")}}:</span>
                    <!--<span>{{order.user_name}}</span>-->
                    <span v-for="(dispatch, index) in shop.dispatchs" :key="index">
                        {{dispatch.express}}:{{dispatch.out_id}}
                    </span>
                </div>
                <div class="info">
                    <span>{{$t("main.order.detail.mainOrDeSendTime")}}:</span>
                    <span v-for="(dispatch, index) in shop.dispatchs" :key="index">
                        {{dispatch.cdate | timestamp2str}}
                    </span>
                </div>
                <div class="info">
                    <span>{{$t("main.order.detail.mainOrDeFetchTime")}}:</span>
                    <span v-for="(dispatch, index) in shop.dispatchs" :key="index">
                        {{dispatch.signTime | timestamp2str}}
                    </span>
                </div>
            </div>
            <div class="item-info">
                <el-table :data="shop.wholesale_order_items" style="width: 100%">
                    <el-table-column :label='$t("main.cart.list.mainCartliGoodsInfo")' header-align="left" align="left">
                        <template slot-scope="scope">
                            <div class="order-item-detail">
                                <img :src="scope.row.wholesale_item_d_o.image_value + '!item_small'" class="item" />
                                <div>{{scope.row.wholesale_item_d_o.item_name}}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column :label='$t("main.cart.list.mainCartliUnitPrice")' width="100" header-align="left" align="left">
                        <template slot-scope="scope">
                            <del class="text-secondary" v-if="scope.row.price > scope.row.price_real">
                                <lts-money :money="scope.row.price"></lts-money>
                            </del>
                            <div>
                                <lts-money :money="scope.row.price_real"></lts-money>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="num" :label='$t("main.cart.list.mainCartliNum")' width="200" header-align="left" align="left">
                        <template slot-scope="scope">
                            {{scope.row.num}}{{scope.row.wholesale_item_d_o.unit}}
                        </template>
                    </el-table-column>
                    <el-table-column :label='$t("main.order.detail.mainOrDePayReal")' width="150" header-align="left" align="left">
                        <template slot-scope="scope">
                            <del class="text-secondary" v-if="scope.row.pay > scope.row.pay_real">
                                <lts-money :money="scope.row.pay"></lts-money>
                            </del>
                            <div>
                                <lts-money :money="scope.row.pay_real"></lts-money>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column :label='$t("main.order.detail.mainOrDeStatus")' width="150" align="center">
                        <template slot-scope="scope">
                            {{scope.row.status_title}}
                            <div v-if="scope.row.last_refund_status > 0 && scope.row.last_refund_status < 9" style="color: #ff3b41;">
                                refund
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="info-bottom" v-if="order.fee_hd_value">
            <div class="text">
                <label>{{$t("main.cart.settle.mainCartSeMustPay")}}</label>
                <span><lts-money :money="order.pay"></lts-money></span>
            </div>
            <div class="text">
                <label>{{$t("main.order.detail.mainOrDeActivity")}}</label> <span><lts-money :money="order.discount"></lts-money></span>
            </div>
            <div class="text">
                <label>+{{$t("main.cart.settle.mainCartSeFright")}}</label> <span><lts-money :money="order.fee_hd_value.HD_ALL"></lts-money></span>
            </div>
            <div class="text">
                <label>+{{$t("main.cart.settle.mainCartSeTax")}}</label> <span><lts-money :money="order.fee_hd_value.TAXES_ALL"></lts-money></span>
            </div>
            <div class="text">
                <label>{{$t("main.order.detail.mainOrDePayTotal")}}</label><span class="large"><lts-money :money="order.fee_total"></lts-money></span>
            </div>
        </div>
    </div>
</template>
<script>
    import orderService from '@/services/OrderService'
    export default {
        props: {},
        components: {
        },
        data() {
            return {
                order: {
                    tid: '',
                    pay_info: {
                        pay_type_title: ''
                    },
                    status: 0
                },
                stepActive : 0
            }
        },
        methods: {
            get () {
                orderService.get(this.order.tid).then((resp) => {
                    resp.data.pay_info.pay_remark = JSON.parse(resp.data.pay_info.pay_remark_string);
                    resp.data.fee_hd_value = JSON.parse(resp.data.fee_hd);
                    this.order = resp.data;
                    if(this.order.status == 0){
                        this.order.status_title = this.$t("main.order.list.mainOrLiWaitPay");
                    }else if(this.order.status == 1){
                        this.order.status_title = this.$t("main.order.list.mainOrLiRealPay");
                    }else if(this.order.status == 2) {
                        this.order.status_title = this.$t("main.order.list.mainOrLiWaitPay");
                    }
                    if(this.order.pay_info.pay_status == 0){
                        this.order.pay_info.pay_status_title = "Unpaid";
                    }else if(this.order.pay_info.pay_status == 1){
                        this.order.pay_info.pay_status_title = "Wait For Refund";
                    }else if(this.order.pay_info.pay_status == 2) {
                        this.order.pay_info.pay_status_title = "Payment Has Been Received";
                    }else if(this.order.pay_info.pay_status == 3) {
                        this.order.pay_info.pay_status_title = "Prepaid Success";
                    }else if(this.order.pay_info.pay_status == 5) {
                        this.order.pay_info.pay_status_title = "Already Settled";
                    }else if(this.order.pay_info.pay_status == 7) {
                        this.order.pay_info.pay_status_title = "Already Closed";
                    }
                    this.order.sell_order_list.forEach((item) => {
                        item.wholesale_order_items.forEach((value) => {
                            if(value.status == 0){
                                value.status_title = this.$t("main.order.list.mainOrLiWaitPay");
                            }else if(value.status == 1){
                                value.status_title = this.$t("main.order.list.mainOrLiRealPay");
                            }else if(value.status == 2){
                                value.status_title = this.$t("main.order.list.mainOrLiAlreadyDeli");
                            }else if(value.status == 7){
                                value.status_title = "Transaction Finished";
                            }else if(value.status == 8){
                                value.status_title = "To Be Returned to Warehouse";
                            }
                        })
                    })
                },(err) => {

                });
            }
        },
        mounted(){
            this.order.tid = this.$route.params.tid;
            this.get();
        }
    }
</script>
<style lang="less">
    .orderDetail{
        .base-info {
            margin-top: 20px;
        }

        /*.hd-info {*/
            /*margin-top: 20px;*/
        /*}*/
        /*.text {*/
            /*font-size: 14px;*/
            /*color: #666;*/
        /*}*/
        /*.item {*/
            /*margin-bottom: 18px;*/
            /*min-width:300px;*/
            /*span{*/
                /*display:inline-block;*/
                /*width:100px;*/
            /*}*/
        /*}*/
        .form-row {
            font-size: 0;
            label {
                color: #a3a3a3;
            }
            .el-form-item {
                width: 100%;
                color: #666;
                margin-right: 0;
                margin-bottom: 0;
            }
        }
        .el-card{
            border-radius: 4px;
            background-color: #fff;
            overflow: hidden;
            color: #303133;
            box-shadow: none;
            border: solid 1px #ddd;
        }
        .el-card__header{
            padding: 9px 20px;
            background-color: #f6f6f6;
            font-size: 16px;
            color: #585858;
        }
        .el-alert--info{
            background-color: #f2f8fe;
            .el-alert__content{
                font-size: 14px;
                color: #737373;
            }
        }
        .el-form-item__label{
            color: #737373;
        }
        .detail-item{
            margin-top: 24px;
            .info-box{
                display: flex;
                justify-content: space-between;
                color: #737373;
                background-color: #f2f8fe;
                height: 40px;
                align-items: center;
                padding: 0 10px;
                margin-bottom: 12px;
                .info{
                    font-size: 14px;
                    color: #737373;
                    div{
                        line-height: 28px;
                    }
                }
            }
            th{
                background-color: #f6f6f6;
            }
            td{
                border-bottom:solid 1px #dddddd;
                .order-item-detail{
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    .item {
                        width: 80px;
                        height: 80px;
                        flex-basis: 80px;
                        min-width: 80px;
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
        .info-bottom{
            margin-top: 24px;
            text-align: right;
            .text{
                margin-bottom: 12px;
            }
            label{
                width: 200px;
                text-align: right;
                display:inline-block;
                font-size: 14px;
                color: #737373;
            }
            span{
                width: 160px;
                text-align: right;
                display:inline-block;
                font-size: 14px;
                color: #ff3b41;
            }
            .large{

                span{
                    font-size: 20px;
                    font-weight: bold;
                }
            }
        }

    }

</style>
