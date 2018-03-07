<template>
  <div class="finance">
    <header>
      <div><i class="iconfont icon-qian1"></i>{{ $t("main.finance.mainfiAccountBal") }}：
        <span class="red" v-if="account.balance || account.balance == 0"><lts-money :money="account.balance"></lts-money></span>
      </div>
      <div><i class="iconfont icon-qian"></i>{{ $t("main.finance.mainficreditBal") }}：
        <span v-if="!credit.balance && credit.balance !== 0">{{ $t("main.finance.mainfiNo") }}</span>
        <span class="red" v-if="credit.balance"><lts-money :money="credit.balance"></lts-money></span>
        <small v-if="credit.used"> ({{ $t("main.finance.mainfiUsedCredit") }}：
          <span class="red"><lts-money :money="credit.used"></lts-money></span>)
        </small>
      </div>
      <div><i class="iconfont icon-gouwuquan-copy"></i>{{ $t("main.finance.mainfiCoupon") }}：
        <span class="red" v-if="bonus.balance || bonus.balance == 0"><lts-money :money="bonus.balance"></lts-money></span>
        <small class="showBonus">(<span class="blue">{{bonus.total}}</span>{{ $t("main.finance.mainfiOneWord") }})</small>
      </div>
    </header>
    <main>
      <el-form :inline="true">
        <el-form-item :label='$t("main.finance.mainfiAccountType")'>
          <el-select v-model="searchForm.type" :placeholder='$t("main.finance.mainfiPleaseSel")' @change="getDetail">
            <el-option :label='$t("main.finance.mainfiAccountBal")' value="2010101"></el-option>
            <el-option :label='$t("main.finance.mainfiAccBalance")' value="2010106"></el-option>
            <el-option :label='$t("main.finance.mainfiCoupon")' value="2010102"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label='$t("main.finance.mainfiBussiHandle")'>
          <el-select clearable v-model="searchForm.handle" :placeholder='$t("main.finance.mainfiPleaseSel")'
                     @change="getDetail">
            <el-option v-for="item in handleData" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label='$t("main.finance.mainfiTime")'>
          <el-date-picker
            v-model="daterange"
            type="daterange"
            :format='$t("main.finance.mainfiYear")'
            @change="getDetail"
            :picker-options="pickerOptions"
            range-separator="-"
            :start-placeholder='$t("main.finance.mainfiStartTime")'
            :end-placeholder='$t("main.finance.mainfiEndTime")'>
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="getDetail">{{ $t("main.finance.mainfiSelect") }}</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="detailData" align="center">
        <el-table-column type="index" width="50" :label='$t("main.finance.mainfiNum")'></el-table-column>
        <el-table-column prop="date" :label='$t("main.finance.mainfiHandleTime")' width="160"></el-table-column>
        <el-table-column prop="type" :label='$t("main.finance.mainfiAccountType")'></el-table-column>
        <el-table-column prop="" :label='$t("main.finance.mainfiBalance")'>
          <template slot-scope="scope">
            <span class="red" v-if="scope.row.direct == -1">{{ $t("main.finance.mainfiOut") }}</span>
            <span class="green" v-else-if="scope.row.direct == 1">{{ $t("main.finance.mainfiIn") }}</span>
            <span class="blue" v-else-if="scope.row.direct == 2">{{ $t("main.finance.mainfiFrozen") }}</span>
            <span class="blue" v-else-if="scope.row.direct == -2">{{ $t("main.finance.mainfiThaw") }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="" :label='$t("main.finance.mainfiChangeMoney")'>
          <template slot-scope="scope">
            <span class="red"><lts-money :money="scope.row.total"></lts-money></span>
          </template>
        </el-table-column>
        <el-table-column prop="balance" :label='$t("main.finance.mainfiCurrent")'>
          <template slot-scope="scope">
            <span class="red bold"><lts-money :money="scope.row.balance"></lts-money></span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" :label='$t("main.finance.mainfiMark")' width="320"></el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="changePage"
        :current-page="pagination.page"
        :page-size="pagination.pageSize"
        :total="pagination.total">
      </el-pagination>
    </main>
  </div>
</template>
<script>
  import dateUtils from '@/utils/DateUtils.js'
  import financeService from '@/services/FinanceService'

  export default {
    name: 'finance',
    data () {
      return {
        daterange: [],
        account: {balance: ''},
        credit: {balance: '', used:''},
        bonus: {balance: '', total: ''},
        searchForm: {type: '2010101', handle: '', cdate: '', edate: '', orderBy: ''},
        pagination: {page: 1, pageSize: 20, total: 0},
        handleData: [{
          label: '暂无', value: 'aaa'
        }, {
          label: '暂无', value: 'bbb'
        }, {label: '暂无', value: 'ccc'}],
        pickerOptions: {
          shortcuts: [{
            text: this.$t('main.finance.mainfiLastWeek'),
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: this.$t('main.finance.mainfiLastMouth'),
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: this.$t('main.finance.mainfiLastThhreeM'),
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        tableData: [],
        detailData: []
      }
    },
    methods: {
      // 选择分页
      changePage (page) {
        this.pagination.page = page
        this.getDetail()
      },
      getDetail () {
        this.searchForm.cdate = this.daterange[0] ? new Date(this.daterange[0]).getTime() : ''
        this.searchForm.edate = this.daterange[1] ? new Date(this.daterange[1]).getTime() : ''
        for (let val in this.searchForm) {
          if (!this.searchForm[val]) {
            delete this.searchForm[val]
          }
        }
        financeService.getDetail(this.searchForm, this.pagination).then((data) => {
          this.pagination.total = data.total
          this.detailData = []
          data.datalist.forEach((item) => {
            switch (item.subject) {
              case 2010101:
                item.type = this.$t('main.finance.mainfiBalances')
                break
              case 2010102:
                item.type = this.$t('main.finance.mainfiCoupon')
                break
              case 2010106:
                item.type = this.$t('main.finance.mainfiAcc')
            }
            item.date = dateUtils.format(new Date(parseInt(item.acc_time)))
            item.handle = this.$t('main.finance.mainfiAvail')
            // remark里的时间戳转为时间
            if (parseInt(item.remark.match(/\d{13}/))) {
              let handleDate = dateUtils.format(new Date(parseInt(item.remark.match(/\d{13}/)[0])))
              item.remark = item.remark.replace(/\d{13}/, handleDate)
            }
            this.detailData.push(item)
          })
        }, (msg) => {
          this.$ltsMessage({type: 'error', message: msg.error_message})
        })
      },
      getFinance () {
        financeService.getFinance().then((data) => {
          console.log(data)
          for (let i = 0; i < data.data.acc_books.length; i++) {
            if (data.data.acc_books[i].subject === 2010101) {
              this.account.balance = data.data.acc_books[i].balance
            } else if (data.data.acc_books[i].subject === 2010102) {
              this.bonus.balance = data.data.acc_books[i].balance
              this.bonus.total = data.data.acc_books[i].bonus.total
            } else if (data.data.acc_books[i].subject === 2010106) {
              this.credit.balance = data.data.acc_books[i].rule_blc_object.limit + data.data.acc_books[i].use_balance
              this.credit.used = Math.abs(data.data.acc_books[i].use_balance)
            }
          }
        }, (msg) => {
          this.$ltsMessage({type: 'error', message: msg.error_message})
        })
      }
    },
    mounted () {
      this.getFinance()
      this.getDetail()
    }
  }
</script>


<style lang="less">
  .finance {
    color: #737373;
    span.red {
      color: #ff3b41;
    }
    span.blue {
      color: #3d98ff;
    }
    span.green {
      color: green;
    }
    span.bold {
      font-weight: bold;
    }
    header {
      border-bottom: 1px solid #ddd;
      display: flex;
      padding-bottom: 20px;
      div {
        font-size: 16px;
        height: 32px;
        margin-right: 48px;
        i {
          display: inline-block;
          font-size: 32px;
          vertical-align: middle;
          margin-right: 12px;
        }
        i.icon-qian1, i.icon-qian, i.icon-gouwuquan-copy {
          color: #ff6c00;
        }

      }
    }
    main {
      padding-top: 12px;
      .el-select {
        width: 200px;
      }
      .el-date-picker {
        width: 300px;
      }
      .el-table {
        thead tr th {
          background: #ecf5ff;
          font-weight: normal;
        }
        td {
          vertical-align: top;
        }
      }
      .el-pagination {
        text-align: end;
      }
    }
  }
</style>

