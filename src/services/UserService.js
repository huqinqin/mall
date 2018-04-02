import BaseService from "./abstract/BaseService";
import md5 from 'md5'
export default class UserService extends BaseService {
    static login(account, password, checked){
        let param = {
            account : account,
            password: md5(password),
            source : 'PC'
        };
        // if(checked){
        //     param = {
        //         account : account,
        //         password: password,
        //         source : 'PC'
        //     };
        // }else{
        //     param = {
        //         account : account,
        //         password: md5(password),
        //         source : 'PC'
        //     };
        // }
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
}
