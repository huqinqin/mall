<template>
    <div class="settle">
        <div class="address">
            <h5>收货地址</h5>
            <ul>
                <li class="default" ref="address">
                    <header>
                        <div><p>{{defaultAddressData.name}} （{{defaultAddressData.city}}）</p></div>
                        <div><span>默认地址</span></div>
                    </header>
                    <main>
                        <p>{{defaultAddressData.address}}</p>
                        <p>电话：{{defaultAddressData.mobile}}</p>
                    </main>
                    <footer>
                        <button @click="editAddress">修改</button>
                    </footer>
                </li>
                <li v-for="item in addressData">
                    <header>
                        <div><p>{{item.name}} （{{item.city}}）</p></div>
                    </header>
                    <main>
                        <p>{{item.address}}</p>
                        <p>电话：{{item.mobile}}</p>
                    </main>
                    <footer>
                        <button @click="setDefault">设为默认</button>
                        <button @click="editAddress(item)">修改</button>
                    </footer>
                </li>
                <li class="addAddress" @click="showAddAddress = true">
                    <i class="iconfont icon-add"></i>
                    <div>添加地址</div>
                </li>
            </ul>

            <el-dialog title="收货地址" :visible.sync="showAddAddress">
                <el-form :model="addForm">
                    <el-form-item label="地区" >
                        <el-cascader
                            :options="cityOptions"
                            @change="selectCity">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="街道" >
                        <el-input v-model="addForm.address"></el-input>
                    </el-form-item>
                    <el-form-item label="邮编" >
                        <el-input v-model="addForm.postcode"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人" >
                        <el-input v-model="addForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" >
                        <el-input v-model="addForm.mobile"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="showAddAddress = false">取 消</el-button>
                    <el-button type="primary" @click="showAddAddress = false">确 定</el-button>
                </div>
            </el-dialog>
        </div>


        <div class="inPrice">
            <h5>送货单是否包含价格 </h5>
            <el-radio-group v-model="inPrice">
                <el-radio-button label="是"></el-radio-button>
                <el-radio-button label="否"></el-radio-button>
            </el-radio-group>

        </div>
        <div class="delivery">
            <h5>配送方式</h5>
            <el-radio-group v-model="deliver">
                <el-radio-button label="快递"></el-radio-button>
                <el-radio-button label="自提"></el-radio-button>
            </el-radio-group>
        </div>
        <div class="order">
            <h5>订单信息</h5>
            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column label="商品信息" width="450" class="column-1"  align="center">
                    <template slot-scope="scope">
                        <div class="cart-item-info">
                            <img :src="scope.row.img" alt="商品">
                            <div class="content">
                                <p>{{scope.row.info}}</p>
                            </div>
                            <div class="other">
                                <p v-for="(value,key) in scope.row.more">{{key}}: {{value}}</p>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="price" label="单价" align="center">
                </el-table-column>
                <el-table-column label="数量" prop="num" align="center">
                </el-table-column>
                <el-table-column label="小计" align="center">
                    <template slot-scope="scope">
                        <div class="count">{{scope.row.count}}</div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="remark"><span>买家留言 </span><el-input></el-input></div>
        </div>
        <div class="balance">
            <el-checkbox v-model="useBalance">使用余额</el-checkbox>
        </div>
        <div class="someCount">
            <div class="count">
                <p>商品应付金额 <span>{{sum.amount.toFixed(2)}}</span></p>
                <p>运费 <span>+{{sum.express.toFixed(2)}}</span></p>
                <p>税费 <span>+{{sum.tax.toFixed(2)}}</span></p>
                <p class="result">应付金额 <span>${{sum.result.toFixed(2)}}</span></p>
            </div>
        </div>
        <div class="allInfo">
            <p>联系人 {{checkedAddress.name}}</p>
            <p>联系电话 {{checkedAddress.mobile}}</p>
            <p>收货地址 {{checkedAddress.address}}</p>
            <p>账单地址 {{checkedAddress.address}}</p>
            <p>资格证地址 {{checkedAddress.address}}</p>
        </div>
        <div class="submit">
            <el-button @click="settle">提交订单</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "settle",
        props: ['items'],
        data(){
            return{
                // 送货单是否包含价格，配送方式
                inPrice:'否',
                deliver:'快递',
                // 是否使用余额
                useBalance: true,
                // 地址框
                showAddAddress: false,
                showEditAddress: false,
                cityOptions: [
                    {
                        value: 'zujian',
                        label: '组件',
                        children: [
                            {
                                value: 'basic',
                                label: 'Basic',
                                children: [
                                    {
                                        value: 'layout',
                                        label: 'Layout 布局'
                                    },
                                    {
                                        value: 'color',
                                        label: 'Color 色彩'
                                    },
                                    {
                                        value: 'typography',
                                        label: 'Typography 字体'
                                    },
                                    {
                                        value: 'icon',
                                        label: 'Icon 图标'
                                    },
                                    {
                                        value: 'button',
                                        label: 'Button 按钮'
                                    }
                                ]
                            },
                            {
                                value: 'form',
                                label: 'Form',
                                children: [
                                    {
                                        value: 'radio',
                                        label: 'Radio 单选框'
                                    },
                                    {
                                        value: 'checkbox',
                                        label: 'Checkbox 多选框'
                                    },
                                    {
                                        value: 'input',
                                        label: 'Input 输入框'
                                    },
                                    {
                                        value: 'input-number',
                                        label: 'InputNumber 计数器'
                                    },
                                    {
                                        value: 'select',
                                        label: 'Select 选择器'
                                    },
                                    {
                                        value: 'cascader',
                                        label: 'Cascader 级联选择器'
                                    },
                                    {
                                        value: 'switch',
                                        label: 'Switch 开关'
                                    },
                                    {
                                        value: 'slider',
                                        label: 'Slider 滑块'
                                    },
                                    {
                                        value: 'time-picker',
                                        label: 'TimePicker 时间选择器'
                                    }
                                ]
                            },
                            {
                                value: 'data',
                                label: 'Data',
                                children: [
                                    {
                                        value: 'table',
                                        label: 'Table 表格'
                                    },
                                    {
                                        value: 'tag',
                                        label: 'Tag 标签'
                                    },
                                    {
                                        value: 'progress',
                                        label: 'Progress 进度条'
                                    },
                                    {
                                        value: 'tree',
                                        label: 'Tree 树形控件'
                                    },
                                    {
                                        value: 'pagination',
                                        label: 'Pagination 分页'
                                    }
                                ]
                            },
                            {
                                value: 'notice',
                                label: 'Notice',
                                children: [
                                    {
                                        value: 'alert',
                                        label: 'Alert 警告'
                                    },
                                    {
                                        value: 'loading',
                                        label: 'Loading 加载'
                                    },
                                    {
                                        value: 'message',
                                        label: 'Message 消息提示'
                                    }
                                ]
                            },
                            {
                                value: 'navigation',
                                label: 'Navigation',
                                children: [
                                    {
                                        value: 'menu',
                                        label: 'NavMenu 导航菜单'
                                    },
                                    {
                                        value: 'tabs',
                                        label: 'Tabs 标签页'
                                    },
                                    {
                                        value: 'breadcrumb',
                                        label: 'Breadcrumb 面包屑'
                                    }
                                ]
                            },
                            {
                                value: 'others',
                                label: 'Others',
                                children: [
                                    {
                                        value: 'dialog',
                                        label: 'Dialog 对话框'
                                    },
                                    {
                                        value: 'tooltip',
                                        label: 'Tooltip 文字提示'
                                    },
                                    {
                                        value: 'popover',
                                        label: 'Popover 弹出框'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        value: 'ziyuan',
                        label: '资源',
                        children: [
                            {
                                value: 'axure',
                                label: 'Axure Components'
                            },
                            {
                                value: 'sketch',
                                label: 'Sketch Templates'
                            },
                            {
                                value: 'jiaohu',
                                label: '组件交互文档'
                            }
                        ]
                    }
                ],
                selectedCity:'',
                addForm:{
                    name:123,
                    city:'qwe',
                    address:'asd',
                    mobile: 'zxc',
                    postcode: 321
                },

                chooseAll: true,
                checkedAddress: {
                    name: '抹茶',
                    city: '浙江省杭州市',
                    address: '西湖区三墩镇振华路西城博司12楼1201',
                    mobile: '183 **** 5921'
                },

                defaultAddressData: {
                    name: '抹茶',
                    city: '浙江省杭州市',
                    address: '西湖区三墩镇振华路西城博司12楼1201',
                    mobile: '183 **** 5921'
                },
                addressData:[{
                    name: '抹茶',
                    city: '浙江省杭州市',
                    address: '西湖区三墩镇振华路西城博司12楼1201',
                    mobile: '183 **** 5921'
                }],
                tableData: [],
                multipleTable: [],
                num: 10,
                sum: {
                    amount: 500.00,
                    express: 0.00,
                    tax: 0.00,
                    benefit: 0.00,
                    result: 0
                },
                data:{
                    类名: '',
                    link: '',
                    datalist:[
                        {},
                        {},
                        {},
                    ]
                }
            }
        },
        methods: {
            setDefault(){
                alert('set default')
            },
            editAddress(item){
                console.log(item)
            },

            addAddress(){
                alert('add address')
            },
            editBill(){
                alert('edit bill')
            },
            addBill(){
                alert('add bill')
            },
            handleSelectionChange(){
                alert('handleSelectionChange')
            },
            inputNumberChange(){
                alert('input numeber change')
            },
            settle(){
                this.$emit('submit',2)
                this.$router.push({path: '/beforePay'})
            },
            deleteHandle(){
                alert('asf')
            },
            // 选择订单是否包含价格
            chooseInPrice(e){
                switch(e.target.innerText){
                    case '是':
                        this.inPrice = 0
                        break
                    case '否':
                        this.inPrice = 1
                }
            },

            // 选择配送方式
            chooseDeliver(e){
                switch(e.target.innerText){
                    case '快递':
                        this.deliver = 0
                        break
                    case '自提':
                        this.deliver = 1
                }
            },
            //选择城市
            selectCity(value){
                this.selectedCity = value[0] + value[1] + value[2]
                console.log(this.selectedCity)
            },
        },
        mounted(){
            console.log(this.$route.params.items)
            this.formData = this.$route.params.items
            this.sum.result = this.sum.amount + this.sum.express + this.sum.tax - this.sum.benefit
        }
  }
</script>

<style lang="less">
    .settle{
        overflow: hidden;
        .el-table__header-wrapper{
            height: 60px;
        }
        .has-gutter{
            tr{
                th{
                    background-color: rgba(0,0,0,0.05);
                }
                th.el-table_1_column_1{
                    .cell{
                        margin-left: 24px;
                    }
                }
            }
        }
        .el-table{
            font-size: 14px;
            .cell{
                .cart-item-info{
                    width:100%;
                    display: flex;
                    justify-content: space-between;
                    img{
                        width:116px;
                        height: 116px;
                        border: 1px solid #dadada;
                    }
                    div{
                        width:120px;
                        p{
                            line-height: 30px;
                            font-size: 12px;
                            text-align: left;
                        }
                        p:first-child{
                            margin-top: 12px;
                        }
                    }
                }
            }

            .cart-delete{
                line-height: 40px;
                font-size: 22px;
                color: #cecece;
                i{font-size: 22px;}
            }
            .count{
                color:red;
                font-size: 16px;
            }
            .el-input-number--small{
                width:128px;
            }
        }
        h5{
            color: rgba(0,0,0,0.7);
            font-family: MicrosoftYaHei-Bold;
            font-size: 16px;
            margin-bottom: 23px;
            width:100%;
        }
        .address{
            margin: 0 24px;
            display: flex;
            flex-wrap: wrap;
            ul{
                display: flex;
                flex-wrap: wrap;
                margin-bottom: 48px;
                li{
                    width: 280px;
                    height: 122px;
                    box-shadow: 0px 3px 15px 0px #f1f1f1;
                    border-radius: 4px;
                    header{
                        border-top:2px solid rgba(0,0,0,0.2);
                        border-bottom: 1px solid rgba(0,0,0,0.05);
                        color: rgba(0,0,0,0.7);
                        padding: 0 12px;
                        p{
                            line-height: 40px;
                            font-size: 14px;
                        }
                        span{
                            font-size: 12px;
                            line-height: 40px;
                        }
                    }
                    main{
                        color: rgba(0,0,0,0.5);
                        font-size: 14px;
                        line-height: 24px;
                        padding: 0 12px;
                        margin-top: 6px;
                    }
                    footer{
                        display: flex;
                        justify-content: flex-end;
                        button{
                            font-size: 12px;
                            color: #3d98ff;
                            width:50px;
                            height: 12px;
                            margin:0;
                            padding:0;
                            background: #fff;
                            border: none;
                            visibility : hidden;
                            outline: none;
                        }
                    }
                }
                li+li{
                    margin-left: 12px;
                }
                li.default{
                    header{
                        border-top:2px solid #f81f22;
                        display: flex;
                        justify-content: space-between;
                    }
                }
                li.default:hover{
                    header{
                        border-top:2px solid #f81f22;
                    }
                    footer{
                        button+button{
                            visibility: visible;
                        }
                    }
                }
                li:hover{
                    cursor: pointer;
                    header{
                        border-top:2px solid #1f85f8;
                    }
                    footer{
                        button{
                            visibility: visible;
                        }
                    }
                }
                li.addAddress,li.addBill{
                    border: 1px solid rgba(0,0,0,0.1);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    font-family: MicrosoftYaHei-Bold;
                    color: rgba(0,0,0,0.5);
                    i{
                        font-size: 32px;
                        color: #aaa;
                    }
                    div{
                        margin-top: 10px;
                        font-size: 14px;
                    }
                }
            }
            .el-dialog{
                .el-cascader{
                    display: block;
                }
            }
        }
        .delivery,.inPrice{
            margin: 0 24px;
            .el-radio-group{
                margin-bottom: 24px;
                label{
                    margin-right: 16px;
                    span{
                        width:120px;
                        height: 35px;
                        line-height: 8px;
                        border:none;
                        background: #f6f6f6;
                        border-radius: 4px;
                    }
                }
                label.is-active{
                    span{
                        background: #1fa4f8;
                    }
                }
            }
            .el-button{
                width: 120px;
                height: 35px;
                margin-left: 12px;
                background-color: #f6f6f6;
                margin-bottom: 48px;
                line-height: 0px;
                border: 1px solid #f6f6f6;
                span{
                    line-height: 0px;
                    font-size: 16px;
                }
            }

            .active{
                background-color: #1fa4f8;
                border:1px solid #1fa4f8;
                color:white;
            }
        }
        .order{
            h5{
                margin-left: 24px;
            }
            padding-bottom:24px;
            border-bottom:1px solid rgba(0,0,0,0.05);
            .remark{
                margin-top: 24px;
                margin-left: 24px;
                span{
                    font-size: 14px;
                    color:rgba(0,0,0,0.5);
                    line-height: 30px;
                }
                .el-input{
                    width:350px;
                    height: 30px;
                    input{
                        height: 30px;
                    }
                }
            }
        }
        .balance{
            margin: 24px 0;
            padding-left: 24px;
            width: 100%;
            height: 40px;
            background-color: rgba(0, 0, 0, 0.05);
            color: rgba(0,0,0,0.7);
            line-height: 40px;
            font-size: 12px;
            p{
                margin-left: 24px;
                i{
                    margin-right: 12px;
                    color:#f13a40;
                    font-size: 12px;
                }
                span{
                    color: rgba(0,0,0,0.5);
                }
            }
        }
        .someCount{
            margin-right: 24px;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            line-height: 40px;
            border-bottom: 1px solid #f2f2f2;
            .count{
                p{
                    text-align: right;
                    font-size: 14px;
                    color:#737373;
                    line-height: 26px;
                }
                span{
                    display: inline-block;
                    width:100px;
                    color:#f13a40;

                }
                p.result{
                    font-size: 14px;
                    line-height: 50px;
                    color:#737373;;
                    span{
                        color:#f13a40;
                        font-size: 20px;
                        font-weight: bold;
                    }
                }
            }
        }
        .allInfo{
            text-align: right;
            color: #a3a3a3;
            font-size: 14px;
            margin-top: 12px;
            padding-right: 24px;
            letter-spacing: 0px;
            p{
                line-height: 26px;
            }
        }
        .submit{
            text-align: right;
            margin-right: 24px;
            margin-top: 24px;
            .el-button{
                width: 160px;
                height: 40px;
                background-color: #f13a40;
                border-radius: 4px;
                color: #fff;
                font-size: 18px;
                line-height: 0;
                font-weight: bold;

            }
        }

    }
</style>
