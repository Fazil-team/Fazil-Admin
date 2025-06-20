<script setup>
import {h, ref, onMounted, watch} from "vue";
import {NIcon, darkTheme, useOsTheme, NConfigProvider, useLoadingBar, useMessage, useDialog, useNotification} from "naive-ui";
import swBtn from '@/components/switch.vue'
import text from '~/components/logo-text.vue'
import {useRouter, useRoute} from "#app";
import LogoSmall from "~/components/logo-small.vue";
import {gen_router_paths} from "assets/utils/utils.js";
import NuxtLink from "#app/components/nuxt-link.js";
import {theme} from '~/assets/config/theme'
import {renderIcon} from "assets/utils/icons.js";
import {useUserStore} from "~/store/UseUserStore";
import {storeToRefs} from "pinia";
import * as auth_api from '~/layouts/apis'
import {CloseOutlined} from '@vicons/antd'
import {creatWebSocket} from '@/assets/utils/websocket'
import {wsURL} from "assets/config/network.js";
import VChart, {THEME_KEY} from 'vue-echarts'
import { CheckmarkCircle, CloseCircle } from '@vicons/ionicons5'
import {useSettingStore} from "~/store/UseSettingStore";

const links = ref([])
const user = storeToRefs(useUserStore()).user_info
const sys_setting  = storeToRefs(useSettingStore()).setting

const loading = ref(true)
const router = useRouter();
const path = ref()
const loadingBar = useLoadingBar();
const options = [
  {
    label: '退出登陆',
    key: 'logout',
    disabled: false
  }
]
// 设置前置路由守卫
router.beforeEach((to, from, next) => {
  // 路由中导入-开始
  loadingBar.start()
  next()
})
// 设置后置路由守卫
router.afterEach((to, from, next) => {
  // 路由中导入-结束
  loadingBar.finish()
})


const themeOverrides = theme
const dark = ref()
const header = {
  label:
      () => h(NuxtLink, {
        to: '/'
      }, renderIcon(text)),
  icon: renderIcon(LogoSmall)
}
const menuOptions = ref([])

const collapsed = ref(false)
let interval = ref()

watch(()=>window.innerWidth, (value)=>{
})

watch(()=>collapsed.value, (value, oldValue, onCleanup)=>{
  localStorage.setItem("colspan", value)
})

watch(() => router.currentRoute.value, () => {
  setTimeout(() => {
    path.value = router.currentRoute.value.fullPath
  }, 100)
})

const set_item = () => {
  if (router.currentRoute.value.fullPath == '/') {
    return;
  }
  for (let j = 0; j < links.value.length; j++) {
    let item = links.value[j]
    item.checked = false
  }
  for (let i = 0; i < links.value.length; i++) {
    let element = links.value[i]
    if (element.path == router.currentRoute.value.fullPath) {
      element.checked = true
      return
    }
  }
  links.value.push({
    title: router.currentRoute.value.meta.name,
    path: router.currentRoute.value.fullPath,
    checked: true
  })
}

watch(() => router.currentRoute.value, () => {
  set_item()
})

const handleSelect = (key) => {
  switch (key) {
    case 'logout':
      auth_api.logout()
      break
  }
}

const init = async () => {
  loading.value = true
  if (process.client) {
    loadingBar.start()
    path.value = router.currentRoute.value.fullPath
  }
  if (user.value == undefined) {
    auth_api.logout()
  }
  let genRouterPaths = await gen_router_paths(user.value.menus);
  genRouterPaths.unshift(header)
  menuOptions.value = genRouterPaths
  loading.value = false
  interval.value = setInterval(() => {
    if (useOsTheme().value == 'dark') {
      dark.value = darkTheme
      changeTheme({
        mode: true
      })
    } else {
      dark.value = undefined
      changeTheme({
        mode: false
      })
    }
  }, 100)
  if (process.client) {
    loadingBar.finish()
  }
}

const init_ws = async () => {
  creatWebSocket(`${wsURL}/wsInterface/${user.value.token}`)
}

onMounted(async () => {
  $mount()
  await init()
  await init_ws()
  setInterval(()=>{
    let width = window.innerWidth
    if(width < 768){
      collapsed.value = true
    }else {
      collapsed.value = false
    }
  },100)
})


const $mount = () => {
  if (process.client) {
    window.$message = useMessage()
    window.$dialog = useDialog()
    window.$notify = useNotification()
    set_item()
    let interval = setInterval(() => {
      var elementById = document.getElementById('space');
      if (elementById != null) {
        clearInterval(interval)
        document.getElementById('space').addEventListener('wheel', (event) => {
          event.preventDefault();
          document.getElementById('space').scrollBy({
            left: event.deltaY < 0 ? -30 : 30,  // >0 是下滑，<0是上滑
          });
        });
      }
    }, 100)

  }
}

const changeTheme = (mode) => {
  clearInterval(interval.value)
  if (mode.mode) {
    dark.value = darkTheme
    localStorage.setItem("darkMode", 'dark')
  } else {
    localStorage.setItem("darkMode", 'light')
    dark.value = undefined
  }
}

const change = (e) => {
  if (process.client) {
    localStorage.setItem('path', e.target.innerText)
  }
}
</script>

<template>
  <ClientOnly>
    <n-config-provider :theme="dark" :theme-overrides="themeOverrides">
      <n-layout has-sider>
        <n-layout-sider
            bordered
            collapse-mode="width"
            :collapsed-width="64"
            width="240px"
            style="height: 100vh"
            :collapsed="collapsed"
            show-trigger="bar"
            @collapse="collapsed = true"
            @expand="collapsed = false"
        >
          <div style="display: flex;height: 100vh; width: 100%;  justify-content: space-between;flex-direction: column">
            <n-skeleton v-if="loading" :width="'100%'" :height="'100%'" size="medium"/>
            <n-menu
                v-else
                v-model:value="path"
                :collapsed="collapsed"
                :collapsed-width="64"
                :collapsed-icon-size="22"
                :options="menuOptions"
                @click="change"
            />
            <div
                :style="{'position': 'relative', 'z-index': '999', 'height': '3rem'}" class="admin">
              <div v-if="!collapsed" style="display: flex;justify-content: left;align-items: center;width: 100%">
                <div style="margin: 0 1rem">
                  <n-dropdown trigger="hover" :options="options" @select="handleSelect">
                    <n-avatar>Admin</n-avatar>
                  </n-dropdown>
                </div>
                <div>
                  {{ user?.username }}
                </div>
              </div>
              <div v-else style="margin-left: 1rem">
                <n-avatar>Admin</n-avatar>
              </div>
            </div>
          </div>
        </n-layout-sider>
        <n-layout>
          <n-layout-header bordered style="height: 3rem;display: flex;align-items: center;padding: 0 1rem">
            <div style="display: flex;justify-content: space-between;align-items: center;width: 100%">
              <div>
                <Bread/>
              </div>
              <div>
                <swBtn @change="changeTheme"></swBtn>
              </div>
            </div>
          </n-layout-header>
          <n-layout-header bordered style="height: 3rem;display: flex;align-items: center;padding: 0 1rem">
            <n-space id="space" style="flex-flow: nowrap;overflow: auto">
              <n-tag :disabled="item.checked" @click="navigateTo(item.path)" checkable closable round @checkedChange="val=>{
               return false
              }" v-for="item in links" v-model:checked="item.checked" type="info"
                     style="cursor: pointer;">
                {{ item.title }}
                <CloseOutlined style="width: 10px"></CloseOutlined>
              </n-tag>
            </n-space>
          </n-layout-header>
          <n-layout-content bordered
                            style="height: calc(100vh - 9rem);display: flex;align-items: center;padding: 1rem 1rem;width: 100%;">
            <NuxtPage/>
          </n-layout-content>
          <n-layout-footer bordered style="height: 3rem;display: flex;align-items: center;padding: 0 1rem 0 1rem;justify-content: space-between">
            <div>
              Powered
              By Virus_Cui
            </div>

            <n-tag v-if="sys_setting?.register" round :bordered="false" type="success">
              已注册
              <template #icon>
                <n-icon :component="CheckmarkCircle" />
              </template>
            </n-tag>

            <n-tag v-else round :bordered="false" type="error">
              未注册
              <template #icon>
                <n-icon :component="CloseCircle" />
              </template>
            </n-tag>
          </n-layout-footer>
        </n-layout>
      </n-layout>
    </n-config-provider>
  </ClientOnly>
</template>

<style scoped>
:deep(.n-menu > .n-menu-item:first-child > .n-menu-item-content.n-menu-item-content--selected::before) {
  background: none;
}

:deep(.n-layout-scroll-container) {
  width: 100%;
}

:deep(.n-layout-toggle-bar) {
  right: -24px;
}

.admin {
  display: flex;
  justify-content: left;
  align-items: center;
  overflow: hidden;
}

:deep(.n-space) {
  display: inline;
  flex-wrap: nowrap;
  flex-flow: nowrap;
}

/*定义滚动条高宽及背景
 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 16px;
  height: 0px;
  background-color: #F5F5F5;
}

/*定义滚动条轨道
 内阴影+圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #F5F5F5;
}

/*定义滑块
 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  background-color: #555;
}
</style>