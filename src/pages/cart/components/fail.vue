<template>
    <div class="finish">
        <div class="mark"><p>您在支付的时候好像出现了一些问题</p></div>
        <div class="result">
            <div class="content">
                <h3>支付失败</h3>
                <p>订单编号：{{tid}}</p>
                <p>收货人：{{this.detailOrder.user_name}} {{this.detailOrder.receiver_mobile}}</p>
                <p :title="this.detailOrder.user_addr">收货地址：{{this.detailOrder.user_addr}}</p>
                <p>物流方式：{{method}}</p>
                <div class="button">
                    <a href="/order"><button class="go"><span>我的订单</span></button></a>
                    <a href="/"><button class="back"><span>回到首页</span></button></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import detailOrder from '@/services/OrderService'
    export default {
        name: "fail",
        data(){
            return{
                tid:0,
                detailOrder:[],
                method:"快递"
            }
        },
        methods:{
            gogogo(){
                this.$router.push({name:"order",params:{}});
            },
            back(){
                this.$router.push({path:"/",params:{}});
            },
            getTid(){
                this.tid = this.$route.params.tid;
                console.log(this.tid);
                detailOrder.detailOrder(this.tid).then((data) => {
                    this.detailOrder = data.data;
                    if(this.detailOrder.wholesale_order_items[0].s_h_s_m === true){
                        this.method = "送货上门"
                    }else{
                        this.method = "快递"
                    }
                    console.log(data);
                },(msg) => {
                    this.$ltsMessage.show({type:'error',message:msg.error_message})
                    console.log(msg);
                })
            }
        },
        mounted(){
            this.getTid();
        }
    }
</script>

<style scoped lang="less">
    .mark{
        margin: 24px 0;
        width: 100%;
        height: 40px;
        background-color: rgba(0, 0, 0, 0.05);
        color: rgba(0,0,0,0.7);
        line-height: 40px;
        font-size: 12px;
        p{
            margin-left: 24px;
        }
    }
    .result{
        width: 649px;
        height: 243px;
        margin:100px auto;
        display: flex;
        justify-content: space-between;
        img{
            width: 237px;
            height: 216px;
        }
        .content{
            width:330px;
            text-align: left;
            margin: 0 auto;
            h3{
                font-size: 36px;
                color: #f13a40;
                line-height: 50px;
            }
            p{
                line-height: 24px;
                font-size: 14px;
                color: rgba(0,0,0,0.5);
            }

            .button{
                button{
                    margin-top: 10px;
                    border-radius: 4px;
                    width: 100px;
                    height: 30px;
                    border: none;
                    cursor: pointer;
                    span{
                        color: white;
                        font-size: 14px;
                        line-height: 29PX;
                    }
                }
                button+button{
                    margin-left: 12px;
                }
                button.go{
                    background-color: #f13a40;
                }
                button.back{
                    background-color: rgba(0, 0, 0, 0.5);
                }
            }


        }
    }
</style>
