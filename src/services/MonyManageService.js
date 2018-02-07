import BaseService from "./abstract/BaseService";

export default class monyManageService extends BaseService{
    /**
     * 获取所有门店
     * store_item
     * item_props
     * @param params
     */
    static getStoreList(page,pageSize) {
        let params = {
            page:page,
            page_size:pageSize
        };
        return super.getRequest('/hq/store/get_store_list', params);
    }
    /*获取所有收款的详情*/
    static getMoney(params) {
       /* let params = {
            deadlint_start:obj.deadlint_start,
            deadlint_end:obj.deadlint_end,
            real_time_start:obj.real_time_start,
            real_time_end:obj.real_time_end,
            repay_status:obj.repay_status
        };*/
        return super.getRequest('/installer/credit_repay/get_repay_list', params);
    }
    /*查询余额*/
    static oddMoney() {
        let params = {
            subject:2010101
        }
        return super.getRequest('/installer/installer_acct/query_book_balance', params);
    }
}
