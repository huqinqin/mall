/**
 * 是否为开发者模式
 * @type {boolean}
 */
import api from './api'
const isDebug = false;
const isUseMock = false;
export default {
    url: {
        main: 'http://work.local.lts.com:8085'
    },
    api:{
        service:'http://mall.lts.com:18085/gateway'
    },
    homePage: '/',
    loginPage: '/login',
    appKey: '00000-500mi',
    // 用户session在本地存储名
    sessDataName: 'SESSION_DATA',
    isUseMock: isUseMock,
    isDebug: isDebug,
    // log等级 debug info error warnning notice prod, 暂未实现
    logLevel: 'debug',

    // 页面配置  暂时放这里
    isWhite : false, // 是不是白色背景
}
