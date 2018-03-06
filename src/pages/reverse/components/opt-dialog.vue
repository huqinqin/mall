<template>
    <el-dialog
        :title='$t("main.reverse.dialog.mainRevDiaReturnHandle")'
        :visible.sync="show"
        width="800px">
        <el-form label-position="left" size="small" label-width="110px" class="detail-info">
            <el-form-item :label='$t("main.reverse.dialog.mainRevDiaOrderNum")'>
                {{reverse.tid}}
            </el-form-item>
            <el-form-item :label='$t("main.reverse.dialog.mainRevDiaEngineer")'>
                {{reverse.user_name}}
            </el-form-item>
            <el-form-item :label='$t("main.reverse.dialog.mainRevDiaGoodsName")'>
                {{reverse.item_remark.item_name}}
            </el-form-item>
            <el-form-item :label='$t("main.reverse.dialog.mainRevDiaSize")'>
                {{reverse.item_remark.spec}}
            </el-form-item>
            <el-form-item :label='$t("main.reverse.dialog.mainRevDiaPrice")'>
                <lts-money :money="reverse.item_remark.price"></lts-money>
            </el-form-item>
            <el-form-item :label='$t("main.reverse.dialog.mainRevDiaOldNum")'>
                {{reverse.item_remark.num}}
            </el-form-item>
            <el-form-item :label='$t("main.reverse.dialog.mainRevDiaReason")'>
                {{reverse.reverse_reason_title}}
            </el-form-item>
            <el-form-item :label='$t("main.reverse.dialog.mainRevDiaDetail")'>
                <div v-if="reverse.reverse_remark.stockout_item">
                    {{$t("main.reverse.dialog.mainRevDiaNotEnough")}}:{{reverse.reverse_remark.stockout_item.num}}{{reverse.reverse_remark.stockout_item.unit}}
                </div>
                <div v-if="reverse.reverse_remark.return_item">
                    {{$t("main.reverse.dialog.mainRevDiaReturn")}}:{{reverse.reverse_remark.return_item.num}}{{reverse.reverse_remark.return_item.unit}}
                </div>
            </el-form-item>
            <el-form-item :label='$t("main.reverse.dialog.mainRevDiaTalk")'>
                <div v-for="(remark, index) in reverse.remark" :key="index">
                    <span v-if="remark.uid == reverse.user_id">{{$t("main.reverse.dialog.mainRevDiaEngineer")}}<i class="el-icon-caret-left" style="color: #909399"></i><el-tag type="info">{{remark.remark}} {{remark.date}}</el-tag></span>
                    <span v-if="remark.uid == reverse.carrier_uid"><el-tag>{{remark.remark}} {{remark.date}}</el-tag><i class="el-icon-caret-right" style="color: #409EFF"></i>门店</span>
                </div>
                <el-input type="textarea" v-model="form.remark" style="margin-top: 10px;" />
            </el-form-item>
            <el-form-item :label='$t("main.reverse.dialog.mainRevDiaHandleRecord")'>
                <div v-for="(remark, index) in reverse.deal_remark" :key="index">
                    <span v-if="remark.uid == reverse.user_id">{{$t("main.reverse.dialog.mainRevDiaEngineer")}}<i class="el-icon-caret-left" style="color: #909399"></i><el-tag type="info">{{remark.remark}} {{remark.date}}</el-tag></span>
                    <span v-if="remark.uid == reverse.carrier_uid"><el-tag>{{remark.remark}} {{remark.date}}</el-tag><i class="el-icon-caret-right" style="color: #409EFF"></i>门店</span>
                </div>
                <el-input type="textarea" v-model="form.deal_remark" style="margin-top: 10px;" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">{{optBtnName}}</el-button>
                <el-button @click="show = false">{{$t("main.reverse.dialog.mainRevDiaCancle")}}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
    import reverseService from '@/services/ReverseService';
   /* let optTypeConstant = {
        EDIT : {name:'edit', btn: this.$t("main.reverse.dialog.mainRevDiaAlert"), value: null},
        IN_WAREHOUSE : {name:'in_warehouse', btn: this.$t("main.reverse.dialog.mainRevDiaReturnStore"), value: 2},
        OUT_WAREHOUSE : {name:'out_warehouse', btn: this.$t("main.reverse.dialog.mainRevDiaReturnStroge"), value: 4},
        REJECT : {name:'reject', btn: this.$t("main.reverse.dialog.mainRevDiaReject"), value: 3},
        CLOSE : {name:'close', btn: this.$t("main.reverse.dialog.mainRevDiaCloseAll"), value: 9},
        REMARK : {name:'remark', btn: this.$t("main.reverse.dialog.mainRevDiaReturnTalk"), value: 0},
    };*/
    export default {
        name: "opt-dialog",
        props: {
            visible: Boolean,
            optType: String,
            reverse: {
                type:Object,
                default(){
                    return {
                        item_remark: {item_name:'',spec:'',price:'',num:0},
                        reverse_remark:{
                            stockout_item: {},
                            return_item: {},
                        }
                    }
                }
            },
        },
        computed:{
            optBtnName(){
                let optTypeConstant = {
                    EDIT : {name:'edit', btn: this.$t("main.reverse.dialog.mainRevDiaAlert"), value: null},
                    IN_WAREHOUSE : {name:'in_warehouse', btn: this.$t("main.reverse.dialog.mainRevDiaReturnStore"), value: 2},
                    OUT_WAREHOUSE : {name:'out_warehouse', btn: this.$t("main.reverse.dialog.mainRevDiaReturnStroge"), value: 4},
                    REJECT : {name:'reject', btn: this.$t("main.reverse.dialog.mainRevDiaReject"), value: 3},
                    CLOSE : {name:'close', btn: this.$t("main.reverse.dialog.mainRevDiaCloseAll"), value: 9},
                    REMARK : {name:'remark', btn: this.$t("main.reverse.dialog.mainRevDiaReturnTalk"), value: 0},
                };
                for (let i in optTypeConstant) {
                    if (optTypeConstant[i].name === this.optType) {
                        return optTypeConstant[i].btn;
                    }
                }
                return '';
            }
        },
        data() {
            return {
                show: this.visible,
                form:{
                    remark: '',
                    deal_remark: '',
                },
            }
        },
        methods: {
            getOptValue(){
                let optTypeConstant = {
                    EDIT : {name:'edit', btn: this.$t("main.reverse.dialog.mainRevDiaAlert"), value: null},
                    IN_WAREHOUSE : {name:'in_warehouse', btn: this.$t("main.reverse.dialog.mainRevDiaReturnStore"), value: 2},
                    OUT_WAREHOUSE : {name:'out_warehouse', btn: this.$t("main.reverse.dialog.mainRevDiaReturnStroge"), value: 4},
                    REJECT : {name:'reject', btn: this.$t("main.reverse.dialog.mainRevDiaReject"), value: 3},
                    CLOSE : {name:'close', btn: this.$t("main.reverse.dialog.mainRevDiaCloseAll"), value: 9},
                    REMARK : {name:'remark', btn: this.$t("main.reverse.dialog.mainRevDiaReturnTalk"), value: 0},
                };
                for (let i in optTypeConstant) {
                    if (optTypeConstant[i].name === this.optType) {
                        return optTypeConstant[i].value;
                    }
                }
                return null;
            },
            onSubmit(){
                let optType = this.getOptValue();
                if (optType == null) {
                    this.$ltsMessage.show({type: 'error', message: this.$t("main.reverse.dialog.mainRevDiaNotSupport")});
                    return;
                }
                reverseService.operate(this.reverse.id, this.reverse.user_id, optType, this.form.remark, this.form.deal_remark).then((resp)=>{
                    this.$ltsMessage.show({type: 'success', message: this.optBtnName + this.$t("main.reverse.dialog.mainRevDiaHandleSucc")});
                },(error)=>{
                    this.$ltsMessage.show({type: 'error', message: this.optBtnName + this.$t("main.reverse.dialog.mainRevDiaHandleErr") + ":" + error.error_message});
                });
            }
        },
        watch: {
            visible() {
                if (this.visible) {
                    this.show = this.visible;
                }
            },
            show() {
                if (!this.show) {
                    this.form.remark = '';
                    this.form.deal_remark = '';
                    this.$emit('update:visible', this.show);
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .detail-info {
        label {
            color: #99a9bf;
        }
        .el-form-item {
            margin-bottom: 5px;
        }
    }
</style>
