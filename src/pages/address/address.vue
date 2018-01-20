<template>
    <div class="addressManage">
        <div class="info">
            <div class="avatar"></div>
            <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
        <div class="content">内容</div>
    </div>
</template>

<script>
    export default {
        name: "address",
        data(){
            return{

            }
        }
    }
</script>

<style lang="less">
    .addressManage{
        box-sizing: border-box;
        *{box-sizing: border-box;}
        border:1px solid red;
        height: 1000px;
        width:100%;
        display: flex;
        .info{
            margin-right: 48px;
            width:190px;
            padding:5px;
        }
        .content{
            flex:1;
            border:1px solid red;
        }
    }
</style>
