export default {
    getItem(data){
        item = data.data || data.datalist;
        if(typeof(item) === 'Object'){
            this.filter(item)
        }else if(typeof(item) === 'Array'){
            item.forEach((value,index,array)=>{
                array[index] = this.filter(value)
            })
        }else{
            throw new Error("商品数据类型出错")
        }
        return item;
    },

    filter(item){
        item.price = (item.price/100).toFixed(2);
        item.cdate = item.cdate

        return item;
    },
}
