<script setup lang="ts">
import {useHead} from "unhead";
import {definePageMeta} from "#imports";
import type {Ref} from "vue";
import {type Setting, useSettingStore} from "~/store/UseSettingStore";
import {storeToRefs} from "pinia";
import {check} from "~/pages/sys/register/apis";

const sys_setting: Ref<Setting | any> = storeToRefs(useSettingStore()).setting
let interval = setInterval(() => {
  if(sys_setting.value.title){
    useHead({
      title: `${sys_setting.value.title} 管理后台｜ 软件注册`,
    })
    clearInterval(interval)
  }
}, 100)



definePageMeta({
  name: '软件注册',
  parent: '系统管理'
});

const customRequest = (file,
                       data,
                       headers,
                       withCredentials,
                       action,
                       onFinish,
                       onError,
                       onProgress) => {
  check(file).then(res => {
    console.log(res)
  })
}
</script>

<template>
  <div style="display: flex;justify-content: center;align-items: center">
    <n-result v-if="sys_setting?.register" status="success" title="已注册" description="">
      <template #footer>
        感谢您选择Fazil
      </template>
    </n-result>
    <div v-else>
      <div style="text-align: center;font-size: 1.2rem;font-weight: 800;">注册软件</div>
      <n-form label-placement="left">
        <n-form-item label="授权证书">
          <n-upload
              :custom-request="customRequest"
          >
            <n-button>上传文件</n-button>
          </n-upload>
        </n-form-item>
      </n-form>
    </div>

  </div>
</template>

<style scoped>

</style>