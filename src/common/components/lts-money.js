import Vue from 'vue'
Vue.component('lts-money',{
    template: '<span>{{activeSymbol}}{{ ltsmoney }}</span>',
    props: ['money'],
    data(){
        return {
            symbol : ['$','￥','&'],
            activeSymbol : "$",
            ltsmoney : this.money,
        }
    },
    mounted(){
       this.ltsmoney = (this.ltsmoney / 100).toFixed(2);
    },
})
