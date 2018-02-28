<template>
  <div class="credit-info">
    <el-form :model="form">
      <el-form-item label="信用卡号" prop="num">
        <el-input v-model="form.num"></el-input>
      </el-form-item>
      <el-form-item label="信用卡过期时间" prop="date">
        <el-date-picker
          v-model="form.date"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitCredit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import orderService from '@/services/OrderService.js'

  export default {
    name: 'credit-info',
    data () {
      return {
        form: {
          num: '',
          date: '',
          pay_no: ''
        }
      }
    },
    methods: {
      submitCredit () {
        this.form.date = this.form.date.getTime()
        orderService.credit_pay(this.form).then((data) => {
          alert(1234)
        }, (msg) => {
          this.$ltsMessage.show({type: 'error', message: msg.error_message})
        })
      }
    },
    mounted () {
      this.form.pay_no = this.$route.query.pay_no
    }
  }
</script>

<style lang="less">

</style>
