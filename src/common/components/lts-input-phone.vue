<template>
    <el-input :placeholder="placeholder" v-model="phoneNumber" class="input-with-select" @change="changeHandler">
        <el-select v-model="areaCode" slot="prepend" placeholder="请选择国家" @change="changeHandler">
            <el-option v-for="option in options" :key="value" :label="option.label" :value="option.value" />
        </el-select>
    </el-input>
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
                    return '请输入号码'
                }
            },
            value: String
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
                options: PhoneAreaCodeConfig
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
                this.$emit('input', this.phoneNumberFull);
            }
        },
        watch:{
            // value(newVal){
            //     if (newVal) {
            //         debugger;
            //         let phoneNumberArr = newVal.split(SEPARATOR);
            //         this.areaCode = phoneNumberArr.length === 2 ? phoneNumberArr[0] : this.options[0].value;
            //         this.phoneNumber = phoneNumberArr.length === 2 ? phoneNumberArr[1] : phoneNumberArr[0];
            //     }
            // },
            value : {
                deep:true,
                handler:(val)=>{
                    console.log(val);
                    let phoneNumberArr = val.split(SEPARATOR);
                    this.areaCode = phoneNumberArr.length === 2 ? phoneNumberArr[0] : this.options[0].value;
                    this.phoneNumber = phoneNumberArr.length === 2 ? phoneNumberArr[1] : phoneNumberArr[0];
                }
            }
        },
    }
</script>
<style scoped lang="less">
        .el-input-group--prepend {
            /deep/ .el-input--suffix {
                width: 80px !important;
            }
        }
</style>

