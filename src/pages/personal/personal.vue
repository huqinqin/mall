<template>
    <div class="account">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "personal",
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style lang="less">
    .personal {
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        a {
            text-decoration: none;
            color: inherit;
        }
        ol, ul {
            list-style: none;
        }
        font-size: 14px;
        button {
            font-weight: bold;
            color: white;
            height: 30px;
        }
        button:hover, button:focus {
            color: white;
            border: 1px solid inherit;
        }
        input {
            padding-left: 8px;
            height: 30px;
        }
        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #585858;
            .title {
                padding: 0 45px;
                font-weight: bold;
                font-size: 18px;
                line-height: 22px;
            }
            .line {
                height: 2px;
                width: auto;
                background: #f3bc39;
                flex: 1;
                border-right: 2px;
            }
        }
    }
</style>
