import BaseService from "./abstract/BaseService";
import CommonUtils from '../utils/CommonUtils'
export default class ReverseService extends BaseService{
    static get(id){
        let param = {
            id : id,
        };
        return super.getRequest('/installer/reverse/detail', param);
    }
    static getList(param={}, page = 1, page_size = 10, order_by = 'cdate desc'){
        /*let param = {
            tid : tid,
            status : status,
            start_time : start_time,
            end_time : end_time,
            page : page,
            page_size : page_size,
            order_by : order_by
        };*/
        param.page = page;
        param.page_size = page_size;
        param.order_by = order_by;
        return super.getRequest('/installer/reverse/list', param);
    }
    static apply(oid, reverse_reason, num, refund, remark, imageUrls){
        let param = {
            oid : oid,
            reverse_reason : reverse_reason,
            remark : remark,
            num : num,
            refund : refund,
            voucher : imageUrls,
        };
        return super.postRequest('/installer/reverse/apply', param);
    }
    static operate(id, installer_uid, op_type, remark, deal_remark){
        let param = {
            id : id,
            installer_uid : installer_uid,
            op_type : op_type,
            remark : remark,
            deal_remark : deal_remark,
        };
        return super.postRequest('/store/reverse/operate', param);
    }
}
