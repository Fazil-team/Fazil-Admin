import {service} from "assets/utils/request";

export const save_setting = (data)=>{
    service.put('/setting',data).then(res=>{
        window.$message.success('保存成功')
    })
}