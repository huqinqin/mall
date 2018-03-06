import BaseService from "./abstract/BaseService";
export default class expertService extends BaseService {
    static getExpert(){
        return super.getRequest('/installer/sales/get_sales_info');
    }
}
