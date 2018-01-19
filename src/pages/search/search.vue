<template>
    <div class="search">
        <div class="nav">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">商品</el-breadcrumb-item>
                <el-breadcrumb-item>所有商品</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="tags" v-if="search.condition.length > 0">
                <el-tag  v-for="(tag,index) in search.condition" :key="tag" type="danger" closable @close="delCondition(index)">{{tag}}</el-tag>
            </div>
        </div>
        <div class="condition" :class="{shown: minItem > 3}">
            <el-form>
                <el-form-item
                    :class="{showAll: key === selectedItem }"
                    v-for="(item,key,index) in condition"
                    :label="key"
                    :key = "key"
                    label-width="100px"
                    label-position="right"
                    v-show="index < minItem">
                    <ul>
                        <li v-for="(subItem,index) in item" @click="searchWithText(item,subItem)" :key="index">
                            {{subItem}}
                        </li>
                    </ul>
                    <!--更多（暂时不做，没那么多）-->
                    <!--<div class="buttons" @click="showAllCondition" ref="buttons">-->
                        <!--<button>更多</button><i class="iconfont icon-xianshigengduo"></i>-->
                    <!--</div>-->
                </el-form-item>
            </el-form>
            <div class="loadMore" @click="showMore" v-if="condition.length > 3">
                <button>更多选项</button>
                <i class="iconfont icon-xianshigengduo"></i>
            </div>

        </div>
        <div class="content">
            <div class="header">
                <div class="left">
                    <div class="synth" @click="selectOrderBy">综合</div>
                    <div class="price" @click="selectOrderBy">价格<i class="iconfont icon-shang1"></i></div>
                    <div class="time" @click="selectOrderBy">上架时间<i class="iconfont icon-shang1"></i></div>
                    <div class="input"><i class="iconfont icon-dingdanjine"></i><input type="text" class="lowest" @input="showRangeButton"></div>
                    <div class="hr"></div>
                    <div class="input"><i  class="iconfont icon-dingdanjine"></i><input type="text" class="highest" @input="showRangeButton"></div>
                    <button v-show="showRange">确定</button>
                </div>
                <div class="right">
                    <div><span>{{search.page}}</span>/{{search.totalPage}}</div>
                    <div class="buttons">
                        <el-button icon="el-icon-arrow-left" @click="prePage"></el-button>
                        <el-button icon="el-icon-arrow-right" @click="nextPage"></el-button>
                    </div>
                </div>
            </div>
            <div class="search-result">
                <ul class="result">
                    <li v-for="item in data" :key="item.id">
                        <div class="img" :style="{backgroundImage : 'url(' + item.image_value +')'}"></div>
                        <p class="brand">{{item.brand}}</p>
                        <p class="name">{{item.item_name}}</p>
                        <p class="sin">{{item.sin}}</p>
                        <p class="price">${{item.price_value}}</p>
                        <div class="handle">
                            <button class="cart"><i class="iconfont icon-gouwuche3"></i></button>
                            <button class="favo"><i class="iconfont icon-shoucang1"></i></button>
                        </div>
                    </li>
                </ul>
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total= "search.totalPage * search.pageSize"
                    :page-size= "search.pageSize"
                    prev-text="上一页"
                    next-text="下一页"
                    :current-page="search.page"
                    @current-change="changePage"></el-pagination>


            </div>
        </div>
    </div>
</template>

<script>
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
                condition: {},
                search:{
                    condition:[],
                    text:'',
                    page:1,
                    pageSize:20,

                    totalPage:5,
                    cateId:'',
                    itemName:'',
                    brand:'',
                    puserId:'',
                    attribute_1:'',
                    discountType:'',
                    allStatus:'',
                    sin:'',
                    propValues:''
                },
                data:[]
            }

        },
        mounted(){
            this.submit()
        },
        methods: {

            changePage(currentPage){
                this.search.page = currentPage
                this.searchWithText()
            },
            // 上下一页
            prePage(){
                this.search.page--
            },
            nextPage(){
                this.search.page++
            },

            // 获取参数
            queryString(name){
                let query = window.location.search.substring(1)
                let vars = query.split("&")
                for(let i=0;i<vars.length;i++){
                    let pair = vars[i].split('=')
                    if(pair[0] === name){
                        return pair[1]
                    }
                }
                return false
            },
            searchWithText(spceList = [],item = ''){
                // 排除同一组规格的条件
                for (var n=0;n<spceList.length ;n++){
                    let condition = this.search.condition;
                    if(Array.isArray(condition)){
                        condition.forEach((cond,i)=>{
                            if(spceList[n] === cond){
                                this.search.condition.splice(i,1);
                            }
                        })
                    }else break;
                }

                // 加入条件
                if(item){
                    this.search.condition.push(item);
                }
                this.submit()
            },
            // 调接口
            submit(){
                this.search.itemName = this.queryString('keywords')
                this.search.cateId = this.queryString('cateId')
                ItemService.searchItem(this.search).then((rtn)=>{
                    this.data = rtn.data.item_d_o_list
                    let data2 = rtn.data.aggregate_cate_prop_map
                    for(let val in data2){
                        this.condition[val] = data2[val].split(',')
                    }

                })
            },

            // 关闭条件
            delCondition(index) {
                this.search.condition.splice(index, 1);
                this.searchWithText(this.text);
            },
            selected(selected){
                this.activeLi = selected
            },
            selectOrderBy(e){
                this.activeOrderBy = e.target.innerText
                console.log(e.target.innerText)
            },

            // 点击更多按钮
            showAllCondition(e){
                this.selectedItem = this.selectedItem === e.path[3].childNodes[0].innerText ? '' : e.path[3].childNodes[0].innerText
                console.log(this.selectedItem)

            },
            // 加载所有条件
            showMore(){
                this.minItem = this.minItem === 3 ? 100 : 3
            },

            // 输入价格区间显示确定按钮
            showRangeButton(){
                this.showRange = true
            }
        }
    }
</script>

<style lang="less">
    *{
        box-sizing: border-box;
    }
    button{
        cursor:pointer;
    }
    button:focus{
        outline: none;
    }
    .search{
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
                    width:80px;
                    height: 20px;
                    line-height: 18px;
                    border-radius: 0;
                    margin-right: 12px;
                    margin-bottom: -2px;
                    background: #fff;
                    color: #ff3b41;
                    text-align: center;
                    position: relative;
                    i{
                        color: #ff3b41;
                        left: 10px;
                        top:-2px;
                    }
                    i:hover{
                        color: #ff3b41;
                    }
                }
                .el-tag:nth-child(1){
                    i{
                    }
                }
            }
        }
        .condition{
            width:100%;
            height: 116px;
            margin-top: 34px;
            display:inline-block;
            .el-form{
                border:1px solid #e3e3e3;
            }
            .el-form-item{
                height: 36px;
                overflow: hidden;
                position: relative;
                border-bottom: 1px dashed #e3e3e3;
                margin-bottom: 0;
                transition: all ease 5s;
                label{
                    line-height: 36px;
                }
                label::after{
                    content:':';
                }
                ul{
                    width:80%;
                    display: flex;
                    flex-wrap: wrap;
                    li{
                        color:#777;
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
            .loadMore{
                color: #777;
                position: relative;
                left: 50%;
                top: -2px;
                margin-left: -123px;
                margin-top: -1px;
                border-top:2px solid #fff;
                button{
                    width: 247px;
                    height: 42px;
                    color: #777;
                    background: #fff;
                    font-size: 12px;
                    border: 1px solid #e3e3e3;
                    border-top: 1px solid #fff;
                    cursor: pointer;
                }
                i{
                    position: relative;
                    left:160px;
                    top:-28px;
                    cursor: pointer;
                    display: block;
                }
            }
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
                .loadMore{
                    i{
                        transform: rotate(30deg);
                    }

                }
            }

        }
        .content{
            margin-top: 64px;
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
                        width:58px;
                        color:white;
                        background: #ff3b41;
                        border-right:1px solid #ff3b41;
                    }
                    .price{
                        width:92px;
                    }
                    .time{
                        width:119px;
                    }
                    div.selected{
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
                    justify-content: space-between;
                    width:100%;
                    margin-bottom: 80px;
                    li{
                        width:23%;
                        height: 430px;
                        overflow: hidden;
                        margin-top: 36px;
                        text-align: center;
                        border:1px  solid #ddd;
                        .img{
                            width:100%;
                            height: 222px;
                            background-position: center;
                            background-size: cover;
                            margin-bottom: 48px;
                            transition: all ease .4s;
                        }
                        p.brand{
                            line-height: 18px;
                            height: 18px;
                            font-weight: bold;
                            font-size: 14px;
                            color: #707070;
                            transition: all ease .2s;
                        }
                        p.name{
                            margin: 10px 0;
                            font-size: 14px;
                            color: #a3a3a3;
                        }
                        p.sin{
                            margin: 10px 10px;
                            padding-bottom: 10px;
                            font-size: 14px;
                            color: #a3a3a3;
                            border-bottom: 1px solid #ddd;
                            transition: all ease .2s;
                        }

                        p.price{
                            color:#ff3d43;
                            font-size: 26px;
                            font-weight: bold;
                            padding-bottom: 28px;
                            transition: all ease .2s;
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
                    li:hover{
                        .img{
                            margin-bottom: 0px;
                        }
                        p.brand{
                            margin-top: 6px;
                        }
                        p.sin{
                            margin-bottom: 8px;
                        }
                        p.price{
                            padding-bottom: 20px;
                        }
                    }
                }
                .el-pagination{
                    position: absolute;
                    right:0;
                    bottom: -45px;
                    display: flex;
                }
            }
        }
    }
</style>
