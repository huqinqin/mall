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
    /**
     *retrun data
     * params {order_tid}
     * @auth xiaozhu
     * @remark 获取子订单详情
     **/
    static query_by_order_tid(tid){
        let param = {
            order_tid : tid,
        };
        return super.getRequest('/installer/order/get_order_by_order_tid', param);
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
    /**
     * return
     * params wholesale_trade_request JSON
     * @auth taohua
     * @remark 正式下单
     * */
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
    /**
     * return
     * params tid 订单号
     * @auth taohua
     * @remark 获取订单的详细信息
     * */
    static detailOrder(param){
        let params = {
            tid: param
        };
        return super.getRequest('/store/order/detail',params);
    }
    static close_by_tid(tid){
        let params = {
            tid: tid
        };
        return super.getRequest('/installer/order/close_by_tid',params);
    }
    /**
     * return
     * params tid 订单号
     * params pay_bank 支付方式
     * params pay_source 支付方式
     * @auth taohua
     * @remark 模拟支付获取账户余额
     * */
    static simulatePay(param){
        let params = {
            tid: param.tid,
            pay_bank: param.payBank,
            pay_source: param.paySource,
        };
        return super.postRequest('/trade_pay/simulate_pay_confirm',params);
    }
    /**
     * return
     * params tid 订单号
     * params pay_bank 支付方式
     * params pay_source 支付方式
     * params use_balance 是否使用余额
     * params balance_pay 使用多少余额
     * @auth taohua
     * @remark 使用余额支付
     * */
    static pay_confirm(tid,form){
        let params = {
            tid: tid,
            pay_bank: form.payBank,
            pay_source: form.payBank,
            use_balance: form.useBalance,
            balance_pay: form.used,
        };
        return super.postRequest('/trade_pay/pay_confirm',params);
    }
    /**
     * return
     * params tid 订单号
     * params pay_bank 支付方式
     * params pay_source 支付方式
     * params use_balance 是否使用余额
     * params balance_pay 使用多少余额
     * @auth taohua
     * @remark 使用信用卡支付
     * */
    static credit_pay(form){
        let params = {
            pay_no:form.pay_no,
            credit_card_pay_info:JSON.stringify({
                // cardNumer:form.num,测试卡号
                cardNumber:4242424242424242,
                // expirationDate:form.date 测试到期时间
                expirationDate:1553097600000

           })
        }
        return super.postRequest('/trade_pay/credit_card_pay',params);
    }

}
