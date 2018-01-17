import BaseService from "./abstract/BaseService";
export default class OrderService extends BaseService {
    /**
     * return
     * params {wholesale_trade_request: JSON} wholesale_trade_request
     * @auth taohua
     * @remark 订单提交
     */
    static createTrade(param){
        let params = {
            wholesale_trade_request : JSON.stringify(param)
        };
        return super.getRequest('/wholesale/trade/create_trade',params)
    }

    // from nation

    static get(tid){
        let param = {
            tid : tid,
        };
        return super.getRequest('/static/test/json/detail.27519708890.json', param);
    }
    static getList(param = {}, page = 1, page_size = 10, order_by = 'cdate desc'){
        param.page = page;
        param.page_size = page_size;
        param.order_by = order_by;
        return super.getRequest('/static/test/json/order.list.json', param);
    }
    static accept(tid){
        let param = {
            tid : tid,
        };
        return super.getRequest('/store/order/accept', param);
    }
}
