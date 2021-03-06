import config from 'config'
import {store} from 'ltsutil'
export default {
    sessionData : null,
    isLogin(){
        return this.getSessionData() != null;
    },
    checkLogin(selfContext){
        if (!this.isLogin()) {
            if(selfContext){selfContext.$emit("showLogin");}
            return false;
        }else{
            return true;
        }
    },
    getSessionData(){
        if (this.sessionData == null) {
            let sessionStr = store.getItem(config.sessDataName);
            try {
                this.sessionData = JSON.parse(sessionStr);
            } catch (err){
                console.log(err);
            }
        }
        return this.sessionData;
    },
    login(sessionData){
        store.setItem(config.sessDataName, JSON.stringify(sessionData));
    },
    logout(){
        store.removeItem(config.sessDataName);
        store.removeItem('expert');
        location.href = config.homePage;
    },
    expert(expert){
        store.setItem('expert', expert);
    }
}
