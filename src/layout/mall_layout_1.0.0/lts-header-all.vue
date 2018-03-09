<template>
    <div class="product all-head" slot="header">
        <div class="menu-list s-span-page">
            <ul>
               <li v-for="value in menuList" >
                     <div>
                        <a :href="value.link" v-if="value.type == 'logo'" class="header-logo" :style="{backgroundImage : 'url('+value.icon+')'}"></a>
                        <a :href="value.link" v-else-if="value.name === 'call experts'">
                             <el-tooltip placement="top" effect="ligth">
                                 <div>
                                     <span class="iconfont" :class="value.icon"></span>
                                     <p>{{value.first}}</p>
                                     <p>{{value.last}}</p>
                                 </div>
                                 <div slot="content"><myExperts></myExperts></div>
                             </el-tooltip>
                         </a>
                        <a :href="value.link" v-else-if="!value.needLogin" @click="menuHandle">
                             <span class="iconfont" :class="value.icon"></span>
                             <p>{{value.first}}</p>
                             <p>{{value.last}}</p>
                        </a>
                        <a :href="value.link" v-else v-login @click="menuHandle">
                                    <el-badge :value="cart_num" :max="99" class="item" v-if="value.name == 'suopping cart'" :hidden="cart_num <= 0">

                                <span class="iconfont" :class="[value.icon,value.name == 'suopping cart' ? 'cart' : '']">
                                </span>
                                    </el-badge>
                                    <span class="iconfont" :class="[value.icon]" v-else>
                            </span>
                                    <p>{{value.first}}</p>
                                    <p>{{value.last}}</p>
                                </a>
                     </div>
                </li>
            </ul>
        </div>
        <div class="s-span-page search-bar">
            <el-input :placeholder="$t('comHeader.headerSearchGoods')" v-model="keywords" class="input-with-select" @keyup.native.enter='searchToHref'>
                <el-cascader
                    slot="prepend"
                    :placeholder="select"
                    expand-trigger="hover"
                    :options="options"
                    v-model="selectedOptions"
                    style="width: 240px"
                    @change="handleChange">
                </el-cascader>
                <el-button slot="append" type="primary" icon="el-icon-search" @click="searchToHref"></el-button>
            </el-input>
        </div>
    </div>
</template>

<script>
    import categoryService from '@/services/CategoryService.js'
    import cartService from '@/services/CartService.js'
    import myExperts from '@/common/components/myExperts'
    export default {
        name: "lts-header-all",
        data(){
            return{
                menuList : [
                    {
                        name : 'ip solution',
                        icon : 'icon-IPjiejuefangan',
                        first : 'IP',
                        last : 'SOLUTION',
                        link : '/search#/?cateId=9487608',
                        needLogin : false
                    },
                    {
                        name : 'hdtvi solution',
                        icon : 'icon-jiankong',
                        first : 'HD-TVI',
                        last : 'SOLUTION',
                        link : '/search#/?cateId=9487675',
                        needLogin : false
                    },
                    {
                        name : 'shopby scenario',
                        icon : 'icon-qiyejiejuefangan',
                        first : 'SHOP BY',
                        last : 'SCENARIO',
                        link : 'javascript:void(0)',
                        needLogin : false
                    },
                    {
                        name : 'project registration',
                        icon : 'icon-jiatingjiejuefangan',
                        first : 'Project',
                        last : 'Registration',
                        link : 'javascript:void(0)',
                        needLogin : false
                    },
                    {
                        name : 'logo',
                        icon :  require('../../assets/img/header-logo.png'),
                        type : 'logo',
                        link : '/',
                        needLogin : false
                    },
                    {
                        name : 'call experts',
                        icon : 'icon-lianxixiaoshoukefu',
                        first : 'CALL',
                        last : 'EXPERTS',
                        link : 'javascript:void(0)',
                        needLogin : false
                    },
                    {
                        name : 'support center',
                        icon : 'icon-zhichi',
                        first : 'SUPPORT',
                        last : 'CENTER',
                        link : 'javascript:void(0)',
                        needLogin : false
                    },
                    {
                        name : 'my favorite',
                        icon : 'icon-yewushouce',
                        first : 'PRODUCT',
                        last : 'CATALOG',
                        link : '/catelog',
                        needLogin : false
                    },
                    {
                        name : 'suopping cart',
                        icon : 'icon-gouwuche2',
                        first : 'SUOPPING',
                        last : 'CART',
                        link : '/cart',
                        needLogin : true
                    }
                ],
                keywords: '',
                tags: '',
                select: this.$t("comHeader.headerAllclassify"),
                options:[],
                selectedOptions:[],
                cart_num : -1,
            }
        },
        methods:{
            // 头部菜单选择
            menuHandle(){
              setTimeout(() => {
                this.selfContext.$emit('getItemList')
              },100)
            },
            // 获取类目数据
            getLocalStorage(){
                let data = JSON.parse(localStorage.getItem('categoryList'));
                if(data){
                    this.filterCategory(data);
                }else{
                    this.getCategoryList();
                }
            },
            searchToHref(){
                location.href = '/search#/?cateId=' + this.selectedOptions + '&keywords=' + this.keywords + '&tags=' + this.tags;
                this.selfContext.$emit('getItemList')
            },
            getCategoryList(){
                categoryService.getList().then((data)=>{
                    this.filterCategory(data.datalist);
                    localStorage.setItem("categoryList", JSON.stringify(data.datalist));
                },(msg)=>{
                    this.$ltsMessage.show({type:'error',message:msg.error_message})
                })
            },
            filterCategory(categoryList){
                let count = 0;
                categoryList.forEach(function(value,index,array){
                    value.label = value.name
                    value.value = value.id
                    if(value.id == -1000){
                      value.value = ''
                        count ++ ;
                    }
                    if(value.children){
                        if(value.children.length === 0){
                            delete value.children
                        }else{
                            value.children.forEach((value1) => {
                                value1.label = value1.name
                                value1.value = value1.id
                                if(value1.children){
                                    if(value1.children.length === 0){
                                        delete value1.children
                                    }else{
                                        value1.children.forEach((value2) => {
                                            value1.label = value1.name
                                            value1.value = value1.id
                                        })
                                    }
                                }else{
                                    return false;
                                }

                            })
                        }
                    }else{
                        return false;
                    }
                })
                this.options = categoryList
                if(count == 0){
                    this.options.unshift({
                        label: this.$t("comHeader.headerAll"),
                        value:'',
                        name : this.$t("comHeader.headerAll"),
                        id : '-1000',
                        children : ''
                    })
                }
            },
            handleChange(value){
                // 级联选择器选择类目
                this.keywords = ''
                window.location.href = '/search#/?cateId=' + this.selectedOptions
                this.selfContext.$emit('getItemList')
            },
            getParamas(){
                let cateList = []
                if(this.$route && this.$route.query.cateId){
                    this.$route.query.cateId.split(",").forEach((value) => {
                        cateList.push(+value);
                    })
                    this.selectedOptions = cateList;
                }
                if(this.$route && this.$route.query.keywords){
                    this.keywords = this.$route.query.keywords
                }
            },
            getCartNum(){
                cartService.queryCartCount().then((data)=>{
                    this.cart_num = data.data;
                },(msg)=>{
                    this.$ltsMessage.show({type:'error',message:msg.error_message})
                })
            },
        },
        created(){
            this.selfContext.$on('addCartSuccess',this.getCartNum)
            this.getParamas()
            this.getLocalStorage()
            this.getCartNum();
        },
        components: {
            myExperts

        }
    }
</script>

<style lang="less">
    .all-head{
        background-color: white;
        .search-bar{
            padding-bottom: 24px;
        }
        .header-logo{
            width: 300px;
            height:74px;
            background-position: center;
            background-size: cover;
            display: flex;
        }
        .menu-list{
            padding: 24px 0;
            ul{
                display: flex;
                height: 100%;
                align-items: center;
                li{
                    flex:1;
                    text-align: center;
                    overflow: inherit;
                    a{
                        text-decoration: none;
                        .iconfont{
                            font-size: 42px;
                            color: #4c4c4c;
                        }
                        .cart{
                            color: #f13a40;
                        }
                        p{
                            text-align: center;
                            color: #737373;
                            font-size: 12px;
                            transition: all ease .2s;
                        }
                    }
                    a:hover{
                        p{
                            color: #ff3b41;
                        }

                    }
                }
            }
        }
        .input-with-select{
            .el-input-group__prepend{
                padding:0;
                border:none;
                .el-cascader{
                    width:110px;
                }
            }
            .el-input-group__append{
                border:none;
            }

        }
    }
</style>
