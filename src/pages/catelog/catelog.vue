<template>
    <div class="catelog">
        <div v-for="(value,index) in list" :style="{backgroundImage : 'url(' + value +')'}" class="item">
             <img :src="value" />
        </div>
    </div>
</template>
<script>
    export default {
        name: 'catelog',
        data () {
            return {
                default : 'http://ltsres-us.oss-us-west-1.aliyuncs.com/catelog/',
                list : [],
            }
        },
        mounted(){
           for(let i = 1; i <= 44; i++){
               this.list.push(
                   this.default + i + '.png'
               )
           }
        }
    }
</script>
<style lang="less">
    .catelog{
        .item{
            margin-bottom: 12px;
            img{
                width: 100%;
            }
        }
        .item:last-child{
            margin-bottom: auto;
        }
    }
</style>
