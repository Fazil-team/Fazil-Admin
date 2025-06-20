import {service} from "assets/utils/request";

export const save_setting = (data) => {
    service.put('/setting', data).then(res => {
        window.$message.success('保存成功')
    })
}

export const upload_ui = (file) => {
    return new Promise(r => {
        let formData = new FormData();
        formData.append("file", file)
        service.post("/setting/import_ui", formData).then(res => {
            r(res)
        })
    })
}