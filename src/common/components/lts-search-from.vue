<template>
    <div>
        <div v-for="(bar,key) in formFileds" :key="key">
            <div v-for="(menubar,menukey) in bar">
                <el-form :inline="true" :label-position="position"  :model="formInline"  class="demo-form-inline" if="formInline">
                    <el-form-item v-for="(val,key) in menubar" :label="val.label" :key="val.bindValue">
                        <div v-if="val.type == 'datetimerange'">
                            <el-date-picker
                                v-model="formInline[val.bindValue]"
                                type="datetimerange"
                                :range-separator='$t("common.searchFrom.comSearRange")'
                                :start-placeholder='$t("common.searchFrom.comSearStartTime")'
                                :end-placeholder='$t("common.searchFrom.comSearEndTime")'
                                value-format="yyyy-MM-dd HH:mm:ss"
                                format="MM-dd-yyyy HH:mm:ss"
                                :picker-options="datePickerOptions"
                                align="right">
                            </el-date-picker>
                        </div>
                        <div v-if="val.type == 'datetime'">
                          <el-date-picker
                            v-model="formInline[val.bindValue]"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            format="MM-dd-yyyy HH:mm:ss"
                            :placeholder='$t("common.searchFrom.comSearSelectTime")'>
                          </el-date-picker>
                        </div>
                        <div v-if="val.type == 'date'">
                          <el-date-picker
                            v-model="formInline[val.bindValue]"
                            type="date"
                            value-format="yyyy-MM-dd"
                            format="MM-dd-yyyy"
                            :placeholder='$t("common.searchFrom.comSearSelectDate")'
                            style="width: 150px">
                          </el-date-picker>
                        </div>
                        <div v-else-if="val.type == 'input'">
                            <el-input v-model="formInline[val.bindValue]" :placeholder="val.bindPlaceholder"
                                      :style="{width:val.width}"></el-input>
                        </div>
                        <div v-else-if="val.type == 'autocomplete'">
                            <el-autocomplete
                                class="inline-input"
                                id="ltsFormAutocomplete"
                                ref="ltsFormAutocomplete"
                                v-model="formInline[val.bindValue]"
                                :fetch-suggestions="querySearch"
                                :placeholder="val.bindPlaceholder"
                                :trigger-on-focus="false"
                                :key="val.bindValue"
                                @select="handleSelect"
                            ></el-autocomplete>
                        </div>
                        <div v-else-if="val.type == 'select'">
                            <el-select v-model="formInline[val.bindValue]" @change="selectChange" :placeholder="val.bindPlaceholder">
                                <el-option v-for="(opt,index) in val.children" :label="opt.label" :key="opt.bindValue"
                                           :value="opt.bindValue"></el-option>
                            </el-select>
                        </div>
                        <div v-else-if="val.type === 'cascader'">
                            <el-cascader
                                v-model="formInline[val.bindValue]"
                                :placeholder="val.bindPlaceholder"
                                expand-trigger="hover"
                                @change="cascAderHandleChange"
                                :options="val.options">
                            </el-cascader>
                        </div>
                        <div v-else-if="val.type == 'searchbutton'">
                            <el-button type="primary" @click="onSubmit" icon="el-icon-search">{{val.bindValue}}
                            </el-button>
                        </div>
                        <div v-else-if="val.type == 'submitbutton'">
                            <el-button type="primary" @click="onSubmit">{{val.bindValue}}</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    import {request, dateUtils} from 'ltsutil'

    export default {
        name: 'lts-form',
        props: {
            formInlines : Object,
            formFileds : Array,
            autocomplete: Object,
            cascader: Object,
            labelPosition:{
                type : String,
                default : "top"
            }
        },
        data() {
            return {
                datelist: '',
                formInline: this.formInlines,
                formFiled: this.formFileds,
                autoComplete: this.autocomplete,

                restaurants: [],
                state1: '',
                state2: '',
                position : this.labelPosition,
                datePickerOptions: {
                    shortcuts: [
                        {
                            text: this.$t('main.finance.mainfiLastWeek'),
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                picker.$emit('pick', [start, end]);
                            }
                        }, {
                            text: this.$t('main.finance.mainfiLastMouth'),
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                picker.$emit('pick', [start, end]);
                            }
                        }, {
                            text: this.$t('main.finance.mainfiLastThhreeM'),
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                picker.$emit('pick', [start, end]);
                            }
                        }
//                        , {
//                            text: '最近半年',
//                            onClick(picker) {
//                                const end = new Date();
//                                const start = new Date();
//                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
//                                picker.$emit('pick', [start, end]);
//                            }
//                        }, {
//                            text: '最近一年',
//                            onClick(picker) {
//                                const end = new Date();
//                                const start = new Date();
//                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
//                                picker.$emit('pick', [start, end]);
//                            }
//                        }
                    ]
                }
            }
        },
        mounted() {

        },
        methods: {
            onSubmit() {
                if (this.datelist) {
                    this.formInline.start_date = Date.parse(this.datelist[0]);
                    this.formInline.end_date = Date.parse(this.datelist[1]);
                }
                this.$emit('get-from', this.formInline);
                if (this.formInline.callbackParameter) {
                    this.formInline.callbackParameter = {};
                    console.log(this.$refs.ltsFormAutocomplete);
                }
            },
            loadAutoCompleteData(keywords) {
                return new Promise((resolve, reject) => {
                    let link = request.api(this.autocomplete.method, this.getParameter())
                    link.then((resp) => {
                        this.restaurants = resp.datalist;
                        let datalist = this.autocomplete.callBack ? this.autocomplete.callBack(resp.datalist) : resp.datalist;
                        resolve(datalist);
                    }, (msg) => {
                        this.$ltsMessage.show({type: 'error', message: msg.error_message});
                    });
                });
            },
            getParameter() {
                return this.formInline;
            },
            querySearch(queryString, cb) {
                this.loadAutoCompleteData("keywords").then((restaurants) => {
                    const results = restaurants;
                    if (this.autocomplete.autoShowKey && !this.autocomplete.callBack) {
                        for (const value of restaurants) {
                            value.value = value.this.autocomplete.autoShowKey;
                        }
                    }
                    cb(results);
                });
            },
            handleSelect(item) {
              this.formInline.callbackParameter = item;
            },
            selectChange(val){

            },
            cascAderHandleChange(val){
                this.$emit("cascAderHandleChange",val);
            },
        }
    }
</script>

