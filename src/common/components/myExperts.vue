<template>
   <div class="wrapperExperts">
       <div class="el-icon-close" @click="close" style=""></div>
       <h3>CALL EXPERT</h3>
       <div class="box">
           <ul>
               <li><span>name：</span><span>{{someInfo.name}}</span></li>
               <li><span>contact：</span><span>{{someInfo.mobile}}</span></li>
               <li><span>email：</span><span>{{someInfo.email}}</span></li>
           </ul>
           <ul><img src="../../assets/img/expert.png" alt=""></ul>
       </div>
   </div>
</template>

<script>
 import expertService from '@/services/MyexpertService.js'
 import $ from 'jquery'
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
        width: 204px;
        /*background-color: #3b98ff;*/
        background: #dae2fa;
        color: rgba(102,102,102,0.8);
        border-radius: 4px;
        font-family: "Microsoft YaHei";

        .el-icon-close{
            font-size: 20px;
            position: absolute;
            right:30px;
            top:20px;
            color: #333;
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
                width: 90px;
                height: 80px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
</style>

