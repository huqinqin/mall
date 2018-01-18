import BaseService from "./abstract/BaseService";
export default class AddressService extends BaseService {
    /**
     * return data 地址数组
     * param address JSON
     * param orderby 排序
     * @autor taohua
     * remark 查询地址列表
     */
    static getList(uid){
        let params = {
            address:JSON.stringify({'userId':uid}),
            page:1,
            pagesize:20,
            orderby:'status desc'
        }
        return super.getRequest('/consumer_address/get_list',params)
    }

    /**
     * param id 地址id
     * @autor taohua
     * remark 查询单条地址
     */
    static getOneList(id){
        let params = {
            id:id
        }
        return super.getRequest('/consumer_address/get',params)

    }

    /**
     * param
     * param
     * param
     * param
     * @autor taohua
     * remark 新增地址
     */
    static addItem(form,setDefault){
        let address = {
            userId:"158716",
            mobile:form.mobile,
            userName:form.user_name,
            address:form.address + form.building,
            building:form.building,
            status: form.setDefault ? 1 : 0,
            rank: form.rank,
            lcCode: form.lc_code
        }
        let params = {
            address:JSON.stringify(address)
        }
        return super.getRequest('/consumer_address/add',params)
    }

    /**
     * param
     * param
     * param
     * param
     * @autor taohua
     * remark 删除单条地址
     */
    static deleteItem(form){
        let params = {
            id: form.id,
            status: -1
        }

        return super.getRequest('/consumer_address/update_status_plus',params)
    }





    /**
     * return
     * param userId 用户ID
     * param id 单条地址ID
     * param 其他修改的数据
     * @autor taohua
     * remark 修改单条地址
     *
     *
     *
     */
    static updateItem(form){
        let address = {
            userId:"158716",
            mobile:form.mobile,
            userName:form.user_name,
            address:form.address + form.building,
            building:form.building,
            status: form.setDefault ? 1 : 0,
            rank: form.rank,
            lcCode: form.lc_code,
            id: form.id
        }
        let params = {
            address:JSON.stringify(address)
        }

        return super.getRequest('/consumer_address/update',params)
    }

    /**
     * return
     * param userId 用户ID
     * param id 单条地址ID
     * param 其他修改的数据
     * @autor taohua
     * remark 切换默认地址
     *
     *
     *
     */
    static toggleDefault(form){
        let params = {
            userId:"158716",
            id: form.id
        }
        return super.getRequest('/consumer_address/change_default_address',params)
    }


}
