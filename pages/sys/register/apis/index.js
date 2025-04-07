import {service} from "assets/utils/request.js";

export const check = (file)=>{
    return new Promise(r=>{
        console.log(file.file.file)
        const formdata = new FormData();
        formdata.append("file", file.file.file)
        service.post("/license/check", formdata,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res=>{
            r(res)
        })
    })

}