<template>
    <div class="wrapper">
        <div class="box1">
            <div class="block">
                <div class="demonstration">{{$t("main.repayMent.repayList.mainRePayPayTime")}}</div>
                <el-date-picker
                    v-model="date1"
                    type="daterange"
                    :range-separator='$t("main.repayMent.repayList.mainRePayTo")'
                    :start-placeholder='$t("main.repayMent.repayList.mainRePayStartTime")'
                    :end-placeholder='$t("main.repayMent.repayList.mainRePayEndTime")'>
                </el-date-picker>
            </div>
            <div class="shouldBlock">
                <div class="demonstration">{{$t("main.repayMent.repayList.mainRePayRepayTime")}}</div>
                <el-date-picker
                    v-model="date2"
                    type="daterange"
                    :range-separator='$t("main.repayMent.repayList.mainRePayTo")'
                    :start-placeholder='$t("main.repayMent.repayList.mainRePayStartTime")'
                    :end-placeholder='$t("main.repayMent.repayList.mainRePayEndTime")'>
                </el-date-picker>
            </div>
            <div class="status">
                <div class="demonstration">{{$t("main.repayMent.repayList.mainRePayPeState")}}</div>
                <el-select v-model="value1" :placeholder='$t("main.accountNew.register.mainAcReSelect")' @change="changeValue1">
                    <el-option
                        v-for="item in options1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <el-button type="primary" size="small" class="btn1" @click="search" >{{$t("main.order.list.mainOrLiSearch")}}</el-button>
        </div>
        <el-button type="primary" @click="batchPay" style="margin-top: 10px" v-if="tableData.length !== 0">{{$t("main.repayMent.repayList.mainRePayBatch")}}</el-button>
        <el-table
            v-if="tableData.length !== 0"
            tooltip-effect="dark"
            ref="multipleTable"
            @selection-change="handleSelectionChange"
            :data="tableData"
            :default-sort = "{prop: 'date', order: 'descending'}"
            style="width: 74%;margin-top: 20px">
            <el-table-column
                v-show="this.status === 1"
                type="selection">
            </el-table-column>
            <el-table-column
                prop="changeTotal"
                :label='$t("main.repayMent.repayList.mainRePayShouldPay")'>
            </el-table-column>
            <el-table-column
                prop="out_id"
                :label='$t("main.repayMent.repayList.mainRePayRelation")'
               >
            </el-table-column>
            <el-table-column
                prop="deadlinePay"
                :label='$t("main.repayMent.repayList.mainRePayPayTime")'
                sortable
            >
            </el-table-column>
            <el-table-column
                prop="realTimePay"
                :label='$t("main.repayMent.repayList.mainRePayRepayTime")'
                sortable
            >
            </el-table-column>
            <el-table-column
                prop="payStatus"
                :label='$t("main.order.detail.mainOrDeStatus")'>
            </el-table-column>
            <el-table-column
                :label='$t("main.order.list.mainOrLiHanlde")'>
                <template slot-scope="scope">
                    <el-button  @click="handleClick(scope.row)" type="primary" size="small" v-if="scope.row.status === 1">还款</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import MonyManageService from '@/services/MonyManageService.js'
    export default {
        name: "list",
        methods:{
            batchPay(){
                this.$router.push({name:'readyPay',params:this.multipleSelection});
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            changeValue1(){
                if(this.value1 === this.$t("main.order.list.mainOrLiRealPay")){
                    this.status = 2;
                }else if(this.value1 === this.$t("main.repayMent.repayList.mainRePayNoPay")){
                    this.status = 1;
                }else if(this.value1 === this.$t("comHeader.headerAll")){
                    this.status = 0;
                }
            },
            handleClick(row) {
                this.$router.push({name:'readyPay',params:[row]});
            },
            getDate(tm){
                var tt = new Date(tm).toLocaleString().replace(/\//g, "-");
                return tt;
            },
            search(){
                let date1 = Date.parse(new Date(this.date1[0])) ? Date.parse(new Date(this.date1[0])) : '';
                let date2 = Date.parse(new Date(this.date1[1])) ? Date.parse(new Date(this.date1[1])) : '';
                let date3 = Date.parse(new Date(this.date2[0])) ? Date.parse(new Date(this.date2[0])) : '';
                let date4 = Date.parse(new Date(this.date2[1])) ? Date.parse(new Date(this.date2[1])) : '';
                let params = {};
                if(date1 == ''|| date1 == 'NaN' || date1 == "undifined"){
                }else{
                    params.deadlint_start = date1;
                }
                if(date2===''||date2==='NaN'||date2==="undifined"){
                }else{
                    params.deadlint_end = date2;
                }
                if(date3===''||date3==='NaN'||date3==="undifined"){
                }else{
                    params.real_time_start = date3;
                }
                if(date4===''||date4==='NaN'||date4==="undifined"){
                }else{
                    params.real_time_end = date4;
                }
                if(this.status===''||this.status === 0||this.status==="undifined" ||this.status==="NaN"){}else{
                    params.repay_status = this.status;
                }
                MonyManageService.getMoney(params).then((data) => {
                    this.tableData = data.datalist;
                    this.tableData.forEach((item) => {
                        item.deadlinePay = this.getDate(item.deadline);
                        item.realTimePay = this.getDate(item.real_time);
                        item.changeTotal = item.total / 100;
                        if(item.status === 1){
                            item.payStatus = this.$t("main.repayMent.repayList.mainRePayNoRepay");
                            item.realTime = '';
                        }else if(item.status === 2){
                            item.payStatus = this.$t("main.repayMent.repayList.mainRePayRepayed");
                        }
                    })
                });
            }
        },
        refresh(){
            location.reload();
        },
        data(){
            return{
                multipleSelection: [],
                status:'',
                id:'',
                keywords:'',
                input:'',
                input1:'',
                options: [],
                options1: [{
                    value: this.$t("main.order.list.mainOrLiRealPay"),
                    label: this.$t("main.order.list.mainOrLiRealPay")
                }, {
                    value: this.$t("main.repayMent.repayList.mainRePayNoPay"),
                    label: this.$t("main.repayMent.repayList.mainRePayNoPay"),
                }, {
                    value: this.$t("comHeader.headerAll"),
                    label: this.$t("comHeader.headerAll"),
                }],
                value: '',
                value1: '',
                selectedOptions: [],
                date1: '',
                date2: '',
                pagination :{
                    page:1,
                    pageSize:100
                },
                tableData: [],
            }
        },
        mounted(){
        }
    }
</script>

<style lang="less">
    .wrapper{
        margin-left: 24px;
        font-family: "Microsoft YaHei";
        font-size: 14px;
        color: rgba(0,0,0,0.7);
        .box{
            display: flex;
            .company{
                .el-input__inner{
                    width: 350px;
                }
            }
            .block{
                margin-left: 10px;
            }
        }
        .box1{
            display: flex;
            align-items: center;
            margin-top: 10px;
            position: relative;
            .status{
                margin-left: 10px;
            }
            .shouldBlock{
                margin-left: 10px;
            }
            .block{}
            .btn1{
                height: 100%;
                margin-left: 10px;
                position: absolute;
                bottom: 0;
                right:20%;
                height: 40px;
            }
            .demonstration{
                margin-bottom: 10px;
            }
        }
        .el-table th{
            background-color: #eef6ff!important;
        }
        .el-table__fixed-header-wrapper tr{
            background-color: green !important;
        }
        /*.el-table--border th:first-child .cell{
            display: none;
        }*/
    }
</style>
