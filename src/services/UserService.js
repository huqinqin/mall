import BaseService from "./abstract/BaseService";
import md5 from 'md5'
export default class UserService extends BaseService {
    static login(form){
        let param = {
            account : form.acount,
            password: md5(form.password),
            oms_password: form.omsPassword,
            source: 'PC'
        };
        return super.getRequest('/user/installer/login', param);
    }
    static logout(){
        return super.getRequest('/user/logout', {});
    }
    static get(){
        return super.getRequest('/user/get');
    }
    static checkEmail(email){
        return super.getRequest('/user/check_email', {email: email});
    }
    static checkLogin(account){
        let param = {
            account:account
        }
        return super.getRequest('/user/installer/salt',param)
    }
}
