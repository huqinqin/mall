<template>
   <div class="wrapperExperts">
       <div class="el-icon-close" @click="close" style=""></div>
       <h3>Call Expert</h3>
       <div class="box">
           <ul>
               <li><span>Name：</span><span>{{someInfo.name}}</span></li>
               <li><span>Contact：</span><span>{{someInfo.mobile}}</span></li>
               <li><span>Email：</span><span>{{someInfo.email}}</span></li>
               <li><span>Store：</span><span>{{someInfo.p_shop_name}}</span></li>
               <li><span>Store Addr：</span><span>{{someInfo.p_shop_addr}}</span></li>
           </ul>
           <ul><img src="../../assets/img/expertIcon.png" alt=""></ul>
       </div>
   </div>
</template>

<script>
 // import expertService from '@/services/MyexpertService.js'
 import {store} from 'ltsutil'
 import $ from 'jquery'
  export default {
     name:'expert',
      data(){
          return{
              flag:false,
              someInfo:{
                  name: 'Kevin',
                  mobile: '888-216-2812',
                  email: 'Support.SanFrancisco@LTSecurityinc.com',
                  p_shop_name:'San Francisco',
                  p_shop_addr:'38507 Cherry St. Suite GNewark, CA 94560'
              }
          }
      },
      methods:{
          close(){
              this.$emit('close',this.flag);
              $('.el-tooltip__popper').css('display','none');
          },
          getExpert() {
              let data = store.getItem('expert');
              if (data) {
                  for (var value in data) {
                      if (data[value] === '' || data[value] === 'null' || data[value] === 'undefined') {
                          return false;
                      }
                  }
                  this.someInfo = data;
              }
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
        padding: 20px;
        /*width: 298px;*/
        /*background-color: #3b98ff;*/
        background: #f8fcff;
        color: rgba(102,102,102,0.8);
        border-radius: 4px;
        font-family: "Microsoft YaHei";
        .el-icon-close{
            font-size: 20px;
            position: absolute;
            right:20px;
            top:20px;
            color: #bbbec0;
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
                margin-right: 20px;
            }
            ul:nth-child(2){
                width: 63px;
                height: 69px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
</style>

