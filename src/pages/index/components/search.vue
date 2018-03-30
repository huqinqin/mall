<template>
    <div class="search">
        <div class="nav">
            <el-breadcrumb separator-class="el-icon-arrow-right" v-if="data.length > 0">
                <el-breadcrumb-item :to="{ path: '/' }">{{$t("main.search.mainSeaGoods")}}</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="tags" v-if="JSON.stringify(conditions) != '{}'">
                <el-tag  v-for="(tag,key) in conditions" :key="tag" type="danger" closable @close="delCondition(key)">{{tag}}</el-tag>
            </div>
        </div>
        <div :class="{shown: minItem > 3}" v-if="condition.length > 0">
            <el-form class="condition">
                <el-form-item
                    v-for="(propObj,index) in condition"
                    :label="propObj.name"
                    :key = "propObj.name"
                    :class="{showAll: propObj.name === selectedItem }"
                    label-width="200px"
                    label-position="left">
                    <ul>
                        <li v-for="(subItem,index) in propObj.value" @click="searchWithText(propObj,subItem)" :key="subItem">
                            {{subItem}}
                        </li>
                    </ul>
                    <!--<div class="buttons" @click="showAllCondition" ref="buttons">-->
                    <!--<button>更多</button><i class="iconfont icon-xianshigengduo"></i>-->
                    <!--</div>-->
                </el-form-item>

            </el-form>
            <div class="loadMore" @click="showMore" v-if="condition.length > 3">
                <button>
                    <span v-if="!closeProps">{{$t("main.search.mainSeaMoreSelect")}}</span>
                    <span v-else="closeProps">{{$t("main.search.mainSeaUp")}}</span>
                    <i class="iconfont icon-xianshigengduo" :class="[closeProps ? 'show' : '']"></i>
                </button>
            </div>
        </div>
        <div class="content" v-if="data.length > 0">
            <div class="header">
                <div class="left">
                    <div class="synth" @click="selectOrderBy" data-value='A' :class='{active:activeItem == $t("main.search.mainSeaCompre")}'>{{$t("main.search.mainSeaCompre")}}</div>
                    <div class="price" @click="selectOrderBy" data-value='B' :class="[{active:activeItem == $t('main.search.mainSeaPrice'),isDesc:priceDesc}]">{{$t("main.search.mainSeaPrice")}}<i class="iconfont icon-shang1"></i></div>
                    <div class="time" @click="selectOrderBy"  data-value='C' :class='[{active:activeItem == $t("main.search.mainSeaShelf"),isDesc:cdateDesc}]'>{{$t("main.search.mainSeaShelf")}}<i class="iconfont icon-shang1"></i></div>
                    <!--<div class="input"><i class="iconfont icon-dingdanjine"></i><input type="text" class="lowest" @input="showRangeButton"></div>-->
                    <!--<div class="hr"></div>-->
                    <!--<div class="input"><i  class="iconfont icon-dingdanjine"></i><input type="text" class="highest" @input="showRangeButton"></div>-->
                    <!--<button v-show="showRange">确定</button>-->
                </div>
                <div class="right">
                    <div><span>{{search.page}}</span>/{{rightTotal}}</div>
                    <div class="buttons">
                        <el-button icon="el-icon-arrow-left" @click="prePage" :disabled="search.page === 1"></el-button>
                        <el-button icon="el-icon-arrow-right" @click="nextPage" :disabled="search.page === rightTotal"></el-button>
                    </div>
                </div>
            </div>
            <div class="search-result">
                <ul class="result">
                    <li v-for="item in data" :key="item.id" v-bind:class="{'limit':item.discount_type == 4,'reduce':item.discount_type == 2,'discount':item.discount_type == 1,'newSeller': item.isNew}">
                        <a :href="'/detail?t=' + new Date().getTime() +'#/info?id=' + item.id" target="_blank">
                            <div class="img" :style="{backgroundImage : 'url(' + item.image_value + '!item_middle)'}"></div>
                            <p class="name" :title="item.item_name">{{item.item_name}}</p>
                            <div class="item-price">
                                <button v-ltsLoginShow:false v-login>{{$t("main.search.mainSeaLogin")}}</button>
                                <!--<p class="price" v-ltsLoginShow:true v-if="item.activity_price">-->
                                    <!--<lts-money :money="item.activity_price"></lts-money>-->
                                <!--</p>-->
                                <p class="price" v-ltsLoginShow:true>
                                    <lts-money :money="item.price"></lts-money>
                                </p>
                            </div>
                        </a>
                    </li>
                </ul>
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total= "search.totalPage"
                    :page-size= "search.pageSize"
                    :prev-text='$t("main.search.mainSeaPre")'
                    :next-text='$t("main.search.mainSeaNext")'
                    :current-page="search.page"
                    @current-change="changePage"></el-pagination>
            </div>
        </div>
        <div v-else-if="data.length <= 0 && isLoadEnding" class="error">
            <div :style="{backgroundImage: 'url('+errorImg+')'}">
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import ItemService from '@/services/ItemService'
    export default {
        name: "search",
        data(){
            return{
                activeLi: '',
                activeOrderBy: '',
                selectedItem: '',
                minItem: 3,
                tag:[],
                showRange: false,
                condition: [],
                activeItem: this.$t("main.search.mainSeaCompre"),
                priceDesc: false,
                cdateDesc: false,
                search:{
                    condition:[],
                    text:'',
                    page:1,
                    pageSize:20,
                    totalPage:1,
                    cateId:'',
                    itemName:'',
                    brand:'',
                    puserId:'',
                    attribute_1:'',
                    discountType:'',
                    allStatus:'',
                    sin:'',
                    propValues:'',
                    orderBy:''
                },
                tags: [],
                data:[],
                rightTotal : 0,
                closeProps : false,

                errorImg : require('@/assets/img/error.png'),

                isLoadEnding : false,
                conditions:{}
            }

        },
        created(){
            this.selfContext.$on("getItemList",this.submit)
        },
        mounted(){
            $("html").attr('class','white')
            this.tags = this.$route.query.tags ? this.$route.query.tags.split(',') : [];
            this.submit();
        },
        methods: {
            changePage(currentPage){
                this.search.page = currentPage;
                this.searchWithText()
            },
            // 上下一页
            prePage(){
                this.search.page--
            },
            nextPage(){
                this.search.page++
            },
            searchWithText(spceList = {},item = ''){
                this.search.condition = []
                this.conditions[spceList.name] = item
                for(let key in this.conditions){
                    this.search.condition.push('' + key + ':' + this.conditions[key] + '')
                }
                this.submit()
            },
            // 调接口
            submit(){
                this.search.itemName = this.$route.query.keywords;
                if(this.$route.query.cateId == '-1000' || this.$route.query.cateId.length == ''){
                    this.search.cateId = '';
                }else{
                    this.search.cateId = JSON.parse(this.$route.query.cateId);
                }
                ItemService.searchItem(this.search,this.tags).then((rtn)=>{
                    this.data = rtn.data.item_d_o_list
                    this.data.forEach((item) => {
                        if(item.tag.indexOf('新品') != -1){
                            item.isNew = true
                        }
                    })
                    // TOOD 这里计算页数
                    this.search.totalPage = rtn.data.total;

                    this.rightTotal = Math.ceil(this.search.totalPage/this.search.pageSize);
                    if(this.condition.length == 0){
                        this.condition = rtn.data.aggregate_cate_prop_list;
                    }
                    this.isLoadEnding = true;
//                    for(let val in rtn.data.aggregate_cate_prop_map){
//                        let key = rtn.data.aggregate_cate_prop_map[val],Object = {};
//                        Object[key] = rtn.data.aggregate_cate_prop_map[val].split(',');
//                        this.condition.push(Object);
//                    }
                })
            },

            // 关闭条件
            delCondition(val) {
                delete this.conditions[val]
                this.search.condition = []
                for(let key in this.conditions){
                    this.search.condition.push('' + key + ':' + this.conditions[key] + '')
                }
                this.submit();
            },
            selected(selected){
                this.activeLi = selected
            },
            selectOrderBy(e){
                console.log(e.currentTarget.getAttribute("data-value"));
                this.priceDesc = false
                this.cdateDesc = false
                switch (e.currentTarget.getAttribute("data-value")){
                    case 'A':
                        this.search.orderBy = ''
                        this.activeItem = this.$t("main.search.mainSeaCompre");
                        break
                    case 'B':
                        this.search.orderBy = this.search.orderBy === 'price asc' ? 'price desc' : 'price asc'
                        this.activeItem = this.$t("main.search.mainSeaPrice");
                        this.priceDesc = this.search.orderBy === 'price desc' ? true :false
                        break
                    case 'C':
                        this.search.orderBy = this.search.orderBy === 'cdate asc' ? 'cdate desc' : 'cdate asc'
                        this.activeItem = this.$t("main.search.mainSeaShelf");
                        this.cdateDesc = this.search.orderBy === 'cdate desc' ? true :false
                        break
                }
                this.submit()
            },

            // 点击更多按钮
            showAllCondition(e){
                this.selectedItem = this.selectedItem === e.path[3].childNodes[0].innerText ? '' : e.path[3].childNodes[0].innerText
                console.log(this.selectedItem)

            },
            // 加载所有条件
            showMore(){
                this.closeProps = !this.closeProps;
                this.minItem = this.minItem === 3 ? this.condition.length : 3
            },

            // 输入价格区间显示确定按钮
            showRangeButton(){
                this.showRange = true
            }
        }
    }
</script>

<style lang="less">
    .b1200 .search-result{
        li{
            margin-right: 10px;
        }
        li:nth-child(4n){
            margin-right: 0;
        }
    }
    .b1500 .search-result{
        li{
            margin-right: 10px;
        }
        li:nth-child(5n){
            margin-right: 0;
        }
    }
    .search{
        *{
            box-sizing: border-box;
        }

        li{
            box-sizing: border-box;
            position: relative;
            overflow: hidden;
        }
        li.reduce::before,li.discount::before,li.limit::before,li.newSeller::before{
            content:'';
            width:100px;
            height: 100px;
            position: absolute;
            top: 0px;
            left: 0px;
            background-position: 0 0;
            background-repeat: no-repeat;
            background-size: 100px 100px;
        }
        li.newSeller::before{
            background-image:url('../../../assets/img/new.png');
        }
        li.reduce::before{
            background-image:url('../../../assets/img/ONSALE.png');
        }
        li.discount::before{
            background-image:url('../../../assets/img/Discount.png');
        }
        li.limit::before{
            background-image:url('../../../assets/img/Doorbuster.png');
        }
        button{
            cursor:pointer;
        }
        button:focus{
            outline: none;
        }
        overflow: hidden;
        ul{
            display: flex;
        }
        .nav {
            display: flex;
            justify-content: flex-start;
            .el-breadcrumb {
                margin-top: 4px;
                span{
                    color:#777;
                    font-size: 16px;
                    font-weight: normal;
                    i{
                        margin:0;
                    }
                }
            }
            .tags{
                margin-left: 12px;
                .el-tag{
                    border:1px solid #ff3b41;
                    height: 20px;
                    line-height: 18px;
                    background: #fff;
                    color: #ff3b41;
                    margin-right: 10px;
                    border-radius: 0;
                    i:hover{
                        color: #ff3b41;
                    }
                }
                .el-tag__close:hover{
                    background-color: transparent;
                }
            }
        }
        .shown{
            .condition{
                max-height: 2000px !important;
            }
        }
        .condition{
            width:100%;
            max-height: 108px;
            margin-top: 34px;
            display:inline-block;
            transition: all ease .5s;
            overflow: hidden;
            border: solid 1px #e0e0e0;
            .el-form{
                border:1px solid #e3e3e3;
            }
            .el-form-item:last-child{
                border-bottom:none;
            }
            .el-form-item{
                height: 36px;
                overflow: hidden;
                position: relative;
                border-bottom: 1px dashed #e3e3e3;
                margin-bottom: 0;
                padding-left: 50px;
                label{
                    line-height: 36px;
                    overflow: hidden;
                }
                label::after{
                    content:':';
                }
                ul{
                    width:80%;
                    display: flex;
                    flex-wrap: wrap;
                    li{
                        color:#ff3b41;
                        font-size: 14px;
                        line-height: 36px;
                        margin-right: 12px;
                        cursor:pointer;
                    }
                    li:hover{
                        color: #ff3b41;
                    }
                }
                .buttons{
                    position: absolute;
                    z-index: 20;
                    right: 97px;
                    top:-3px;
                    color:#777;
                    font-size: 12px;
                    cursor: pointer;
                    button{
                        width: 62px;
                        height: 26px;
                        background: #fff;
                        border:1px solid #777;
                        padding-left: 0;
                        color:#777;
                        cursor: pointer;
                    }
                    i{
                        position: absolute;
                        right:2px;
                        top:0;
                    }
                }
            }
            .el-form-item.showAll{
                height:auto;
                overflow: visible;
                .el-form-item{
                    min-height: 36px;
                    label{
                        min-height: 36px;
                    }
                }
            }
            position: relative;
            /*
            * 没有显示全的样式
            *
            */
            .el-form{
                border-bottom: 1px solid #e3e3e3;
                .el-form-item:nth-child(3){
                    border-bottom:none;
                }
            }
        }
        .loadMore{
            color: #777;
            position: relative;
            left: 50%;
            margin-left: -123px;
            margin-top: -6px;
            button{
                width: 247px;
                height: 42px;
                color: #777;
                background: #fff;
                font-size: 12px;
                border: 1px solid #e3e3e3;
                border-top: 1px solid #fff;
                cursor: pointer;
                display: flex;
                span{
                    flex:1;
                }
                i{
                    cursor: pointer;
                    display: block;
                    transition: all ease .2s;
                }
                .show{
                    transform: rotateZ(180deg);
                }
            }
        }
        .condition.shown{
            /*
            * 显示全了的样式
            *
            */
            .el-form{
                .el-form-item:nth-child(3){
                    border-bottom:1px dashed #e3e3e3;
                }
                .el-form-item:last-child{
                    border-bottom:none;
                }

            }
        }
        .content{
            margin-top: 22px;
            padding-bottom: 100px;
            .header{
                line-height: 40px;
                height:40px;
                width:100%;
                border:1px solid #e3e3e3;
                display: flex;
                justify-content: space-between;
                border-right: 0;
                .left{
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    color:#777;
                    div{
                        line-height: 40px;
                        border-right:1px solid #e3e3e3;
                        text-align: center;
                        cursor: pointer;
                    }
                    .synth{
                        min-width:58px;
                        padding: 0 10px;
                    }
                    .price{
                        width:92px;
                    }
                    .time{
                        width:119px;
                    }
                    div.active{
                        color:white;
                        background: #ff3b41;
                        border-right:1px solid #ff3b41;
                    }
                    div.isDesc{
                        i{
                            display: inline-block;
                            transform: rotate(180deg)
                        }
                    }

                    div.hr{
                        width:25px;
                        height: 1px;
                        background: #777;
                        border-right: 0;
                        margin: 3px  -20px 0 4px;
                    }
                    div.input{
                        border:none;
                        position: relative;
                        margin-top: -4px;
                        i{
                            display: block;
                            position: absolute;
                            left: 28px;
                            top: 2px;
                            color:#777;
                            z-index: 10;
                        }
                        input{
                            height: 24px;
                            width:72px;
                            padding-left: 20px;
                            vertical-align: middle;
                            position: relative;
                            margin-left: 24px;
                        }
                    }
                    button{
                        margin-left:24px;
                        width:44px;
                        color:#fff;
                        font-size: 14px;
                        border-radius: 2px;
                        border:1px solid #ff3b41;
                        background: #ff3b41;
                        line-height: 20px;
                    }
                }
                .right{
                    width:124px;
                    display: flex;
                    justify-content: space-between;
                    color: #999;
                    .buttons{
                        button{
                            padding:0;
                            height: 24px;
                            width:36px;
                            background: #fff;
                            margin:6px 0 0 -6px;
                            border-radius: 0;
                            position: relative;

                        }
                    }
                    span{
                        color: #ff3b41;
                    }
                }
            }

            .search-result{
                position: relative;
                ul.result{
                    display: flex;
                    flex-wrap: wrap;
                    width:100%;
                    margin-bottom: 80px;
                    li:hover{
                        -webkit-box-shadow: 0 15px 30px rgba(0,0,0,0.1);
                        box-shadow: 0 15px 30px rgba(0,0,0,0.1);
                        -webkit-transform: translate3d(0, -2px, 0);
                        transform: translate3d(0, -2px, 0);
                    }
                    li{
                        transition: all ease .2s;
                        width:290px;
                        overflow: hidden;
                        margin-top: 36px;
                        text-align: center;
                        border:1px  solid #f2f2f2;
                        .img{
                            width:100%;
                            height: 222px;
                            background-position: center center;
                            background-size: 190px auto;
                            background-repeat: no-repeat;
                            transition: all ease .4s;
                        }
                        p.name{
                            margin: 10px;
                            font-size: 14px;
                            color: #a3a3a3;
                            line-height: 18px;
                            height: 54px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 3;
                            -webkit-box-orient: vertical;
                        }
                        .item-price{
                            border-top:solid 1px #f2f2f2;
                            color:#ff3d41;
                            font-size: 26px;
                            font-weight: bold;
                            margin-top: 24px;
                            padding: 24px 0 30px 0;
                            button {
                                border: none;
                                width:60%;
                                height: 26px;
                                font-weight: bold;
                                font-size: 12px;
                                color: #ff3b41;
                                box-shadow: 0px 2px 15px 2px #e9e9e9;
                            }
                        }
                        position: relative;
                        .handle{
                            display: flex;
                            button{
                                width:50%;
                                height: 52px;
                                background: red;
                                border:none;
                                color: #fff;
                                font-size: 29px;
                                i{
                                    font-size: 29px;
                                }
                            }
                            button.cart{
                                background: #ce2127;
                            }
                            button.cart:focus{
                                background: #9b0e13;
                                border:none;
                            }
                            button.favo{
                                background: #999;
                            }
                            button.favo:focus{
                                background: #666;
                                border:none;
                            }
                        }
                    }
                    li::after{
                        content:'';
                        width:260px;
                        height: 1px;
                        background: #ddd;
                        position: absolute;
                        top:100%;
                        left:15px;

                    }
                }
                .el-pagination{
                    position: absolute;
                    right:0;
                    bottom: -45px;
                    display: flex;
                    .btn-next{
                        padding: 0 8px;
                    }
                    .btn-prev{
                        padding: 0 8px;
                    }
                }
            }
        }
        .error{
            width: 818px;
            height: 417px;

            margin: auto;
            div{
                width: 100%;
                height: 100%;
                background-size: cover;
                background-repeat: no-repeat;
            }
        }
    }

</style>
