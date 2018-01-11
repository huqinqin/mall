import BaseService from "./abstract/BaseService";
export default class HomeService extends BaseService {
    static XXX(){
        let param = {}
        return super.getRequest('/', param)
    }
}
