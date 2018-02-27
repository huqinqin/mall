<template>
    <div class="product" v-if="!isShowMenu">
        <div class="menu-list s-span-page">
            <ul>
                <li v-for="value in menuList">
                    <a :href="value.link" v-if="value.type == 'logo'" class="header-logo" :style="{backgroundImage : 'url('+value.icon+')'}"></a>
                    <a :href="value.link" v-else-if="!value.needLogin">
                        <span class="iconfont" :class="value.icon"></span>
                        <p>{{value.first}}</p>
                        <p>{{value.last}}</p>
                    </a>
                    <a :href="value.link" v-else v-login>
                        <el-badge :value="cart_num" :max="99" class="item" v-if="value.name == 'suopping cart'" :hidden="cart_num <= 0">
                                <span class="iconfont" :class="[value.icon,value.name == 'suopping cart' ? 'cart' : '']">
                                </span>
                        </el-badge>
                        <span class="iconfont" :class="[value.icon]" v-else>
                            </span>
                        <p>{{value.first}}</p>
                        <p>{{value.last}}</p>
                    </a>
                </li>
            </ul>
        </div>
        <div class="s-span-page search-bar">
            <el-input placeholder="搜索商品" v-model="keywords" class="input-with-select" @keyup.native.enter='searchToHref'>
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
    export default {
        name: "lts-header-a",
        methods:{
            // 获取类目数据
            getLocalStorage(){
                let data = JSON.parse(localStorage.getItem('categoryList'));
                if(data){
                    this.filterCategory(data);
                }else{
                    this.getCategoryList();
                }
            },
            filterCategory(categoryList){
                let count = 0;
                categoryList.forEach(function(value,index,array){
                    value.label = value.name
                    value.value = value.id
                    if(value.name == '全部'){
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
                        label:'全部',
                        value:'',
                        name : '全部',
                        id : '',
                        children : ''
                    })
                }
            },
            getCategoryList(){
                categoryService.getList().then((data)=>{
                    this.filterCategory(data.datalist);
                    localStorage.setItem("categoryList", JSON.stringify(data.datalist));
                },(msg)=>{
                    this.$ltsMessage.show({type:'error',message:msg.error_message})
                })
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
        created:{
            this.getParamas()
            this.getLocalStorage()
            this.getCartNum();
        }
    }
</script>

<style lang="less">

</style>
