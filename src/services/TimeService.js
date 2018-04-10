import BaseService from "./abstract/BaseService";
export default class TimeService extends BaseService {
    static getUtcTime(time){
        //输入服务器对时间2018-04-10 13:59:06
        //返回标准时间
        //http://mall.lts.com:18085/gateway/time/utc_time?time=2018-04-10
        return super.getRequest('/time/utc_time', {time: time.replace(/\"/g,'')});
    }
    static getLocalTime(time){
        //输入标准时间2018-04-10T10:59:06.003Z
        //返回服务器对应对时间
        return super.getRequest('/time/local_time', {time: time.replace(/\"/g,'')});
    }
    static getTimeAndZone(time){
        //输入标准时间2018-04-10T10:59:06.003Z
        //返回服务器对应对时间
        return super.getRequest('/time/time_and_zone');
    }
}
