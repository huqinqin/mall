<template>
    <div style="display: flex;width: 100%;">
        <el-select v-model="areaCode" slot="prepend" placeholder="Select Country" @change="changeHandler">
            <el-option v-for="option in options" :key="option.value" :label="option.label" :value="option.value"/>
        </el-select>
        <el-input :placeholder="placeholder" v-model="clone_phoneNumber" class="input-with-select num" @change="changeHandler">
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
                default() {
                    return 'Please Input Number'
                }
            },
            value: String
        },
        mounted() {
            if (this.value) {
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
                options: PhoneAreaCodeConfig,
                bussinessPhone:'',
                phoneNumNew:'',
                clone_phoneNumber : '',
            }
        },
        computed: {
            /**
             * 全号码
             * @returns {string}
             */
            phoneNumberFull: function () {
                if (this.phoneNumber == '') {
                    return '';
                } else {
                    return this.areaCode + SEPARATOR + this.phoneNumber;
                }
            }
        },
        methods:{
            changeHandler(){
                console.log(this.phoneNumber);
                this.$emit('input', this.phoneNumberFull);
            }
        },
        watch: {
            value(newVal) {
                if (newVal && newVal != '1-') {
                    let phoneNumberArr = newVal.split(SEPARATOR);
                    this.areaCode = phoneNumberArr.length === 2 ? phoneNumberArr[0] : this.options[0].value;
                    this.phoneNumber = phoneNumberArr.length === 2 ? phoneNumberArr[1] : phoneNumberArr[0];
                } else {
                    this.phoneNumber = '';
                }
            },
            clone_phoneNumber(newVal,oldVal){
                let phone = newVal.replace(/[^0-9]/ig,"");
                if(newVal && oldVal != newVal){
                    if(phone.length != 10 && newVal.indexOf("(") > -1){
                        let arr = newVal.split("-");
                        this.clone_phoneNumber = arr[0].slice(1,4) + arr[0].slice(5) + arr[1];
                    }
                    if(newVal.length === 10){
                        this.clone_phoneNumber = "(" + newVal.slice(0,3) + ")" + newVal.slice(3,6) + "-" + newVal.slice(6);
                    }
                }
                if( phone.length == 10){
                    this.phoneNumber = phone;
                }else{
                    this.phoneNumber = newVal;
                }
            }
        }
    }
</script>
<style scoped lang="less">
    .el-input-group--prepend {
        /deep/ .el-input--suffix {
            width: 80px !important;
        }
    }
</style>

