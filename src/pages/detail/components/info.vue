<template>
    <div class="detail">
        <!-- top -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <!--<el-breadcrumb-item><a href="/index">首页</a></el-breadcrumb-item>
            <el-breadcrumb-item><a href="javascript:void(0)">商品详情</a></el-breadcrumb-item>-->
        </el-breadcrumb>
        <div class="detail-top">
            <div class="detail-img-box">
                <div class="prc_info" >
                    <div class="big" :style="{backgroundImage:'url('+activeImg.url+')'}">
                    </div>
                    <!--大图下面的小图-->
                    <div class="small">
                        <div  class="small_img" v-for="prc in item.item_images" :key="prc.index" @mouseover="showImage(prc,$event)" :style="{backgroundImage:'url('+prc.url+')'}"></div>
                    </div>
                </div>
            </div>
            <div class="detail-sku-box" v-if="item.price">
                <!-- 商品标题-->
                <h3>{{item.item_name}}</h3>
                <!--<p class="brief">{{item.promotion_title}}</p>-->
                <!-- 商品属性-->
                <el-form label-position="left" label-width="120px" ref="ruleForm" >
                    <el-form-item label="价格" class="price">
                        <div class="tips" v-ltsLoginShow:false>完成登录注册，享受惊爆价</div>
                        <div v-ltsLoginShow:true class="detail_price" v-if="!checkedSpu.price">
                            <lts-money :money="item.price"></lts-money>
                        </div>
                        <div v-ltsLoginShow:true class="detail_price" v-else>
                            <lts-money :money="checkedSpu.price"></lts-money>
                        </div>
                    </el-form-item>
                    <div :class="[showPropsError ? 'error' : '']" @click="closeError">
                        <el-form-item v-for="prop in item.item_prop_value_maps" :key="prop.prop_name" :label="prop.prop_name" class="radio sku_prop" >
                            <el-radio-group v-model="prop.checked_prop" @change="checkedProp(prop,item)">
                                <el-radio v-for="propValue in prop.prop_values"  :disabled="!propValue.can_checked" :label="propValue.value" :key="propValue.value">
                                    {{propValue.value}}
                                    <i class="iconfont icon-duihao"></i>
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <i class="el-icon-close"></i>
                        <div class="el-form-item__error">请选择商品属性。若商品属性不可选。请联系销售</div>
                    </div>
                    <div :class="[item.num > checkedSpu.storage ? 'error' : '']" @click="closeError">
                        <el-form-item label="采购量" class="num" >
                            <el-input-number v-model="item.num" size="mini" @change="inputNumberChange" :min="1"></el-input-number>
                            <span v-if="checkedSpu.storage > 0" class="storage_spec">有货</span>
                            <span v-else-if="checkedSpu && checkedSpu.storage <= 0" class="storage_spec">缺货</span>
                            <div class="el-form-item__error" >您所填写的数量超过库存！</div>
                            <i class="el-icon-close"></i>
                        </el-form-item>
                    </div>
                    <el-form-item label="温馨提示" class="mark">
                        <p>支持30天无理由退换(如果商品参加活动，退换货以活动规则为准)</p>
                    </el-form-item>
                    <el-form-item class="buttons" >
                        <button @click.stop="buyNow" type="button"><div v-login>立即购买</div></button>
                        <el-button @click.stop="addCart" type="button"><div v-login>加入购物车</div></el-button>
                    </el-form-item>
                    <addCartSuccess
                        :flag.sync="flag"
                        @fade="hide"
                        :info = "hotSale"
                    ></addCartSuccess>
                </el-form>
            </div>
            <div class="detail-buy-history">
                <div class="header">
                    <div>购买记录</div>
                    <div class="icons">
                        <div class="icon-left"><i class="iconfont  icon-iconfontzuo"></i></div>
                        <div class="icon-right"><i class="iconfont  icon-iconfontzuo"></i></div>
                    </div>
                </div>
                <ul v-if="buyHistory">
                    <li v-for="item in buyHistory">
                        <a :href="'/detail#/?id=' + item.id" target="_blank">
                            <div class="img" :style="{backgroundImage : 'url(' + item.image_value +')'}"></div>
                            <p class="name" :title="item.item_name">{{item.item_name}}</p>
                            <p class="line-four" ></p>
                            <div class="item-price">
                                <p v-ltsLoginShow:true class="price">
                                    <lts-money :money="item.price"></lts-money>
                                </p>
                            </div>
                        </a>
                    </li>
                </ul>
                <div v-else class="history_null" >
                    <div :style="{backgroundImage:'url(' + nullImg + ')'}"></div>
                </div>
            </div>
        </div>
        <!-- bottom -->
        <div class="detail-bottom">
            <div class="detail_side">
                <div class="detail_side_img">
                    <div class="header">
                        <div>热卖推荐</div>
                        <div class="icons">
                            <div class="icon-left"><i class="iconfont  icon-iconfontzuo"></i></div>
                            <div class="icon-right"><i class="iconfont  icon-iconfontzuo"></i></div>
                        </div>
                    </div>
                    <ul class="item-list-box">
                        <li v-for="item in hotSale" :key="item.id">
                            <a :href="'/detail#/?id=' + item.id" target="_blank">
                                <div class="img" :style="{backgroundImage : 'url(' + item.image_value +')'}"></div>
                                <p class="name" :title="item.item_name">{{item.item_name}}</p>
                                <p class="line-four" ></p>
                                <div class="item-price">
                                    <button v-ltsLoginShow:false v-login>登录之后查看价格</button>
                                    <p v-ltsLoginShow:true class="price">
                                        <lts-money :money="item.price"></lts-money>
                                    </p>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
                <!-- detail_goods -->
                <div class="detail_goods">
                    <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
                        <el-tab-pane label="商品详情" name="first">
                            <ul class="aboutDetail">
                                <li v-for="(value,key) in aboutDetail">
                                    {{key}}: {{value}}
                                </li>
                                <li class="more" v-if="aboutDetail.length > 8">详细 <i class="iconfont icon-shangyiye-copy-copy"></i></li>
                            </ul>
                            <div class="item_detail" >
                                <div v-html="item.description"></div>
                            </div>
                        </el-tab-pane>
                        <!--<el-tab-pane label="规格与包装" name="second">规格与包装</el-tab-pane>-->
                        <!--<el-tab-pane label="商品评价" name="third">-->
                            <!--&lt;!&ndash;<ul class="comments">&ndash;&gt;-->
                                <!--&lt;!&ndash;<li v-for="item in comments">&ndash;&gt;-->

                                <!--&lt;!&ndash;</li>&ndash;&gt;-->
                            <!--&lt;!&ndash;</ul>&ndash;&gt;-->
                        <!--</el-tab-pane>-->
                        <!--<el-tab-pane label="服务保障" name="fourth">服务保障</el-tab-pane>-->
                        <!--<el-tab-pane label="下载" name="five">下载</el-tab-pane>-->
                    </el-tabs>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import $ from 'jquery'
    import itemService from '@/services/ItemService'
    import cartService from '@/services/CartService'
    import addCartSuccess from 'ui/components/lts-addCartSuccess.vue'
    import config from 'config'
    export default {
        components:{addCartSuccess},
        name : 'detailInfo',
        props : {},
        data() {
            return {
                activeName: 'first',
                sku_1: '',
                sku_2: '',
                count: '',
                prc_info: [],
                flag:false,
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
                buyHistory: [],
                hotSale: [],
                activeImg : '',
                aboutDetail: {
                    '商品编号': '34598739792',
                    '外形': '半球形',
                    '清晰度': '8MP',
                    '焦距': '2.8nm',
                    '水平角度': '106度',
                    '逆光处理': 'ture WDR',
                    '视频压缩': 'H.265+',
                    '声频': 'line in/out'
                },
                comment: [],
                nullImg : require('@/assets/img/buynull.png'),
                showPropsError : false,
            }
        },
        methods:{
            handleClick(tab,event){
                console.log(tab,event);
            },
            inputNumberChange(value){
                console.log(this.item.num);
                /*this.item.item_struct_props.forEach((item)=>{
                    console.log(item.storage,this.item.num);
                    if(this.item.num > item.storage){
                        this.dis = true;
                        console.log(this.dis);
                    }else{
                        this.dis = false;
                        console.log(this.dis);
                    }
                })*/
            },
            getItemDetail(id){
                itemService.getItemDetail(id).then((data)=>{
                    this.item = data.data.item;
                    this.aboutDetail = JSON.parse(this.item.item_struct_props[0].prop_value);
                    this.activeImg = this.item.item_images[0];
                    this.hotSale = data.data.hot_recomment.items;
                    this.buyHistory = data.data.user_order_history;
                },(msg)=>{
                    this.$ltsMessage.show({type:'error',message:msg.errorMessage})
                })
            },
            checkedProp(prop,data,checkedValue){
                if(prop.checked_prop != ""){
                    this.skuMapEach(prop,data);
                }
            },
            skuMapEach(prop,data){
                let key = prop.prop_name;
                let prop_value = {};
                let checked_sku_prop = {};
                // 匹配sku
                checked_sku_prop[key] = prop.checked_prop;
                // 匹配库存
                prop_value[key] =  prop.checked_prop;
                if(data.item_prop_value_maps.length > 1) {
                    data.item_prop_value_maps.forEach((value, index, array) => {
                        if (value.prop_name !== prop.prop_name) {
                            checked_sku_prop[value.prop_name] = value.checked_prop;
                            this.equalsProp(checked_sku_prop, data.item_struct_props, 'checkedSku',data.item_prop_value_maps.length);
                            value.prop_values.forEach((val, key, array) => {
                                prop_value[value.prop_name] = val.value;
                                val.can_checked = this.equalsProp(prop_value, data.item_struct_props,'',data.item_prop_value_maps.length);
                            })
                        }
                    })
                }else{
                    this.equalsProp(checked_sku_prop, data.item_struct_props, 'checkedSku',data.item_prop_value_maps.length);
                }
            },
            equalsProp(propObj,skuList,type,skuLength){
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
                        if(count >= skuLength && sku.storage > 0){
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
            addCart() {
                if(!this.validate()){
                    return false;
                }
                cartService.putCartPlus(this.item,this.checkedSpu).then((data) => {
                    if(!this.showPropsError) {
                        this.flag = true;
                    }
                   /* this.$ltsMessage.show({type:"success",message:'加入购物车成功'})*/
                },(msg) => {
                    this.$ltsMessage.show({type:"error",message:msg.error_message})
                });
            },
            hide(){
                this.flag = false;
            },
            buyNow(){
                if(!this.validate()){
                    return false;
                }
                let items = {
                    "activity_id":null,
                    "attribute":this.item.attribute,
                    "brand":this.item.brand,
                    "category_id":this.item.category_id,
                    "discount_type":this.item.discount_type,
                    "id":this.item.id,
                    "item_name":this.item.item_name,
                    "item_props":[this.checkedSpu],
                    "maxinum":this.item.maxinum,
                    "mininum":this.item.mininum,
                    "num":this.item.num,
                    "price":this.item.price,
                    "price_real":this.item.price_real,
                    "proxy_distribute_num":this.item.proxy_distribute_num,
                    "puser_id":this.item.puser_id,
                    "spec_unit":this.item.spec_unit,
                    "spu_id":this.item.spu_id,
                    "status":this.item.status,
                    "storage":this.item.storage,
                    "tag":this.item.tag,
                    "url":this.item.url
                };
                window.open('/cart#/settle?item=' + JSON.stringify(items));
            },
            validate(){
              if(!this.checkedSpu.spu_id){
                  this.showPropsError = true;
                  return false;
              }else{
                  return true;
              }
            },
            showImage(prc,e){
                $(e.currentTarget).addClass('is_active')
                $(e.currentTarget).siblings().removeClass('is_active')
                this.activeImg = prc;
            },
            closeError(){
              this.showPropsError = false;
            }
        },
        mounted(){

        },
        created(){
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
                        .small_img{
                            width: 60px;
                            height: 60px;
                            background-size: cover;
                            border:1px solid rgba(0,0,0,0);
                            background-position: center;
                            cursor: pointer;
                            border:solid 1px #afafb3;
                            margin-right: 20px;
                        }
                        .small_img:last-child{
                            margin-right: 0px;
                        }
                        .is_active{
                            border:solid 1px #48a2ff;
                        }
                    }
                }
                .info_num{
                    color: #a3a3a3;
                    margin-top: 20px;
                    display: flex;
                    justify-content: space-between;
                    font-size: 14px;
                    .icons{
                        width:120px;
                        display: flex;
                        justify-content: space-between;
                        div{
                            cursor: pointer;
                        }
                        i{
                            font-size: 14px;
                            margin-right: 4px;
                            color: #48a2ff;
                            line-height: 14px;
                        }
                    }
                }
            }
            .error{
                border:solid 1px red;
                padding: 0 10px;
                margin-bottom: 10px !important;
                position: relative;
                .el-form-item__error{
                    display: block;
                }
                .el-icon-close{
                    position: absolute;
                    right: 0px;
                    top: 5px;
                    color: red;
                    display: block;
                }
            }
            .el-form-item__error{
                display: none;
            }
            .el-icon-close{
                display: none;
            }
            .detail-sku-box{
                margin-bottom: 24px;
                margin-right: 12px;
                color:rgba(0,0,0,0.5);
                flex: 1;

                h3{
                    color: rgba(0,0,0,0.7);
                    font-size: 16px;
                    line-height: 24px;
                    font-weight: bold;
                }
                p.brief{
                    margin:6px 0 16px 0;
                    span{
                        color:#bcbcbc;
                        font-size: 12px;
                        margin-right: 12px;
                    }
                }
                .el-form-item{
                    margin-bottom: 0;
                }
                .price{
                    margin-top: 7px;
                }
                .tips{
                    border:1px solid #ff3b41;
                    line-height: 21px;
                    width:155px;
                    margin-top:10px;
                    font-size: 12px;
                    padding-left: 6px;
                    color:#ff3b41;
                }
                .detail_price{
                    color:#ff3b41;
                    font-size: 18px;
                    font-weight: bold;
                }
                .radio{
                    .el-radio{
                        height: 28px;
                        padding: 0;
                        border-radius: 0;
                        line-height: 28px;
                        font-size: 14px;
                        width: auto!important;
                        border:1px solid #b8b7bd ;
                        color:red;
                        .el-radio__input{
                            display: none;
                        }
                        .el-radio__label{
                            text-align: center;
                            font-size: 14px;
                            color: #606266;
                            line-height: 19px;
                            padding: 0 9px;
                        }
                    }
                    .iconfont {

                    }
                    .el-radio:hover{
                        border:1px solid #FF0036
                    }
                    .el-radio.is-checked{
                        border:1px solid #ff3b41;
                        position: relative;
                        span{
                            color:rgba(0,0,0,0.5);
                        }
                    }
                    .el-radio.is-disabled{
                        border: 1px dashed #a3a3a3;
                    }
                    .el-radio.is-disabled .el-radio__label{
                        color:#a3a3a3;
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
                    margin-bottom: -2px;
                    .el-input-number--mini{
                        line-height: 24px;
                    }
                    .el-input-number{
                        width:84px;
                        margin-left: 0px;
                        margin-bottom: 12px;
                        border: 1px solid rgba(0,0,0,0.2);
                        border-radius: 0;
                        .el-input__inner{
                            border-radius: 0px;
                            border:none;
                            height: 20px;
                            padding: 0 15px;
                        }
                        span{
                            width: 22px;
                            line-height: 18px;
                            background: rgb(238, 238, 238);
                            border: 1px solid #dcdfe6;
                            margin-left: -2px;
                            margin-top: -2px;
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
                                color:rgba(0, 0, 0, 0.7);
                            }

                        }
                    }
                    .storage_spec{
                        font-size: 12px;
                        margin-left: 20px;
                    }
                }
                .mark{
                    margin-bottom: 8px;
                    p {
                        font-size: 12px;
                    }
                }
                .el-alert{
                    height: 40px;
                    padding: 8px 0;
                    .el-alert__title{
                        font-size: 12px;
                    }
                }
                .buttons{
                    display: inline-block;
                    button{
                        width:160px;
                        height: 40px;

                        background: #ff3b41;
                        color:white;
                        border:none;
                        font-weight: bold;
                        font-size: 18px;
                        border-radius: 4px;
                        cursor: pointer;
                    }
                    button:nth-child(2){
                        margin-left: 16px;
                        border:1px solid #ff3b41;
                        background: #fff;
                        color:#ff3b41;
                    }
                    button:focus{
                        outline: none;
                    }
                }
            }

        }
        .detail-bottom{
            margin-top: 48px;
            .detail_side{
                display: flex;
                justify-content: space-between;
                .detail_side_img{
                    margin-right: 48px;

                }
                .detail_goods{
                    flex:1;
                    .el-tabs{
                        box-shadow: none;
                        -webkit-box-shadow:none;
                        border-bottom: 1px solid #e3e3e3;
                        .el-tabs__header{
                            background: #f6f6f6;
                            .el-tabs__item{
                                border-top: 2px solid #f6f6f6;
                                width:122px;
                                font-size: 14px;
                                height: 38px;
                                line-height: 38px;
                                text-align: center;
                                font-weight: bold;
                            }
                            .el-tabs__item:hover{
                                color:#ff3b41;
                            }
                            .el-tabs__item.is-active{
                                color:#ff3b41;
                                background-color:#fff;
                                border-bottom: 1px solid #fff;
                                border-right: 1px solid #e3e3e3;

                            }
                        }
                        .el-tabs__content{
                            color: #a3a3a3;
                            padding: 29px 0;
                            border-bottom: 1px solid #E5E5E5;
                            font-size: 14px;
                            position: relative;
                        }
                        .aboutDetail{
                            display: flex;
                            flex-wrap: wrap;
                            justify-content: flex-start;
                            padding-bottom: 24px;
                            border-bottom: 1px solid #E5E5E5;
                            margin-left: 24px;
                            li{
                                width: 24.8%;
                                line-height: 28px;
                            }
                            li.more{
                                position: absolute;
                                top: 80px;
                                left:100%;
                                margin-left: -80px;
                                cursor: pointer;
                                color: #48a2ff;
                                i{
                                    display: inline-block;
                                    transform: rotateZ(180deg);
                                    font-size: 14px;
                                    position: relative;
                                    top:-2px;

                                }
                            }
                        }
                        .imgDetail{
                            max-height: 2000px;
                            overflow: auto;
                            margin-top: 24px;

                            li{
                                width:100%;
                                height: 500px;
                                background-repeat: no-repeat;
                                background-size: contain;
                                background-position: center;
                            }

                        }
                    }
                    .item_detail{
                        text-align: center;
                    }
                }
            }
        }
        // 购买记录和热卖推荐
        .detail-buy-history{
            ul{
                overflow-y: scroll;
                height: 434px;
            }
        }
        .detail-buy-history, .detail_side_img{
            width: 290px;
            background: #fff;
            border:1px solid #ccc;
            overflow: hidden;
            .header{
                height: 36px;
                line-height: 36px;
                color:#737373 ;
                border-bottom:1px solid #ccc;
                padding: 0 12px;
                display: flex;
                justify-content: space-between;
                font-size: 14px;
                .icons{
                    width:40px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    div{
                        color: #b6b6b6;
                        i{
                            display: block;
                            font-size: 14px;
                        }
                    }
                    .icon-right{
                        transform: rotateZ(180deg);
                        margin-top: 2px;
                    }
                }
            }

            li{


                text-align: center;
                background: #ffffff;
                margin: 0 15px;
                border-bottom: 1px solid #f2f2f2;
                .img{
                    width:146px;
                    height: 146px;
                    margin: 0 auto;
                    background-position: center;
                    background-size: contain;
                    background-repeat: no-repeat;
                }

                p.name{
                    margin: 10px 0;
                    font-size: 14px;
                    color: #a3a3a3;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                }
                p.line-four{
                    border-top: 1px solid #f2f2f2;
                    margin: 0 12px;
                }
                .item-price{
                    margin-top:24px;
                    margin-bottom: 24px;
                    background-color: #ffffff;
                    font-weight: bold;
                    button{
                        border: none;
                        width:60%;
                        height: 26px;
                        font-weight: bold;
                        font-size: 12px;
                        color: #ff3b41;
                        box-shadow: 0px 2px 15px 2px #e9e9e9;
                    }
                    .price{
                        color: #ff3b41;
                    }
                }
                position: relative;
            }
            li:last-child{
                border-bottom: none;
            }
            .history_null{
                height: 434px;
                display: flex;
                justify-content: center;
                align-items: center;
                div{
                    width: 183px;
                    height: 128px;
                    background-size: contain;
                    background-repeat: no-repeat;
                }
            }
        }
    }
    .b1200{
        .detail-img-box{
            margin-right: 29px !important;
        }
    }

</style>
