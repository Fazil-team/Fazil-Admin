<script setup lang="ts">
import {useHead} from "unhead";
import {definePageMeta} from "#imports";
import type {Ref} from "vue";
import {type Setting, useSettingStore} from "~/store/UseSettingStore";
import {storeToRefs} from "pinia";
const sys_setting: Ref<Setting | any> = storeToRefs(useSettingStore()).setting
let interval = setInterval(() => {
  if(sys_setting.value.title){
    useHead({
      title: `${sys_setting.value.title} 管理后台｜ 公告管理`,
    })
    clearInterval(interval)
  }
}, 100)

definePageMeta({
  name: '公告管理',
  parent: null
});
</script>

<template>

</template>

<style scoped>

</style>