let api = {
    api: 'http://work.local.lts.com:8085/gateway/api',
    service: 'http://work.local.lts.com:8085/gateway'
}

let testApi = {
    service :'http://work.local.lts.com:8085'
}

export default function(isDebug = false){
    if(!isDebug){
        return api;
    }else{
        return {...api,...testApi}
    }
}
