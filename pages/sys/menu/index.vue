<script setup lang="ts">
import {ref, reactive, onMounted, h, type Component, type Ref} from "vue";
import NewMenuDialog from "~/pages/sys/menu/dialogs/NewMenuDialog.vue";
import * as menu_apis from './apis'
import {NButton, NIcon, NTag} from "naive-ui";
import * as icon from '~/assets/utils/icons'
import * as msg from '~/assets/utils/message'

import * as icons from '~/assets/utils/icons'
import {PlusOutlined} from "@vicons/antd";
import MenuSys from "~/pages/sys/menu/components/MenuSys.vue";
import {useHead} from "unhead";
import {definePageMeta} from "#imports";
import {type Setting, useSettingStore} from "~/store/UseSettingStore";
import {storeToRefs} from "pinia";
const sys_setting: Ref<Setting | any> = storeToRefs(useSettingStore()).setting
let interval = setInterval(() => {
  if(sys_setting.value.title){
    useHead({
      title: `${sys_setting.value.title} 管理后台｜ 菜单管理`,
    })
    clearInterval(interval)
  }
}, 100)

definePageMeta({
  name: '菜单管理',
  parent: '系统管理'
});

function renderIcon(icon: Component) {
  return h(NIcon, {
    size: '1.4rem'
  }, {default: () => h(icon)})
}

const loading = ref(false)

const dialog = ref()

const columns = [
  {
    type: "selection"
  },
  {
    title: 'ID',
    key: 'id',
    width: '150px'
  },
  {
    title: "菜单名称",
    key: "menuName",
    width: '120px'
  },
  {
    title: "菜单图标",
    key: "icon",
    width: '120px',
    align: 'center',
    render(row, id) {
      for (let i = 0; i < icon.icon_mapping.length; i++) {
        let ele = icon.icon_mapping[i]
        if (ele.label == row.icon) {
          return renderIcon(ele.value)
        }
      }
      return ''
    }
  },
  {
    title: "菜单权限标识",
    key: "menuPurview",
    width: '200px'
  },
  {
    title: "菜单路由地址",
    key: "menuRouterPath",
    width: '200px'
  },
  {
    title: "菜单备注",
    key: "menuComment",
    minWidth: '200px'
  },
  {
    title: "菜单归属",
    key: "sys",
    minWidth: '200px',
    render(row) {
      return h(MenuSys, {
        sys: row.sys
      }, null)
    }
  },
  {
    title: "操作",
    minWidth: '200px',
    render(row) {
      return [
        h(
            NButton,
            {
              size: "small",
              type: "primary",
              onClick: () => hand_edit(row)
            },
            {default: () => '编辑'}
        ),
        h(
            NButton,
            {
              size: "small",
              type: "error",
              onClick: () => hand_del(row),
              style: "margin-left: 1rem"
            },
            {default: () => '删除'}
        )
      ]
    }
  }
];

const hand_edit = (row) => {
  dialog.value.dialog.show(row)
}

const hand_del = (row) => {
  if (row.treeMenus.length == 0) {
    menu_apis.del_menu(row.id).then(res => {
      init()
    })
  } else {
    msg.warn('该项目下不能含有子元素')
  }

}
const data = ref([])
const rowKey = (row) => {
  return row.id;
}

const height = ref()
const init = () => {
  loading.value = true
  // 初始化高度querySelector
  height.value = `calc(100vh - ${document.querySelector(".n-card").clientHeight}px - 2rem - 6rem - 10rem)`;
  menu_apis.load_menus().then(res => {
    data.value = res.data.data
    loading.value = false
  })
}
onMounted(() => {
  init()
})

</script>

<template>
  <div>
    <n-card id="active">
      <template #header>
        操作 -
        <n-tag type="info">菜单管理</n-tag>
      </template>
      <n-button type="primary" @click="dialog.dialog.show()" :render-icon="icons.renderIcon(PlusOutlined)">创建菜单</n-button>
    </n-card>
    <n-card style="margin-top: 1rem;">
      <template #header>
        查询结果
      </template>
      <n-data-table
          :style="{ height: `${height}` }"
          flex-height
          :loading="loading"
          :columns="columns"
          :data="data"
          :row-key="rowKey"
          children-key="treeMenus"
      />
    </n-card>
    <NewMenuDialog @success="init()" ref="dialog"/>
  </div>
</template>

<style scoped>

</style>
