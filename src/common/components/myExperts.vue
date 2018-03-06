<template>
   <div class="wrapperExperts">
       <div class="el-icon-close" @click="close"></div>
       <h3>联系我的专家</h3>
       <div class="box">
           <ul>
               <li><span>姓名：</span><span>{{someInfo.name}}</span></li>
               <li><span>联系方式：</span><span>{{someInfo.mobile}}</span></li>
               <li><span>邮箱：</span><span>{{someInfo.email}}</span></li>
           </ul>
           <ul><img src="../../assets/img/expert.png" alt=""></ul>
       </div>
   </div>
</template>

<script>
 import expertService from '@/services/MyexpertService.js'

  export default {
     name:'expert',
      data(){
          return{
              flag:false,
              someInfo:{
                  name: '抹茶',
                  mobile: '626-435-2838',
                  email: '92839382@qq.com'
              }
          }
      },
      methods:{
          close(){
              this.$emit('close',this.flag);
              $('.el-tooltip__popper').css('display','none');
          },
          getExpert(){
              expertService.getExpert().then((data) => {
                  this.someInfo = data.data;
              });
          },
      },
      mounted(){
          this.getExpert();
      }
  };
</script>

<style lang="less">
    .el-tooltip__popper.is-light{
        border: none;
    }
    .wrapperExperts{
        padding: 40px;
        width: 257px;
        /*background-color: #3b98ff;*/
        background:linear-gradient(#0e75ea, #2473EA, #3d97fc);
        color: #fff;
        border-radius: 4px;
        .el-icon-close{
            font-size: 20px;
            color: white;
            position: absolute;
            right:30px;
            top:20px;
        }
        .box{
            display: flex;
            align-items: center;
            justify-content: center;
            ul{
                padding:0;
                li{
                    list-style: none;
                    margin-top: 15px;
                }
            }
            ul:first-child{
                flex:1;
            }
            ul:nth-child(2){
                flex:0 0 75px;
                img{
                    width: 75px;
                    height: 69px;
                }
            }
            .icon-jiankangzhuanjia{
                color: #fff;
                font-size: 100px;
                height: 102px;
            }
        }

    }
</style>

