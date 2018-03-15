<template>
    <el-cascader :options="locationOptions" v-model="location" class="lts-location" popper-class="location-Popover"
                 expand-trigger="hover" @change="changeHandler"/>
</template>

<script>
    /**
     * 行政区划联动选择器
     * @Author Nation
     * @cdate 2018-01-17 16:08
     */
    import {commonUtils} from 'ltsutil'
    import LocationConfig from 'config/LocationConfig'

    export default {
        name: 'lts-location',
        props: {
            value: Array,
            labels: Array
        },
        data() {
            return {
                location: [],
                locationOptions: LocationConfig
            }
        },
        mounted() {
            if (this.value.length > 0) {
                this.location = this.value;
            }
        },
        methods: {
            changeHandler(newVal = []) {
                let labelArray = commonUtils.getCascaderFullLabelByValue(LocationConfig, newVal);
                this.$emit('update:labels', labelArray);
                this.$emit('input', newVal);
            }
        },
        watch: {
            value(newVal) {
                if (newVal) {
                    this.location = newVal;
                    this.changeHandler(newVal);
                } else {
                    this.location = [];
                }
            }
        }
    }
</script>
<style scoped lang="less">
    .lts-location {
        /deep/ .el-input {
            width: 100% !important;
        }
    }
</style>

