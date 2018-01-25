export default {
    toPriceYuan: function (money) {
        return (money / 100).toFixed(2);
    },
    toPriceFen: function (money) {
        return money * 100;
    }
}
