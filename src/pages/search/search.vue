<template>
    <div class="search">
        <div class="nav">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">商品</el-breadcrumb-item>
                <el-breadcrumb-item>所有商品</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="tags">
                <el-tag v-for="(tag,index) in search.condition" closable @close="delCondition(index)">{{tag}}</el-tag>
            </div>
        </div>
        <div class="condition">
            <el-form>
                <el-form-item v-for="(item,key) in condition" :label="key + ':'" label-width="100px" label-position="right">
                    <ul>
                        <li v-for="subItem in item" @click="searchWithText(item,subItem)" class="{active: activeLi === selected }">
                            {{subItem}}
                        </li>
                    </ul>
                    
                    <button>更多</button>
                </el-form-item>
            </el-form>
        </div>
        <div class="content">
            <div class="header">
                <div class="left">
                    <div v-for="(item,key) in orderBy" :class="key" @click="selectOrderBy" >{{item}}</div>
                    <div class="input"><i class="iconfont icon-qc-jine"></i><input type="text" class="lowest"></div>
                    <div class="hr"></div>
                    <div class="input"><i  class="iconfont icon-qc-jine"></i><input type="text" class="highest"></div>
                    <button>确定</button>
                </div>
                <div class="right">
                    <div><span>{{search.page}}</span>/{{search.totalPage}}</div>
                    <div class="buttons">
                        <el-button icon="el-icon-arrow-left"></el-button>
                        <el-button icon="el-icon-arrow-right"></el-button>
                    </div>
                </div>
            </div>
            <div class="search-result">
                <ul class="result">
                    <li v-for="item in data">
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
                <el-pagination background
                               layout="prev, pager, next"
                               :total="40"
                               page-size="8"
                               prev-text="上一页"
                               next-text="下一页"></el-pagination>
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
                // 选择排序方式
                orderBy: {synth:'综合',price:'价格',time:'上架时间'},
                activeOrderBy: '',
                condition: {},
                search:{
                    condition:[],
                    text:'',
                    page:0,
                    pageSize:20,
                    totalPage:0,
                },
                data:[]
            }
        },
        mounted(){
            this.init();
        },
        methods: {
            init(){
                this.loadCondition();
                this.searchWithText();
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

                ItemService.searchItemList(this.search.text,this.search.condition).then((rtn)=>{
                    this.data = rtn;
                })
            },
            // 加载条件
            loadCondition(){
                this.condition = {

                    '像素':['100W','101W','102W','103W','104W','105W','106W','107W','108W'],
                    '镜头':['2.8mm','2.8mm','2.8mm','2.8mm','2.8mm','2.8mm','2.8mm','2.8mm'],
                    '供电方式':['DC12V','DC12V','DC12V','DC12V','DC12V','DC12V','DC12V','DC12V',],
                }
            },

            // 关闭条件
            delCondition(index) {
                this.search.condition.splice(index, 1);
                this.searchWithText(this.text);
            },
            selected(selected){
                this.activeLi = selected
            },
            selectOrderBy(selected){
                this.activeOrderBy = selected
            }
        }

    }
</script>

<style lang="less">
    *{
        box-sizing: border-box;
    }
    .search{
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
            border:1px solid #e3e3e3;
            margin-top: 36px;
            .el-form-item{
                height: 36px;
                line-height: 36px;
                margin-bottom: 0;
                overflow: hidden;
                li{
                    color:#777;
                    font-size: 14px;
                    margin-right: 12px;
                    cursor:pointer;
                }
                li.active{
                    border:1px solid red;
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
                    div{
                        line-height: 40px;
                        border-right:1px solid #e3e3e3;
                        text-align: center;
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
                    width:160px;
                    display: flex;
                    justify-content: space-between;
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
                        height: 432px;
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
