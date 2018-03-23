<template>
    <div style="display: flex;width: 100%;">
        <el-select v-model="areaCode" slot="prepend" placeholder="Select Country" @change="changeHandler">
            <el-option v-for="option in options" :key="option.value" :label="option.label" :value="option.value" />
        </el-select>
        <el-input :placeholder="placeholder" v-model="phoneNumber" class="input-with-select num" @change="changeHandler">
        </el-input>
    </div>
</template>

<script>
    /**
     * 手机、电话输入框，使用国际化号码格式 如 美国号码1-2932313423 中国号码86-13789321342
     * @Author Nation
     * @cdate 2018-03-12 22:08
     */
    import PhoneAreaCodeConfig from 'config/PhoneAreaCodeConfig'
    // 国家码与具体号码之间的分隔符
    const SEPARATOR = '-';
    export default {
        name: 'lts-input-phone',
        props: {
            placeholder: {
                type: String,
                default(){
                    return 'Please Input Number'
                }
            },
            value: String
        },
        mounted(){
            if(this.value){
                let phoneNumberArr = this.value.split(SEPARATOR);
                this.areaCode = phoneNumberArr.length === 2 ? phoneNumberArr[0] : this.options[0].value;
                this.phoneNumber = phoneNumberArr.length === 2 ? phoneNumberArr[1] : phoneNumberArr[0];
            }
        },
        data() {
            return {
                /**
                 * 国家区域码
                 */
                areaCode: '1',
                /**
                 * 国家区域内具体号码
                 */
                phoneNumber: '',
                copyValue : this.value,
                options: PhoneAreaCodeConfig,
                bussinessPhone:'',
                phoneNumNew:''
            }
        },
        computed : {
            /**
             * 全号码
             * @returns {string}
             */
            phoneNumberFull : function(){
                return this.areaCode + SEPARATOR + this.phoneNumber;
            }
        },
        methods:{
            changeHandler(){
                let arr = [];
                if(this.phoneNumber.indexOf("(") > -1){
                    arr = this.phoneNumber.split("-");
                    this.phoneNumNew = arr[0].slice(1,4) + arr[0].slice(5) + arr[1];
                }else{
                    this.phoneNumNew = this.phoneNumber;
                }
                if(this.phoneNumber.length === 10 && this.phoneNumNew.length === 10){
                    this.phoneNumber = "(" + this.phoneNumber.slice(0,3) + ")" + this.phoneNumber.slice(3,6) + "-" + this.phoneNumber.slice(6);
                }else {
                    this.phoneNumber = this.phoneNumNew;
                }
                this.$emit('input', this.phoneNumNew);
            }
        },
        watch: {
            value(newVal) {
                if (newVal) {
                    let phoneNumberArr = newVal.split(SEPARATOR);
                    this.areaCode = phoneNumberArr.length === 2 ? phoneNumberArr[0] : this.options[0].value;
                    this.phoneNumber = phoneNumberArr.length === 2 ? phoneNumberArr[1] : phoneNumberArr[0];
                }else{
                    this.phoneNumber = '';
                }
            },
        }
    }
</script>
<style lang="less">
        .el-input-group--prepend {
            /deep/ .el-input--suffix {
                width: 80px !important;
            }
        }
        /*.num{
            .el-form-item__content{
                display: flex;
                .el-select{
                    flex: 0 0 50px;
                    .el-input--suffix{
                        width: 50px!important;
                        margin-right: 10px;
                    }
                }
            }
        }*/
</style>

