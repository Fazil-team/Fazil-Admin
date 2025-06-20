<script setup lang="ts">
import type {UploadCustomRequestOptions} from "naive-ui";
import {upload_ui} from "~/pages/sys/settings/apis";
import * as msg from '@/assets/utils/message'

const customRequest = ({
                         file,
                         data,
                         headers,
                         withCredentials,
                         action,
                         onFinish,
                         onError,
                         onProgress
                       }: UploadCustomRequestOptions)=>{
  upload_ui(file.file).then(res=>{
    msg.success("模版上传成功")
  })
}
</script>

<template>
  <n-upload
      abstract
      accept=".zip"
      style="width: 100%"
      :custom-request="customRequest"
  >
      <n-upload-trigger style="width: 100%" #="{ handleClick }" abstract>
        <div class="inner-box" @click="handleClick">
          +
        </div>
      </n-upload-trigger>
  </n-upload>

</template>

<style scoped lang="scss">
  .inner-box {
    height: 14rem;
    border: 1px dashed #497aee;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;
    cursor: pointer;
    border-radius: 3px;
    transition: all .2s;
    font-size: 3rem;
    font-weight: 100;
    user-select: none;
    &:hover{
      border: 1px dashed #2f68e4;
      color: #497aee;
    }
    .title{
      height: 3rem;
      width: 100%;
      backdrop-filter: blur(8px);
      background: rgba(0 0 0 / .2);
      color: #FFF;
      font-size: 1.1rem;
      font-weight: 800;
      line-height: 3rem;
      padding: 0 0 0 1rem;
      box-sizing: border-box;
      border-radius: 3px 3px 0 0;

    }
    .tooltips{
      height: 3rem;
      width: 100%;
      backdrop-filter: blur(8px);
      background: rgba(0 0 0 / .2);
      box-sizing: border-box;
      display: flex;
      justify-content: right;
      align-items: center;
      padding: 0 1rem 0 0;
      border-radius: 0 0 3px 3px;
    }
  }
:deep(.n-upload-trigger){
  width: 100%;
}
</style>