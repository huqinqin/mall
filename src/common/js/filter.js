/**
 * 全局过滤器
 * @Author Nation
 * @cdate 2018-01-20
 */
import Vue from 'vue'
import {dateUtils,moneyUtils} from 'ltsutil'
/**
 * 时间戳转当前语言的字符串时间格式
 * 示例: 1516427888979 => 01-02-2018 12:01:02
 */
Vue.filter('timestamp2str', function (timestamp) {
    if (!timestamp) return '';
    return dateUtils.format(new Date(timestamp));
});
/**
 * yyyy-MM-dd hh:mm:ss转当前语言的字符串时间格式
 * 示例: 2018-01-02 12:01:02 => 01-02-2018 12:01:02
 */
Vue.filter('strtime2str', function (strtime) {
    if (!strtime) return '';
    return dateUtils.timeToStr(dateUtils.getUnixTime(strtime));
});
/**
 * 钱的显示转换为当前语言的可读性字符串
 * 示例: 1000 => 10.00
 */
Vue.filter('money2str', function (money) {
    if (money == null || money === '') return '';
    return moneyUtils.toPriceYuan(money);
});
