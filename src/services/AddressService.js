import BaseService from "./abstract/BaseService";
export default class AddressService extends BaseService {
    // /**
    //  * return data 地址数组
    //  * param address JSON
    //  * param orderby 排序
    //  * @autor taohua
    //  * remark 查询地址列表
    //  */
    // static getList(){
    //     let params = {
    //         address:'',
    //         page:1,
    //         pagesize:20,
    //         orderby:'status desc'
    //     }
    //     return super.getRequest('/installer/consumer_address/get_list',params)
    // }
    /**
     * return data 地址数组
     * param address JSON
     * param orderby 排序
     * @autor taohua
     * remark 查询地址列表
     */
    static getList(){
        let params = {
            address:'',
            page:1,
            pagesize:20,
            orderby:'status desc'
        }
        return super.getRequest('/installer/consumer_address/get_installer_address',params)
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
        return super.getRequest('/installer/consumer_address/get',params)

    }

    /**
     * param
     * param
     * param
     * param
     * @autor taohua
     * remark 新增地址
     */
    static addItem(form){
        let address = {
            mobile:form.mobile,
            userName:form.user_name,
            address:form.address + form.building,
            building:form.building,
            status: form.setDefault ? 1 : 0,
            rank: form.rank,
            zip_code: form.zipCode,
            lc_code: form.lcCode,
            ship:1,
            state: form.state,
            country: form.country
        }
        let params = {
            address:JSON.stringify(address)
        }
        return super.getRequest('/installer/consumer_address/add',params)
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
        return super.getRequest('/installer/consumer_address/update_status_plus',params)
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
            mobile:form.mobile,
            userName:form.user_name,
            address:form.address + form.building,
            building:form.building,
            status: form.setDefault ? 1 : 0,
            rank: form.rank,
            zip_code: form.zipCode,
            id: form.id,
            lc_code: form.lcCode,
            ship:1
        }
        let params = {
            address:JSON.stringify(address)
        }

        return super.getRequest('/installer/consumer_address/update',params)
    }

    /**
     * return
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
            id: form.id
        }
        return super.getRequest('/installer/consumer_address/change_default_address',params)
    }

    /**
     * return
     * param uid
     * param
     * @autor maisi
     * remark 根据UID获取消费者地址基本信息列表
     */
    static getAddressListByUserId(form){
        let params = {
            page: 1,
            page_size: 10
        };
        return super.getRequest('/installer/consumer_address/get_list_by_user_id',params)
    }
}
