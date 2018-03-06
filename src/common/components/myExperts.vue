<style lang="less">
   .wrapperExperts{
       padding: 40px;
       width: 425px;
       height: 200px;
       background-color: #3b98ff;
       color: #fff;
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
               flex:0 0 250px;
           }
           ul:nth-child(2){
               flex:1;
           }
           .icon-jiankangzhuanjia{
               color: #fff;
               font-size: 100px;
               height: 102px;
           }
       }

   }
</style>

<script>
  export default {
      template : '<div class="wrapperExperts">\n' +
      '       <div class="el-icon-close" @click="close"></div>\n' +
      '       <h3>{{$t("common.myExpert.commMyExpert")}}</h3>\n' +
      '       <div class="box">\n' +
      '           <ul>\n' +
      '               <li><span>{{$t("common.myExpert.commMyName")}}：</span><span>抹茶</span></li>\n' +
      '               <li><span>{{$t("common.myExpert.commMyContact")}}：</span><span>13069874561</span></li>\n' +
      '               <li><span>{{$t("common.myExpert.commMyEmail")}}：</span><span>89652541@qq.com</span></li>\n' +
      '           </ul>\n' +
      '           <ul class="iconfont icon-jiankangzhuanjia"></ul>\n' +
      '       </div>\n' +
      '   </div>',
      data(){
          return{
              flag:false
          }
      },
      methods:{
          close(){
              this.$emit('close',this.flag);
              $('.el-tooltip__popper').css('display','none');
          }
      }
  };
</script>

