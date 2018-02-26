<template>
    <div class="orderList">
        <lts-search-form @get-from="getParameter" :form-fileds="form.formFileds" :form-inlines="form.formInline" ref="searchForm"/>
        <el-table :data="datalist" v-loading="loading" default-expand-all style="width: 100%;overflow: hidden;" class="order-table" :span-method="arraySpanMethod">
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <div v-for="(order,index) in scope.row.sell_order_list">
                        <el-table :data="order.wholesale_order_items" :show-header="showHeader" style="width: 100%" >
                            <el-table-column align="left" :show-overflow-tooltip="true">
                                <template slot-scope="subscope">
                                    <div class="item-info">
                                        <div class="order-item-detail">
                                            <img :src="subscope.row.wholesale_item_d_o.image_value + '@100w_2e'" class="item" />
                                            <div>{{subscope.row.wholesale_item_d_o.item_name}}</div>
                                        </div>
                                        <div class="prop-box">
                                            <div v-for="(propObj,index) in subscope.row.propValue">
                                                   <div v-for="(prop,key) in propObj">
                                                       <i>{{key}}:{{prop}}</i>
                                                   </div>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column width="100">
                                <template slot-scope="subscope">
                                    <!--<del class="text-secondary" v-if="subscope.row.pay > subscope.row.pay_real">-->
                                        <!--<lts-money :money="subscope.row.pay"></lts-money>-->
                                    <!--</del>-->
                                    <div style="color: #ff3b41;"><lts-money :money="subscope.row.price"></lts-money></div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="num" width="100">
                                <template slot-scope="subscope">{{subscope.row.num}}{{subscope.row.wholesale_item_d_o.unit}}</template>
                            </el-table-column>
                            <el-table-column prop="hd_status_title" width="160">
                                <template slot-scope="subscope">
                                    <div style="color: #ff3b41;"><lts-money :money="subscope.row.pay_real"></lts-money></div>
                                    <del class="text-secondary" v-if="subscope.row.pay > subscope.row.pay_real">
                                        <lts-money :money="subscope.row.pay"></lts-money>
                                    </del>
                                    <!--<div>含运费:<lts-money :money="1"></lts-money></div>-->
                                    <!--<div>含税费:<lts-money :money="2"></lts-money></div>-->
                                </template>
                            </el-table-column>
                            <el-table-column prop="status_title" width="118">
                                <template slot-scope="subscope">
                                    <span v-if="subscope.row.status == 9">
                                        {{subscope.row.closed_reason_title}}
                                    </span>
                                    <span v-else>
                                        <span v-if="subscope.row.last_refund_status == 1">
                                            退款申请中
                                        </span>
                                        <span v-else-if="subscope.row.last_refund_status == 3">
                                            退款已驳回
                                        </span>
                                        <span v-else-if="subscope.row.last_refund_status == 7">
                                            已退{{subscope.row.refund_num}}{{subscope.row.wholesale_item_d_o.unit}}<lts-money :moeny="subscope.row.refund_real"></lts-money>元
                                        </span>
                                        <span v-else-if="subscope.row.last_refund_status == 9">
                                            退款已关闭
                                        </span>
                                        <span v-else>
                                            {{subscope.row.status_title}}
                                        </span>
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column width="130" align="center">
                                <template slot-scope="subscope">
                                    <!--<el-dropdown @command="handleMenuItemClick">-->
                                    <!--<span class="el-dropdown-link">-->
                                        <!--操作<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
                                    <!--</span>-->
                                        <!--&lt;!&ndash;<el-dropdown-menu slot="dropdown">&ndash;&gt;-->
                                            <!--&lt;!&ndash;<el-dropdown-item command="refund" :data="subscope.row" v-if="isCanRefund(subscope.row)">退货退款</el-dropdown-item>&ndash;&gt;-->
                                            <!--&lt;!&ndash;<el-dropdown-item command="refund" :data="subscope.row" v-if="isCanRefund(subscope.row)">退货退款</el-dropdown-item>&ndash;&gt;-->
                                        <!--&lt;!&ndash;</el-dropdown-menu>&ndash;&gt;-->
                                        <!--<el-button type="text">退款/退货</el-button>-->
                                    <!--</el-dropdown>-->
                                    <el-button type="text" class="probtn" size="mini"  v-if="isCanRefund(subscope.row)" ><router-link :to="'/reverseApply/' + subscope.row.tid">退货退款</router-link></el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </template>
            </el-table-column>
            <el-table-column  label="商品信息" align="left">
                <template slot-scope="scope">
                    <div>
                        <span>{{scope.row.cdate | timestamp2str}}</span>
                        <span>订单号:{{scope.row.tid}}</span>
                        <span style="color: #3b98ff;">支付信息</span>
                        <span style="font-size: 12px">手机下单</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="单价" header-align="left" align="left" width="100" :show-overflow-tooltip="true" />
            <el-table-column label="数量" header-align="left" align="left" width="100">
            </el-table-column>
            <el-table-column prop="pay_info.pay_type_title" label="实付款" align="left" width="160">
                <template slot-scope="scope">
                    <div><lts-money :money="scope.row.pay_real"></lts-money></div>
                </template>
            </el-table-column>
            <el-table-column prop="status_title" label="交易状态" align="left" width="118">
                <template slot-scope="scope">
                    <span type="success" v-if="scope.row.status == 7 || scope.row.status == 9">
                        {{scope.row.status_title}}
                    </span>
                    <span v-else>{{scope.row.status_title}}</span>
                </template>
            </el-table-column>
            <el-table-column label="交易操作" align="center" width="130">
                <template slot-scope="scope">
                    <el-dropdown @command="handleMenuItemClick">
                        <el-button size="small" type="primary">
                            操作<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-if="scope.row.pay_status == 0 &&  scope.row.status == 0">支付</el-dropdown-item>
                            <el-dropdown-item v-if="scope.row.pay_status == 0 &&  scope.row.status == 0" command="close" :data="scope.row">订单取消</el-dropdown-item>
                            <el-dropdown-item><router-link :to="'/detail/' + scope.row.tid">订单详情</router-link></el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>
        <!--<reverse-apply :visible.sync="dialogVisible" v-bind:order-item="refundOrder" v-bind:installer="refundInstaller" v-bind:item="refundItem" />-->
    </div>
</template>
<script>
    import {dateUtils} from 'ltsutil'
    import {ltsSearchForm} from 'ui'
    import reverseApply from './reverse-apply'
    import orderService from '@/services/OrderService'
    import config from 'config'
    export default {
        components: {
            ltsSearchForm, reverseApply
        },
        data() {
            return {
                loading: true,
                dialogVisible: false,
                datalist: [],
                refundOrder: {},
                refundInstaller:{},
                refundItem:{},
                showHeader: false,
                params: {
                  /*  tid: '',
                    status: '',
                    start_time: '',
                    end_time: '',*/
                },
                form: {
                    formFileds: [
                        {
                            search: {
                                tid: {
                                    label: '订单号',
                                    type: 'input',
                                    bindValue : 'tid',
                                    bindPlaceholder: '订单号'
                                },
                                date: {
                                    label: '创建时间',
                                    type: 'datetimerange',
                                    bindValue: 'date'
                                },
                                status: {
                                    label: "状态",
                                    type: "select",
                                    bindValue: "status",
                                    bindPlaceholder: "请选择",
                                    children: [
                                        {label: "所有状态", bindValue: ""},
                                        {label: "等待付款", bindValue: "0"},
                                        {label: "已付款", bindValue: "1"},
                                        {label: "已完成", bindValue: "7"},
                                        {label: "已关闭", bindValue: "9"}
                                    ]
                                },
                                search: {bindValue: "搜索", type: "submitbutton"}
                            }
                        }
                    ],
                    // 若需要把form参数供其他组件使用。需要把这些参数传给使用的组件
                    formInline: {
                        tid: '',
                        status: '',
                        date: dateUtils.getNearMonth(),
                    },
                },
                pagination: {
                    page: 1,
                    pagesize: 10,
                    total: 0,
                    sizes: [10, 20, 30,40],
                    layout: "total, sizes, prev, pager, next, jumper" // total 总条目数  prev 上一页 next 下一页 sizes 支持分组
                },
            }
        },
        methods: {
            handleMenuItemClick(command, data) {
                let order;

                switch (command) {
                    case "accept":
                        order = data.$vnode.data.attrs.data;
                        orderService.accept(order.tid).then((resp)=>{
                            this.$ltsMessage.show({type: 'success', message: "受理成功"});
                        }, (err) => {
                            this.$ltsMessage.show({type: 'success', message: "受理失败：" + err.error_message});
                        });
                        break;
                    case "reject":
                        order = data.$vnode.data.attrs.data;
                        this.$ltsMessage.show({type: 'success', message: "拒绝" + order.tid});
                        break;
                    case "refund":
                        const orderItem = data.$vnode.data.attrs.data;
                        this.showRefundOrderItem(orderItem);
                        break;
                    case "pay":
                        let return_url = '/customerorder#/finish';
                        let fail_url = '/customerorder#/fail';
                        order = data.$vnode.data.attrs.data;
                        window.open(config.url.main + '/cart#/beforePay?tid=' + order.tid + '');
                        break;
                    case "close":
                        this.$confirm('是否删除订单?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() =>{
                            order = data.$vnode.data.attrs.data;
                            orderService.close_by_tid(order.tid).then((data)=>{
                                this.$ltsMessage.show({type:'success',message:'删除成功'});
                                this.search();
                            },(msg)=>{
                                this.$ltsMessage.show({type:'error',message:msg.error_message})
                            })
                        });
                        break;
                    default:
                        break;
                }
            },
            arraySpanMethod({ row, column, rowIndex, columnIndex }) {

            },
            showRefundOrderItem(orderItem){
                this.dialogVisible = true;
                this.refundOrder = orderItem;
                this.refundInstaller = orderItem.customer;
                this.refundItem = orderItem.wholesale_item_d_o;
            },
            onSubmitRefund(){
                this.$ltsMessage.show({type: 'success', message: "退货退款申请成功"});
            },
            isCanRefund(orderItem){
                return (orderItem.status == 2 || orderItem.status == 7)
                    && (orderItem.hd_status == 5 || orderItem.hd_status == 10)
                    && ((orderItem.refund_status & 4) == 0 && (orderItem.refund_status & 256) == 0);
            },
            isCanDeal(order){
                return order.pay_type == 3 && order.status == 0;
            },
            isCanPay(order){
                return order.pay_status == 0;
            },
            search() {
                let param = {};
                for(let key in this.params){
                    if(this.params[key] == '' || this.params[key] == undefined || this.params[key] == null){

                    }else{
                        param[key] = this.params[key];
                    }
                }
                orderService.getList(param, this.pagination.page, this.pagination.page_size, 'cdate desc').then((resp) => {
                    this.loading = false;
                    resp.datalist.forEach((value,index,array)=>{
                        value.sell_order_list.forEach((sell,i,array)=>{
                            sell.wholesale_order_items.forEach((item,key,array)=>{
                                item.propValue = JSON.parse(item.props)
                            })
//                            value.hd_status = sell.wholesale_order_items[0].hd_status;
//                            value.hd_status_title = sell.wholesale_order_items[0].hd_status_title;
                        })
                    })
                    this.datalist = resp.datalist;
                    this.pagination.total = resp.total;
                }, (err) => {
                    this.loading = false;
                    this.datalist = [];
                    this.pagination.total = 0;
                    this.$ltsMessage.show({type: 'error', message: '查询失败，请稍后重试:' + err.error_message})
                });
            },
            getParameter (val) {
                this.search()
            },
            syncFormParam() {
                if (this.form.formInline.date.length > 0) {
                    this.params.start_time = this.form.formInline.date[0];
                    this.params.end_time = this.form.formInline.date[1];
                }
                if(this.form.formInline.tid){
                    this.params.tid = this.form.formInline.tid;
                }
                this.params.status = this.form.formInline.status;
                /*this.params.item_name = this.form.formInline.item_name;*/
            },
            handleSizeChange(val) {
                this.pagination.pageSize = val;
                this.search()
            },
            handleCurrentChange(val) {
                this.pagination.page = val;
                this.search()
            },
            reveresApply(data){debugger;
              this.$router.push({name:'reverseApply',parmas:{order : data}})
            },
        },
        mounted() {
            this.search();
        },
        created() {
            this.syncFormParam();
        },
        watch: {
            form: {
                handler: function () {
                    this.syncFormParam();
                },
                deep: true
            }
        }
    }
</script>
<style lang="less">
    .orderList{
        position: relative;
        .el-form{
            display: flex;
            align-items: center;
            .bizitem:last-child{
                margin-right: 0px !important;
            }
        }
        .bizitem{
            margin-right: 24px;
            width: 200px;
            .el-select,el-input{
                width:100%;
            }
            input{
                border:solid 1px #b2b2b2;
            }
        }
        .el-dropdown-link {
            cursor: pointer;
            color: #409eff;
        }
        .probtn:hover{
            color: #fff;
            background-color: #409EFF;
            border-color: #409EFF;
            padding: 4px 12px;
        }
        .order-table{
            th{
                background-color: #f6f6f6;
                margin-bottom: 12px;
                padding: 9px 0;
            }
            .el-table__body-wrapper{
                margin-top: 10px;
            }
            .expanded{
                background-color: #eef6ff !important;
                color: #979da3;
                height: 40px;
                td{
                    border-bottom: none;
                }
            }
            .el-tabs__content{
                padding: 0;
                border-right: 1px solid #b2b2b2;
            }
            .el-tabs--border-card{
                border: 1px solid #b2b2b2;
                border-top:none;
                border-right: none;
                box-shadow: none;
                background: transparent;
                .el-tabs__header{
                    background: transparent;
                    border-bottom: 1px solid #b2b2b2;
                }
                .el-tabs__item{
                    border:none;
                    border-right:1px solid #b2b2b2;
                    border-bottom:1px solid #b2b2b2;
                    border-top:1px solid #b2b2b2;
                    margin: auto;
                }
                .el-tabs__item.is-active {
                    color: #409EFF;
                    background-color: #fff;
                    border-bottom:none;
                }
            }
            .el-table__expanded-cell{
                padding: 0px;
                .el-table__body-wrapper{
                    margin-top: 0;
                }
                td{
                    padding: 4px 0;
                    color: #585858;
                    .item-info{
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;
                        .order-item-detail{
                            display: flex;
                            align-items: center;
                            justify-content: flex-start;
                            .item {
                                width: 80px;
                                height: 80px;
                                margin-right: 5px;
                            }
                            div{
                                width: 250px;
                                overflow: hidden;
                                display: -webkit-box;
                                -webkit-line-clamp: 2;
                                -webkit-box-orient: vertical;
                                word-break: break-all;
                            }
                        }
                        .prop-box{
                            display: inline-block;
                            min-width: 100px;
                            margin-left: 10px;
                        }
                    }

                }
                i{
                    font-style:normal
                }
            }
        }

    }

</style>
