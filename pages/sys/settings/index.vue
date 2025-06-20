<script lang="ts" setup>
import {ref, reactive, onMounted} from "vue";
import {definePageMeta} from "#imports";
import {useHead} from "unhead";
import {type Setting, useSettingStore} from "~/store/UseSettingStore";
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
const sys_setting: Ref<Setting | any> = storeToRefs(useSettingStore()).setting
let interval = setInterval(() => {
  if(sys_setting.value.title){
    useHead({
      title: `${sys_setting.value.title} 管理后台｜ 系统设置`,
    })
    clearInterval(interval)
  }
}, 100)

definePageMeta({
  name: '系统设置',
  parent: '系统管理'
});

onMounted(() => {
  show.value = false
  let interval = setInterval(() => {
    if (set.value != undefined) {
      console.log(123)
      login_list.value = [{
        id: 'c',
        name: 'a.png',
        status: 'finished',
        url: `${baseURL}/common/resource/sys?user_id=1`
      }]
      logo_small_list.value = [{
        id: 'c',
        name: 'a.png',
        status: 'finished',
        url: `${baseURL}/common/resource/sys?user_id=2`
      }]
      logo_list.value = [{
        id: 'c',
        name: 'a.png',
        status: 'finished',
        url: `${baseURL}/common/resource/sys?user_id=3`
      }]
      show.value = true
      console.log(login_list.value)
      clearInterval(interval)
    }
  }, 100)
})

import type {UploadFileInfo} from 'naive-ui'
import {baseURL} from "assets/config/network";
import * as apis from './apis'
import ComponentsCard from "~/pages/sys/settings/components/components-card.vue";
import ComponentsCardAdd from "~/pages/sys/settings/components/components-card-add.vue";

const save = (data) => {
  apis.save_setting(data)
}

</script>

<template>
  <div class="box">
    <n-tabs type="line" animated>
      <n-tab-pane name="basic" tab="基础参数">
        <n-descriptions label-placement="left" title="参数设置" bordered :column="1">
          <n-descriptions-item label-class="label" label="应用名称">
            <n-input v-model:value="set.title" placeholder="请输入应用名称"></n-input>
          </n-descriptions-item>
          <n-descriptions-item label-class="label" label="SMTP地址">
            <n-input v-model:value="set.smtpHost" placeholder="请输入SMTP地址"></n-input>
          </n-descriptions-item>
          <n-descriptions-item label-class="label" label="SMTP端口">
            <n-input v-model:value="set.smtpPort" placeholder="请输入SMTP端口"></n-input>
          </n-descriptions-item>
          <n-descriptions-item label-class="label" label="SMTP账号">
            <n-input v-model:value="set.smtpEmail" placeholder="请输入邮箱账号"></n-input>
          </n-descriptions-item>
          <n-descriptions-item label-class="label" label="SMTP密码">
            <n-input v-model:value="set.smtpPassword" placeholder="请输入SMTP密码"></n-input>
          </n-descriptions-item>
          <n-descriptions-item label-class="label" label="邮件模版">
            <n-alert style="margin-bottom: 1rem;" type="warning" title="提示">
              变量<br>
              #email_code - 邮箱验证码 <br>
              #title - 应用名称
            </n-alert>
            <n-input rows="30" v-model:value="set.smtpPattern" type="textarea" placeholder="请输入注册邮件内容"></n-input>
          </n-descriptions-item>
          <n-descriptions-item label-class="label" label="ICP备案号">
            <n-input v-model:value="set.icp" placeholder="请输入ICP备案号"></n-input>
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
                :default-file-list="login_list"
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
                :default-file-list="logo_small_list"
                list-type="image-card"
            >
              点击上传
            </n-upload>
          </n-descriptions-item>
          <n-descriptions-item label="图标设置（favicon）">
            <n-upload
                v-if="show"
                :max="1"
                :action="`${baseURL}/setting/upload/3`"
                :default-file-list="logo_list"
                list-type="image-card"
            >
              点击上传
            </n-upload>
          </n-descriptions-item>
        </n-descriptions>
      </n-tab-pane>
      <n-tab-pane name="code" tab="首页模版">
        <n-alert title="注意" type="warning">
          自行开发首页模版 请使用Hash类型路由
        </n-alert>
        <div style="margin-top: 1rem;">
          <n-grid x-gap="10" y-gap="10" cols="2 s:2 m:3 l:4 xl:5 2xl:6" responsive="screen">
            <n-grid-item v-for="item in 1">
              <components-card/>
            </n-grid-item>
            <n-grid-item>
              <components-card-add/>
            </n-grid-item>
          </n-grid>
        </div>

      </n-tab-pane>
    </n-tabs>


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