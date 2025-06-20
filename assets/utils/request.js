import request from 'axios'
import * as msg from '~/assets/utils/message'
import {useLayoutStore} from "~/store/UseLayoutStore";
import {storeToRefs} from "pinia";
import {navigateTo} from "#app/composables/router";
import {baseURL} from "assets/config/network.js";

export const service = request.create({
    baseURL: baseURL
})


service.interceptors.request.use(config => {
    config.headers['Authorization'] = localStorage.getItem("Authorization")
    return config
})

service.interceptors.response.use(
    (res) => {
        console.log(res.data.code)
        if (res.data?.code === 2) {
            msg.err(res.data.msg)
            storeToRefs(useLayoutStore()).layout.value = 'login'
        } else if (res.data?.code === 3) {
            msg.warn('权限不足')
            self.location = '/ui'
            // navigateTo('/')
        } else if (res.data?.code === 200) {
            return res
        } else {
            msg.err(res.data.msg)
            Promise.reject(err)
        }
    }, (err) => {
        msg.err(err.message)
        Promise.reject(err)
    }
)
