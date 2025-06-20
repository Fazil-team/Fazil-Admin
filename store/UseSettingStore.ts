import {defineStore} from "pinia";
import {type Ref, ref} from 'vue'

export type Setting = {
    id: number;
    title: string;
    loginBgImg: string;
    logoSmall: string;
    logo: string;
    smtpHost: string;
    smtpPort: number;
    smtpEmail: string;
    smtpPassword: string;
    smtpPattern: string;
    icp: string
}

export const useSettingStore = defineStore('SysSetting', () => {
    let setting: Ref<Setting> = ref({
        id: 0,
        title: '',
        loginBgImg: '',
        logoSmall: '',
        logo: '',
        smtpHost: '',
        smtpPort: 0,
        smtpEmail: '',
        smtpPassword: '',
        smtpPattern: '',
        icp: ''
    })
    return { setting };
})
