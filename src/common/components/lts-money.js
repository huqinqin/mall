Vue.component('lts-money',{
    template: '<span>{{activeSymbol}}{{ commoney }}</span>',
    props: ['money'],
    data(){
        return {
            symbol : ['$','￥','&'],
            activeSymbol : "$",
            ltsmoney : this.money,
        }
    },
    computed:{
        commoney(){
            this.ltsmoney = this.money;
            return this.ltsmoney = (parseFloat(this.ltsmoney) / 100).toFixed(2);
        }
    }

})
