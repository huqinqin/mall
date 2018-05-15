import BaseService from "./abstract/BaseService";
import md5 from 'md5'

export default class UserService extends BaseService {
    static login(form){
        let param = {
            account : form.acount.trim(),
            password: md5(form.password.trim()),
            oms_password: form.omsPassword.trim(),
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
            account:account.trim()
        }
        return super.getRequest('/user/installer/salt',param)
    }
}
