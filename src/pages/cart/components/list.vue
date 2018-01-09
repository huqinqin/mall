<template>
    <div>
        <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                label="商品信息"
                width="120">
                <img src=tableData.img alt="">
            </el-table-column>
            <el-table-column
                prop="name"
                label="像素"
                width="120">
            </el-table-column>
            <el-table-column
                prop="address"
                label="焦距"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="address"
                label="单价（美金）"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="address"
                label="数量"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="小计">
                <el-input-number v-model="num" label="描述文字"></el-input-number>
            </el-table-column>
            <el-table-column
                prop="address"
                label="操作">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "list",
        data() {
            return {
                tableData: [{
                    img: './img/shangpin_html.png',
                    info: '海康威视DS-CD0DDDDDDDDDD',
                    pixel: '1200W',
                    focal: '4mm',
                    price: '$500.00',
                    num: 1,
                    count: '$500.00'

                }],
                multipleTable: [],

                num: 10
            }
        },
        methods:{
            handleSelectionChange(){
                alert('handleSelectionChange')
            }
        }
  }
</script>

<style scoped>

</style>
