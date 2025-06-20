import {service} from '~/assets/utils/request'

export const load_users_info = () => {
    return new Promise(r => {
        service.get("/monitor/user").then(res => {
            r(res)
        })
    })
}

export const load_all_apis_count = () => {
    return new Promise(r => {
        service.get("/monitor/get_api_count").then(res => {
            r(res)
        })
    })
}

export const load_all_flux = () => {
    return new Promise(r => {
        service.get("/monitor/flux").then(res => {
            r(res)
        })
    })
}


