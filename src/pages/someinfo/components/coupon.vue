<template>
    <div class="coupon-info">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="Available Coupons" name="first">
                <ul>
                    <li v-for="bonus in ableBonusList">{{bonus.id}}</li>
                </ul>
            </el-tab-pane>
            <el-tab-pane label="Failure" name="second">
                <ul>
                    <li v-for="bonus in unableBonusList">{{bonus.id}}</li>
                </ul>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import checkService from '@/services/CheckService'
    import timeService from '@/services/TimeService'
    export default {
        name: "coupon",
        data(){
            return{
                activeName:'first',
                unableBonusList:[],
                ableBonusList:[],
                now:''
            }
        },
        methods:{
            handleClick(tab, event) {
                // console.log(tab, event);
            },
            getNowTime(){
                timeService.getTimeAndZone().then(time => {
                    this.now = new Date(time.current_time).getTime()
                    this.getBonusList()
                },err => {
                    this.$ltsMessage({type:'error',message:err.error_message})
                })

            },
            getBonusList(){
                checkService.checkInfo().then((data) => {
                    data.data.acc_books.forEach(t => {
                        if(t.subject === 2010102 && t.bonus){
                            t.bonus.datalist.forEach(item => {
                                debugger
                                if(item.end_time < this.now){
                                    this.unableBonusList.push(item)
                                }else{
                                    this.ableBonusList.push(item)
                                    this.unableBonusList.push(item)
                                }
                            })
                        }
                    })
                },(msg) => {
                    this.$ltsMessage({type:'error',message:msg.error_message})
                })
            }
        },
        mounted(){
            this.getNowTime()
        }
    }
</script>

<style scoped lang="less">
    .coupon-info{

    }
</style>
