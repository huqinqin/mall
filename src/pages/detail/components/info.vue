<template>
    <div class="detail">
        <!-- top -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item><a href="/index">首页</a></el-breadcrumb-item>
            <el-breadcrumb-item><a href="javascript:void(0)">首页</a></el-breadcrumb-item>
            <el-breadcrumb-item>首页</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="detail-top">
            <div class="detail-img-box">
                <div class="prc_info" v-for="prc in prc_info" :key="prc.index">
                    <div class="big" :style="{backgroundImage:'url('+prc.link+')'}">
                    </div>
                    <div class="small">
                        <!-- -->
                        <a href="">
                            <img :src="prc.link" alt="">
                        </a>
                        <a href="">
                            <img :src="prc.link" alt="">
                        </a>
                    </div>
                </div>
                <!-- 商品编号 -->
                <div class="num"  v-for="prc in prc_info" :key="prc.index">
                    <p>商品编号：<span>{{prc.num}}</span></p>
                </div>
            </div>
            <div class="detail-sku-box">
                <!-- 商品标题-->
                <h3>LTS 1080P普及型会议终端TS2000</h3>
                <p class="brief"><span>性能强劲</span><span>电池保护</span><span>独特电路</span><span>防止干扰</span></p>
                <!-- 商品属性-->
                <el-form label-position="left" label-width="80px">
                    <el-form-item label="价格">
                        <div class="tips">完成登录注册，享受惊爆价</div>
                    </el-form-item>
                    <el-form-item label="供电方式" class="radio">
                        <el-radio-group v-model="sku_1">
                            <el-radio label="1" border>DC12V</el-radio>
                            <el-radio label="2" border>AC14V</el-radio>
                            <el-radio label="3" border>POE</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="像素分类" class="radio">
                        <el-radio-group v-model="sku_2">

                            <el-radio v-for="item in sku_2Data" :label=item.label :key=item.label border>{{item.content}}</el-radio>

                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="采购量" class="num">
                        <el-input-number v-model="count" size="mini" @change="inputNumberChange" :min="1" :max="10" label="描述文字"></el-input-number>
                    </el-form-item>
                    <el-form-item label="温馨提示">
                        <el-alert
                            title="不支持60天无理由退换(如果商品参加活动，退换货以活动规则为准)"
                            type="info" :closable="false">
                        </el-alert>
                    </el-form-item>
                    <el-form-item class="buttons">
                        <button>立即购买</button>
                        <button>加入购物车</button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="detail-buy-history">

            </div>
        </div>
        <!-- bottom -->
        <div class="detail-bottom">
            <div class="detail_side">
                <div class="detail_side_img">
                    <div class="remai">
                        <span>热爱推荐</span>
                    </div>
                    <ul>
                        <li  v-for="item in detail_side_img" :key="item.index">
                            <a href="">
                                <img src="" alt="">
                            </a>
                            <p>{{item.info1}}</p>
                            <p>{{item.info2}}</p>
                            <p>{{item.info3}}</p>
                        </li>
                    </ul>

                </div>
                <!-- detail_goods -->
                <div class="detail_goods">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="商品详情" name="first">商品详情</el-tab-pane>
                        <el-tab-pane label="规格与包装" name="second">规格与包装</el-tab-pane>
                        <el-tab-pane label="商品评价" name="third">商品评价</el-tab-pane>
                        <el-tab-pane label="服务保障" name="fourth">服务保障</el-tab-pane>
                        <el-tab-pane label="下载" name="five">下载</el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import itemService from '@/services/ItemService'
    export default {
        name : 'detailInfo',
        props : {},
        data() {
            return {
                activeName: 'second',
                sku_1: '',
                sku_2: '',
                sku_2Data: [{
                    label: 0,
                    content: '200W'
                }, {
                    label: 1,
                    content: '201W'
                }, {
                    label: 2,
                    content: '202W'
                }, {
                    label: 3,
                    content: '203W'
                }, {
                    label: 4,
                    content: '204W'
                }, {
                    label: 5,
                    content: '205W'
                }, {
                    label: 6,
                    content: '206W'
                }, {
                    label: 7,
                    content: '207W'
                }, {
                    label: 8,
                    content: '208W'
                }, {
                    label: 9,
                    content: '209W'
                }, {
                    label: 10,
                    content: '210W'
                }, {
                    label: 11,
                    content: '211W'
                },],
                count: '',
                prc_info: [
                    {
                        href: "",
                        link: "static/image/shexiangtou1.png",
                        alt: "",
                        num: "111111"
                    }
                ],
                detail_center: [
                    {
                        p1: "1988.00",
                        p2: "888800"
                    }
                ],
                detail_side_img: [
                    {
                        href: "",
                        src: "",
                        alt: "",
                        info1: "福特科",
                        info2: "300W变焦超长镜头",
                        info3: "$399.00"
                    }
                ],
                item : {},
                checkedSpu : {},
            }
        },
        methods:{
            handleClick(tab,event){
                console.log(tab,event);
            },
            inputNumberChange(value){
                console.log(value)

            },
            getItemDetail(id){
                itemService.getItemDetail(id).then((data)=>{
                    this.item = data.data
                },(msg)=>{
                    this.$ltsMessage.show({type:'error',message:msg.errorMessage})
                })
            },
            skuMapEach(prop,data){
                let key = prop.prop_name;
                let prop_value = {};
                let checked_sku_prop = {};
                // 匹配sku
                checked_sku_prop[key] = prop.checked_prop;
                // 匹配库存
                prop_value[key] =  prop.checked_prop;
                data.item_prop_value_maps.forEach((value,index,array)=>{
                    if(value.prop_name !== prop.prop_name){
                        checked_sku_prop[value.prop_name] = value.checked_prop;
                        this.equalsProp(checked_sku_prop,data.item_struct_props,'checkedSku');
                        value.prop_values.forEach((val,key,array)=>{
                            prop_value[value.prop_name] = val.value;
                            val.can_checked = this.equalsProp(prop_value,data.item_struct_props);
                        })
                    }
                })
            },
            equalsProp(propObj,skuList,type){
                let Boolean = 0; // 0 false, 1 true;
                let self = this;
                try{
                    skuList.forEach(function(sku,index,array){
                        let clone_prop = JSON.parse(sku.prop_value);
                        let count = 0;
                        for(let key in propObj){
                            if(!clone_prop[key]){
                                Boolean = 0;
                                return false;
                            }
                            if(clone_prop[key] == propObj[key]){
                                count++;
                            }else{
                                Boolean = 0;
                                return false;
                            }
                        }
                        if(count >= 2 && sku.storage > 0){
                            if(type == 'checkedSku'){
                                self.checkedSpu = sku;
                            }
                            Boolean = 1;
                            // 跳出循环抛出的异常 别删
                            throw new Error("foreach.break");
                        }else{
                            Boolean = 0;
                        }
                        return false;
                    })
                }catch (e){
                    if(e === 'foreach.break')return;
                }
                if(Boolean == 1){
                    return true;
                }else {
                    return false;
                }
            },
            addCart(item) {
                cartService.putCartPlus(this.customerUid,item,this.checkedSpu).then((data) => {
                    this.queryCartList();
                },(msg) => {
                    this.$ltsMessage.show({type:"error",message:msg.error_message})
                });
            },
        },
        mounted(){
            let id = this.$route.query.id;
            this.getItemDetail(id);
        },

    }
</script>

<style lang="less">
    .detail{
        .el-breadcrumb{
            font-size: 14px;
            margin-bottom: 24px;
        }
        .detail-top{
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            .detail-img-box{
                width: 400px;
                margin-right: 48px;
                .prc_info{
                    .big{
                        box-sizing: border-box;
                        border: 1px solid #cccccc;
                        width: 400px;
                        height: 400px;
                        margin-bottom: 12px;
                        background-size: cover;
                        background-position: center center;
                    }
                    .small{
                        display: flex;
                        a{
                            display: inline;
                            width: 70px;
                            height: 70px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            img{
                                width: 38px;
                                height: 40px;
                            }
                        }
                        .is_active{
                            border:solid 1px #48a2ff;
                        }
                    }
                }
            }
            .detail-sku-box{
                color:rgba(0,0,0,0.5);
                flex: 1;
                h3{
                    color: rgba(0,0,0,0.7);
                    font-size: 16px;
                    line-height: 16px;
                    font-family: MicrosoftYaHei-Bold;
                }
                p.brief{
                    margin:8px 0 16px 0;
                    span{
                        color:#bcbcbc;
                        font-size: 12px;
                        margin-right: 12px;
                    }
                }
                .el-form-item{
                    margin-bottom: 12px;
                }
                .el-form-item:nth-child(2){
                    .el-form-item__label{
                        margin-top: -5px;
                    }
                }
                .el-form-item:nth-child(3){
                    .el-form-item__label{
                        margin-top: -10px;
                    }
                }
                .tips{
                    border:1px solid #ff3b41;
                    color:#ff3b41;
                    line-height: 21px;
                    width:181px;
                    margin-top:10px;
                }
                .radio{
                    .el-radio{
                        width: 60px;
                        height: 20px;
                        padding:0;
                        border-radius: 0;
                        text-align: center;
                        margin-right: 24px;
                        margin-bottom: 12px;
                        .el-radio__input{
                            display: none;
                        }
                        .el-radio__label{
                            text-align: center;
                            font-size: 12px;
                            color: rgba(0,0,0,0.5);
                            line-height: 19px;
                            margin-left: -10px;
                        }
                    }
                    .el-radio:hover{
                        border:1px solid #ff3b41;
                    }
                    .el-radio.is-checked{
                        border:1px solid #ff3b41;
                        position: relative;
                        span{
                            color:rgba(0,0,0,0.5);
                        }
                    }
                    .el-radio.is-checked::after{
                        content:'';
                        width: 0;
                        height: 0;
                        border-right: 4px solid red;
                        border-bottom: 4px solid red;
                        border-top: 4px solid transparent;
                        border-left: 4px solid transparent;
                        position: absolute;
                        bottom: 0;
                        right: 0;
                    }
                    .el-radio.is-bordered+.el-radio.is-bordered{
                        margin-left: 0px;
                    }
                }

                .num{
                    .el-input-number{
                        width:84px;
                        margin-left: 12px;
                        margin-bottom: 12px;
                        border: 1px solid rgba(0,0,0,0.2);
                        border-radius: 0;
                        .el-input__inner{
                            border-radius: 0px;
                            border:none;
                        }
                        span{
                            width: 28px;
                            background: rgb(238, 238, 238);
                            border: 1px solid #dcdfe6;
                            margin-left: -2px;
                            margin-top: -1px;
                            i{
                                font-size: 18px;
                                color: rgba(0,0,0,0.7);
                                font-weight: bolder;
                                margin-top: 3px;
                            }
                        }
                        span.el-input-number__increase{
                            margin-right: -2px;
                        }
                        span.el-input-number__decrease{
                            i{
                                color:white;
                            }

                        }
                    }
                }
                .el-alert{
                    height: 40px;
                }
                .buttons{
                    display: inline-block;

                    button{
                        width:180px;
                        height: 50px;
                        background: #ff3b41;
                        color:white;
                        border:none;
                        font-family: MicrosoftYaHei-Bold;
                        font-size: 24px;
                        border-radius: 4px;
                    }
                    button:nth-child(2){
                        margin-left: 24px;
                        border:1px solid #ff3b41;
                        background: #fff;
                        color:#ff3b41;
                    }
                }
            }
            .detail-buy-history{
                width: 290px;
                height: 500px;
                background-color: red;
            }
        }

        // 报废了
        .detail_center{
            font-size: 14px;
            color:rgba(0,0,0,0.5);
            h3{
                color: rgba(0,0,0,0.7);
                font-size: 16px;
                margin-bottom: 48px;
                line-height: 16px;
                font-family: MicrosoftYaHei-Bold;
            }
            .info{
                span{
                    display: inline-block;
                    width:70px;
                }
                .tips{
                    width:420px;
                    display: inline-block;
                    margin-left: 12px;
                    vertical-align: top;
                    .el-radio{
                        display: inline-block;
                        margin: 0 24px 24px 0px;
                        float: left;
                        width: 60px;
                        height: 20px;
                        padding:0;
                        color:rgba(0,0,0,0.5);
                        border:1px solid rgba(0,0,0,0.2);
                        border-radius: 0;
                        margin-right: 12px;
                        span.el-radio__input{
                            display: none;
                        }
                        span.el-radio__label{
                            padding: 0;
                            text-align: center;
                            font-size: 12px;
                            width:60px;
                            line-height: 19px;
                            margin-top: -2px;

                        }
                    }
                    .el-radio:hover{
                        border:1px solid #ff3b41;
                    }
                    .el-radio.is-checked{
                        border:1px solid #ff3b41;
                        position: relative;
                        span{
                            color:rgba(0,0,0,0.5);
                        }
                    }
                    .el-radio.is-checked::after{
                        content:'';
                        width: 0;
                        height: 0;
                        border-right: 6px solid red;
                        border-bottom: 6px solid red;
                        border-top: 6px solid transparent;
                        border-left: 6px solid transparent;
                        position: absolute;
                        bottom: 0;
                        right: 0;
                    }
                    .el-radio.is-bordered+.el-radio.is-bordered{
                        margin-left: 0px;
                    }
                }
                .price{
                    margin-bottom: 24px;
                    span{
                        line-height: 21px;
                    }
                    .tips{
                        color:#ff3b41;
                        font-size: 12px;
                        border: 1px solid #ff3b41;
                        width:160px;
                        line-height: 21px;
                        text-align: center;
                        cursor: pointer;
                    }
                }
                .num{
                    .el-input-number{
                        width:84px;
                        margin-left: 12px;
                        margin-bottom: 24px;
                        border: 1px solid rgba(0,0,0,0.2);
                        border-radius: 0;
                        .el-input__inner{
                            border-radius: 0px;
                            border:none;
                        }
                        span{
                            width: 28px;
                            background: #eee;
                            border: 1px solid #dcdfe6;
                            margin-left: -2px;
                            margin-top: -1px;
                            i{
                                font-size: 18px;
                                color: rgba(0,0,0,0.7);
                                font-weight: bolder;
                                margin-top: 3px;
                            }
                        }
                        span.el-input-number__increase{
                            margin-right: -2px;
                        }
                    }
                }
                .mark{
                    margin-bottom: 24px;
                    span{
                        display:inline;
                        margin-left: 24px;
                    }
                }
            }
            .buttons{
                button{
                    width:180px;
                    height: 50px;
                    background: #ff3b41;
                    color:white;
                    border:none;
                    font-family: MicrosoftYaHei-Bold;
                    font-size: 24px;
                    border-radius: 4px;
                }
                button:nth-child(2){
                    margin-left: 24px;
                    border:1px solid #ff3b41;
                    background: #fff;
                    color:#ff3b41;
                }
            }
        }
    }

    // 公共样式
    body, ol, ul, h1, h2, h3, h4, h5, h6, p, th, td, dl, dd, form, fieldset, legend, input, textarea, select, td, figure {
        margin: 0;
        padding: 0; }

    body {

        word-wrap: break-word; }

    html {
        font-family: "Microsoft Yahei"; }

    a, u, s, del {
        color: #666;
        text-decoration: none; }

    a:hover {
        text-decoration: underline; }

    i, em, b {
        font-style: normal;
        font-weight: 100; }

    li {
        list-style: none; }

    img {
        vertical-align: middle; }

    fieldset, a img, .bor0 {
        border: 0; }

    table {
        border-collapse: collapse; }

    /*合并表格边框*/
    .ind2 {
        text-indent: 2em; }

    .cu {
        cursor: pointer; }

    /*垂直对齐属性*/
    .valign:after {
        content: "";
        display: inline-block;
        vertical-align: middle;
        width: 0px;
        height: 100%; }

    /*文本溢出出现省略号*/
    .over {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap; }

    /*clear清除浮动和防止margin-top向上传递*/
    .clear {
        zoom: 1;
        /*只有ie能识别*/ }

    .clear:before {
        content: "";
        display: table; }

    .clear:after {
        content: "";
        display: block;
        clear: both;
    }
    .detali{
        .detali_left{
            float: left;
        }

    }
    .breadcrumb{
        color: #646464;
        font: 14px/40px "MicrosoftYaHei";
        height: 40px;
        padding-bottom: 8px;
        position: relative;
        z-index: 10000;
        a{
            color: #646464;
            float: left;
        }
        span{
            color: #646464;
            margin: 1px 6px 0;
            float: left;
        }
    }

    .num{
        font:14px/46px "MicrosoftYaHei";
        color: #000;
    }
    ._detali_center{
        float: left;
    }
    .detail_side{
        display: flex;
        justify-content: space-between;

    }
    .detail_side_img{
        width: 290px;
        height: 760px;
        background-color: red;
    }
    .detail_goods{
        width: 1109px;
    }
</style>
