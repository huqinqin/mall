<template>
    <div class="catelog">
        <div v-for="(value,index) in list" class="item">
             <img :src="value" />
        </div>
        <div class="buttons">
            <div class="to-top" @click="upTop" title="Back to Top"><i class="el-icon-upload2"></i></div>
            <div class="download" title="Download Catelog"><a href="/static/pdf/Catelog.pdf" download="Catelog.pdf"><i class="el-icon-download"></i></a></div>
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
        methods:{
            upTop(){
                let timer = setInterval( () => {
                    let oTop = document.body.scrollTop || document.documentElement.scrollTop;
                    if(oTop > 0){
                        window.scrollTo(0, oTop - 500);
                    }else{
                        clearInterval(timer)
                    }
                },10)

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
        transition: all 1s ease-out;
        .item{
            margin-bottom: 12px;
            img{
                width: 100%;
            }
        }
        .item:last-child{
            margin-bottom: auto;
        }
        .buttons{
            font-size: 32px;
            position: fixed;
            right:8%;
            top:50%;
            div{
                width:40px;
                height: 40px;
                border:1px solid #ddd;
                border-radius: 50%;
                vertical-align: middle;
                text-align: center;
                cursor: pointer;
                margin-top: 12px;
            }
        }
    }
</style>
