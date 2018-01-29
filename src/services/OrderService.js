import BaseService from "./abstract/BaseService";
export default class OrderService extends BaseService {
    // /**
    //  * return
    //  * params {wholesale_trade_request: JSON} wholesale_trade_request
    //  * @auth taohua
    //  * @remark 订单提交
    //  */
    // static createTrade(param){
    //     let params = {
    //         wholesale_trade_request : JSON.stringify(param)
    //     };
    //     return super.getRequest('/wholesale/trade/create_trade',params)
    // }

    // from nation

    /*获取订单的详细信息*/
    static get(tid){
        let param = {
            tid : tid,
        };
        return super.getRequest('/installer/order/detail', param);
    }
   /*获取订单的所有信息*/
    static getList(param = {}, page = 1, page_size = 10, order_by = 'cdate desc'){
        param.page = page;
        param.page_size = page_size;
        param.order_by = order_by;
        return super.getRequest('/installer/order/list', param);
    }

    static accept(tid){
        let param = {
            tid : tid,
        };
        return super.getRequest('/store/order/accept', param);
    }
    /*模拟下单*/
    static simulateCreateTrade(param){
        let params = {
            wholesale_trade_request : JSON.stringify(param)
        };
        return super.postRequest('/installer/trade/simulate_create_trade',params)
    }
    /*正式下单*/
    static createTrade(param,remark){
        let params = {
            wholesale_trade_request : JSON.stringify(param),

            remark: remark
        };
        return super.postRequest('/installer/trade/create_trade',params)
    }
    static checkOrder(param){
        let params = {
            tid: param
        };
        return super.getRequest('/store/order/detail',params);
    }
    /*获取订单的详细信息*/
    static detailOrder(param){
        let params = {
            tid: param
        };
        return super.getRequest('/store/order/query_single_by_tid',params);
    }
    static close_by_tid(tid){
        let params = {
            tid: tid
        };
        return super.getRequest('/installer/order/close_by_tid',params);
    }
    /*模拟支付获取账户余额*/
    static simulatePay(param){
        let params = {
            tid: param.tid,
            pay_bank: param.payBank,
            pay_source: param.paySource,
        };
        return super.postRequest('/trade_pay/simulate_pay_confirm',params);
    }

    /*使用余额支付*/
    static pay_confirm(tid){
        let params = {
            tid: tid,
            pay_bank: 'BALANCE',
            pay_source: 'BALANCE',
            use_balance: true
        };
        return super.postRequest('/trade_pay/pay_confirm',params);
    }
}
