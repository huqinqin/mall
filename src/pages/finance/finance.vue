<template>
    <div class="finance">
        <header>
            <div><i class="iconfont icon-qian1"></i>账户余额：<span class="red"  v-if="account.balance || account.balance == 0"><lts-money :money="account.balance"></lts-money></span></div>
            <div><i class="iconfont icon-qian"></i>信用余额：<span v-if="!credit.balance && credit.balance !== 0">无</span><span class="red" v-if="credit.balance"><lts-money :money="1234565"></lts-money></span><small v-if="credit.balance"> (已用信用：<span class="red"><lts-money :money="1234"></lts-money></span>)</small></div>
            <div><i class="iconfont icon-qian1"></i>账户余额：<span class="red" v-if="bonus.balance || bonus.balance == 0"><lts-money :money="bonus.balance"></lts-money></span><small class="showBonus">(<span class="blue">{{bonus.total}}</span>张)</small></div>
        </header>
        <main>
            <el-form :inline="true">
                <el-form-item label="账户类型">
                    <el-select v-model="searchForm.type" placeholder="请选择" @change="getDetail">
                        <el-option label="账户余额" value="2010101"></el-option>
                        <el-option label="账期余额" value="2010106"></el-option>
                        <el-option label="购物券" value="2010102"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="业务操作">
                    <el-select clearable v-model="searchForm.handle" placeholder="请选择" @change="getDetail">
                        <el-option v-for="item in handleData" :key="item.value" :label="item.label" :value="item.value" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间">
                    <el-date-picker
                        v-model="daterange"
                        type="daterange"
                        format="MM 月 dd 日 yyyy 年"
                        @change="getDetail"
                        :picker-options="pickerOptions"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>

                <el-form-item><el-button type="primary" @click="getDetail">查询</el-button></el-form-item>
            </el-form>
            <el-table :data="detailData" align="center">
                <el-table-column type="index" width="50" label="序号"></el-table-column>
                <el-table-column prop="date" label="操作时间" width:160></el-table-column>
                <el-table-column prop="type" label="账户类型"></el-table-column>
                <el-table-column prop="" label="收支">
                    <template slot-scope="scope">
                        <span  class="red" v-if="scope.row.direct == -1">支出</span>
                        <span  class="green" v-else-if="scope.row.direct == 1">收入</span>
                        <span  class="blue" v-else-if="scope.row.direct == 2">冻结</span>
                        <span  class="blue" v-else-if="scope.row.direct == -2">解冻</span>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="变动金额">
                    <template slot-scope="scope">
                        <span  class="red"><lts-money :money="scope.row.total"></lts-money></span>
                    </template>
                </el-table-column>
                <el-table-column prop="balance" label="当前余额">
                    <template slot-scope="scope">
                        <span  class="red bold"><lts-money :money="scope.row.balance"></lts-money></span>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注" width="320"></el-table-column>
            </el-table>
            <el-pagination
                background
                layout="prev, pager, next"
                @current-change="changePage"
                :current-page="pagination.page"
                :page-size="pagination.pageSize"
                :total="pagination.total">
            </el-pagination>
            <!--<div style="margin:100px;padding:30px;">-->
                <!--<div class="card" style="border:1px solid red;">-->

                <!--</div>-->
            <!--</div>-->
        </main>
    </div>
</template>
<script>
    import dateUtils from '@/utils/DateUtils.js'
    import financeService from '@/services/FinanceService'
    export default {
        name : 'finance',
        data(){
            return{
                daterange:[],
                account:{balance:''},
                credit:{balance:''},
                bonus:{balance:'',total:''},
                searchForm:{type:'2010101',handle:'',cdate:'',edate:'',orderBy:''},
                pagination:{page:1,pageSize:20,total:0},
                handleData:[{label:'暂无',value:'aaa'
                    },{label:'暂无',value:'bbb'
                    },{label:'暂无',value:'ccc'}],
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                tableData:[{time:'123456',type:'账期额度',sum:'13212',balance:'123456',remark:'备注-假装备注-假装是备注'
                    },{time:'123456',type:'账期额度',sum:'13212',balance:'123456',remark:'备注-假装备注-假装是备注'
                    },{time:'123456',type:'账户余额',sum:'13212',balance:'123456',remark:'备注-假装备注-假装是备注'
                    },{time:'123456',type:'账期额度',sum:'13212',balance:'123456',remark:'备注-假装备注-假装是备注'
                    }],
                detailData:[]
            }
        },
        methods:{
            // 选择分页
            changePage(page){
                this.pagination.page = page
                this.getDetail()
            },
            getDetail(){
                this.searchForm.cdate = this.daterange[0] ? new Date(this.daterange[0]).getTime() : ''
                this.searchForm.edate = this.daterange[1] ? new Date(this.daterange[1]).getTime() : ''
                for(let val in this.searchForm){
                    if(!this.searchForm[val]){
                        delete  this.searchForm[val]
                    }
                }
                financeService.getDetail(this.searchForm,this.pagination).then((data) => {
                    this.pagination.total = data.total
                    this.detailData = []
                    data.datalist.forEach((item) => {
                        switch(item.subject){
                            case 2010101:
                                item.type = '余额'
                                break
                            case 2010102:
                                item.type = '购物券'
                                break
                            case 2010106:
                                item.type = '账期'
                        }
                        item.date = dateUtils.format(new Date(parseInt(item.acc_time)))
                        item.handle = '暂无'
                        // remark里的时间戳转为时间
                        let handleDate = dateUtils.format(new Date(parseInt(item.remark.match(/\d{13}/)[0])))
                        item.remark = item.remark.replace(/\d{13}/,handleDate)
                        this.detailData.push(item)
                    })
                },(msg) => {
                    this.$ltsMessage({type:'error',message:msg.error_message})
                })
            },
            getFinance(){
                financeService.getFinance().then((data) => {
                    for(let i=0;i<data.data.acc_books.length;i++){
                        if(data.data.acc_books[i].subject == 2010101){
                            this.account.balance = data.data.acc_books[i].balance
                        }else if(data.data.acc_books[i].subject == 2010102){
                            this.bonus.balance = data.data.acc_books[i].balance
                            this.bonus.total = data.data.acc_books[i].bonus.total
                        }else if(data.data.acc_books[i].subject == 2010106){
                            this.credit.balance = data.data.acc_books[i].balance
                        }
                    }
                    // data.data.acc_books.forEach((val) => {
                    //     console.log(val.subject)
                    //     switch (val.subject){
                    //         case  2010101:
                    //             this.account.balance = val.balance
                    //             break
                    //         case  2010102:
                    //             this.bonus.balance = val.balance
                    //             this.bonus.total = val.bonus.total
                    //             break
                    //         case  2010106:
                    //             this.credit.balance = val.balance
                    //             break
                    //         default:
                    //             alert('error')
                    //     }
                    // })
                },(msg) => {
                    this.$ltsMessage({type:'error',message:msg.error_message})
                })
            }
        },
        mounted(){
            this.getFinance()
            this.getDetail()
        }
    }
</script>



<style lang="less">
    .finance{
        color:#737373;
        span.red{color:#ff3b41;}
        span.blue{color:#3d98ff;}
        span.green{color:green;}
        span.bold{font-weight: bold;}
        span.showBonus{cursor: pointer;}
        header{
            border-bottom: 1px solid #ddd;
            display: flex;
            padding-bottom: 20px;
            div{
                font-size: 16px;
                height: 32px;
                margin-right: 48px;
                i{
                    display: inline-block;
                    font-size: 32px;
                    vertical-align: middle;
                    margin-right: 12px;
                }
                i.icon-qian1,i.icon-qian{
                    color:#ff6c00;
                }

            }
        }
        main{
            padding-top: 12px;
            .el-select{width:200px;}
            .el-date-picker{width:300px;}
            .el-table{
                thead tr th{
                    background: #ecf5ff;
                    font-weight: normal;
                }
                td{
                    vertical-align: top;
                }
            }
            .el-pagination{
                text-align: end;
            }
        }
    }
</style>

