<script lang="ts" setup>
import {ref, reactive, onMounted} from "vue";
import {definePageMeta} from "#imports";
import {useHead} from "unhead";
import {useSettingStore} from "~/store/UseSettingStore";
import {storeToRefs} from "pinia";

const show = ref(false)
const set = storeToRefs(useSettingStore()).setting

const showModalRef = ref(false)
const previewImageUrlRef = ref('')

function handlePreview(file: UploadFileInfo) {
  const {url} = file
  previewImageUrlRef.value = url as string
  showModalRef.value = true
}

const login_list = ref()
const logo_small_list = ref()
const logo_list = ref()
const logo_text_black_list = ref()
const logo_text_white_list = ref()
useHead({
  title: '致飞网盘-Admin｜系统设置',
})

definePageMeta({
  name: '系统设置',
  parent: '系统管理'
});

onMounted(() => {
  show.value = false
  let interval = setInterval(() => {
    if (set.value != undefined) {
      login_list.value =[{
        status: 'finished',
        url: `${baseURL}/common/resource/sys?user_id=1`
      }]
      logo_small_list.value =[{
        status: 'finished',
        url: `${baseURL}/common/resource/sys?user_id=2`
      }]
      logo_list.value =[{
        status: 'finished',
        url: `${baseURL}/common/resource/sys?user_id=3`
      }]
      logo_text_black_list.value =[{
        status: 'finished',
        url: `${baseURL}/common/resource/sys?user_id=4`
      }]
      logo_text_white_list.value = [{
        status: 'finished',
        url: `${baseURL}/common/resource/sys?user_id=5`
      }]
      show.value = true
      clearInterval(interval)
    }
  }, 100)
})

import type {UploadFileInfo} from 'naive-ui'
import {baseURL} from "assets/config/network";
import * as apis from './apis'

const save = (data)=>{
  apis.save_setting(data)
}

</script>

<template>
  <div class="box">
    <n-descriptions label-placement="left" title="参数设置" bordered :column="1">
      <n-descriptions-item label-class="label" label="应用名称">
        <n-input v-model:value="set.title" placeholder="请输入应用名称"></n-input>
      </n-descriptions-item>
      <n-descriptions-item label-class="label" label="注册方式(邮箱注册)">
        <n-switch v-model:value="set.email_reg"></n-switch>
      </n-descriptions-item>
      <n-descriptions-item v-if="set.email_reg" label-class="label" label="邮箱地址">
        <n-input v-model:value="set.email" placeholder="请输入邮箱地址"></n-input>
      </n-descriptions-item>
      <n-descriptions-item v-if="set.email_reg" label-class="label" label="密码">
        <n-input v-model:value="set.emailpasswd" placeholder="请输入密码"></n-input>
      </n-descriptions-item>
      <n-descriptions-item label-class="label" label="操作">
        <n-button type="primary" @click="save(set)">保存</n-button>
      </n-descriptions-item>
    </n-descriptions>
    <n-divider/>
    <n-descriptions label-placement="left" title="图像设置" bordered :column="1 ">
      <n-descriptions-item label-class="label" label="登录页图片">
        <n-upload
            v-if="show"
            :max="1"
            :action="`${baseURL}/setting/upload/1`"
            :default-file-list="[
                    {
                      id: 'c',
          name: '我是自带url的图片.png',
          status: 'finished',
          url: baseURL+`/common/resource/sys?user_id=1`
                    }
                ]"
            list-type="image-card"
        >
          点击上传
        </n-upload>
      </n-descriptions-item>
      <n-descriptions-item label="logo设置">
        <n-upload
            v-if="show"
            :max="1"
            :action="`${baseURL}/setting/upload/2`"
            :default-file-list="[
                    {
                      id: 'c',
          name: '我是自带url的图片.png',
          status: 'finished',
          url: baseURL+`/common/resource/sys?user_id=2`
                    }
                ]"
            list-type="image-card"
        >
          点击上传
        </n-upload>
      </n-descriptions-item>
      <n-descriptions-item label="icon设置">
        <n-upload
            v-if="show"
            :max="1"
            :action="`${baseURL}/setting/upload/3`"
            :default-file-list="[
                    {
                      id: 'c',
          name: '我是自带url的图片.png',
          status: 'finished',
          url: baseURL+`/common/resource/sys?user_id=3`
                    }
                ]"
            list-type="image-card"
        >
          点击上传
        </n-upload>
      </n-descriptions-item>
      <n-descriptions-item label="黑色文字logo">
        <n-upload
            v-if="show"
            :max="1"
            :action="`${baseURL}/setting/upload/4`"
            :default-file-list="[
                    {
                      id: 'c',
          name: '我是自带url的图片.png',
          status: 'finished',
          url: baseURL+`/common/resource/sys?user_id=4`
                    }
                ]"
            list-type="image-card"
        >
          点击上传
        </n-upload>
      </n-descriptions-item>
      <n-descriptions-item label="白色文字logo">
        <n-upload
            v-if="show"
            :max="1"
            :action="`${baseURL}/setting/upload/5`"
            :default-file-list="[
                    {
                      id: 'c',
          name: '我是自带url的图片.png',
          status: 'finished',
          url: baseURL+`/common/resource/sys?user_id=5`
                    }
                ]"
            list-type="image-card"
        >
          点击上传
        </n-upload>
      </n-descriptions-item>
    </n-descriptions>

  </div>
</template>

<style scoped lang="scss">
.box {
  .upload_box {
    display: flex;
    justify-content: left;
    align-items: center;

    :deep(.n-upload) {
      width: auto;
    }
  }
}

:deep(.n-descriptions-table-header) {
  width: 200px;
}
</style>