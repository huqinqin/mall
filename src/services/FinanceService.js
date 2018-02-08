import BaseService from './abstract/BaseService'
export default class FinanceService extends BaseService{

    /**
     * return data
     * @autor taohau
     * remark 查询个人财务信息
     */
    static getFinance(param){
        return super.getRequest('/installer/installer_acct/query_shop_acct', param)
    }
    /**
     * return data
     * param biz_code 操作代码
     * param page 操作代码
     * param page_size 每页数量
     * param subject 账本类型
     * param biz_code 操作代码
     * param order_by 排序
     * param start_acc_time 开始时间
     * param end_acc_time 结束时间
     * @autor taohau
     *
     * remark 查询个人财务信息
     */
    static getDetail(form, pagination){
        let params = {
            page: pagination.page,
            page_size: pagination.pageSize,
            subject:form.type,
            order_by:form.orderBy,
            biz_code:form.handle,
            start_acc_time:form.cdate,
            end_acc_time:form.edate,
        }
        return super.getRequest('/installer/installer_acct/query_acct_balance', params)
    }
}


