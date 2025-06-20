<script setup lang="ts">
import {ref, reactive, onMounted, type Ref} from "vue";
import {useHead} from "unhead";
import {definePageMeta} from "#imports";
import NumCard from "~/components/NumCard.vue";
import NumCardBar from "~/components/NumCard-bar.vue";

const show = ref(false)
import {load_users_info, load_all_apis_count, load_all_flux} from "./apis";
import VChart, {THEME_KEY} from 'vue-echarts'
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import {use} from 'echarts/core'
// 引入 CanvasRenderer 或者 SVGRenderer 是，这必须的一步
import {CanvasRenderer} from 'echarts/renderers'
// 引入饼图
import {PieChart, LineChart, LinesChart, BarChart} from 'echarts/charts'
// 按需引入组件
import {
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  ToolboxComponent,
    DataZoomComponent
} from 'echarts/components'
import {type Setting, useSettingStore} from "~/store/UseSettingStore";
import {storeToRefs} from "pinia";
import {format} from "assets/utils/utils";


// 注册引入的组件
use([
  LineChart,
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  LinesChart,
  GridComponent,
  ToolboxComponent,
  BarChart,
  DataZoomComponent
])

const loading = ref(false)

const user_info = reactive({
  total: 0,
  chart_data: {
    times: [],
    dates: []
  }
})

const sys_setting: Ref<Setting | any> = storeToRefs(useSettingStore()).setting
let interval = setInterval(() => {
  if(sys_setting.value.title){
    useHead({
      title: `${sys_setting.value.title} 管理后台｜ 仪表板`,
    })
    clearInterval(interval)
  }
}, 100)

definePageMeta({
  name: '仪表板',
  parent: null
});

const api_used = reactive({
  all: 0,
  datas: [],
  times: [],
  times_small: [],
  datas_small: []
})

const flux = reactive({
  all: 0.0,
  datas: [],
  times: [],
  times_small: [],
  datas_small: []
})

onMounted(async() => {
  await load_users_info().then(res => {
    user_info.total = res.data.data.user_count
    user_info.chart_data.dates = res.data.data.data.data
    user_info.chart_data.times = res.data.data.data.time


  })

  await load_all_apis_count().then(res=>{
    api_used.datas = res.data.data.data
    api_used.times = res.data.data.time
    for (let i = 0; i < api_used.datas.length; i++) {
      api_used.all += api_used.datas[i]
      if(i > api_used.datas.length - 25){
        api_used.datas_small.push(api_used.datas[i])
        api_used.times_small.push(api_used.times[i])
      }
    }
  })
  await load_all_flux().then(res=>{
    // 单位（b）

    for (let i = 0; i < res.data.data.data.length; i++) {
      flux.all+=(res.data.data.data[i])
      flux.datas.push((res.data.data.data[i]/1024/1024).toFixed(3))
      if(i > res.data.data.data.length - 25){
        flux.datas_small.push((res.data.data.data[i]/1024/1024).toFixed(3))
        flux.times_small.push(res.data.data.time[i])
      }
    }

    flux.times = res.data.data.time
    console.log(res)
  })

  setTimeout(() => {
    show.value = true
  }, 100)
})

const charts_type = ref("visit")
</script>

<template>
  <div>
    <n-space vertical>
      <n-spin :show="!show">
        <div class="num-card-contianer">
          <NumCardBar color="#6557ec" v-if="show" title="访问量" :contant="api_used.all+' 次'" :data="api_used.datas_small"
                      :times="api_used.times_small"/>
          <NumCardBar color="#60ac67" v-if="show" title="注册人数" :contant="user_info.total+ '人'" :data="user_info.chart_data.dates"
                      :times="user_info.chart_data.times"/>
          <NumCardBar color="#e25d3d" v-if="show" title="下载文件数" :contant="0" :data="[]"
                      :times="[]"/>
          <NumCardBar color="#a8449d" v-if="show" title="流量(MB)" :contant="format(flux.all | 0)" :data="flux.datas_small"
                      :times="flux.times_small"/>
        </div>
        <div style="margin: 1rem 0 0 0">
          <n-card title="数据看板">
            <template #header-extra>
              <n-radio-group v-model:value="charts_type" name="radiobuttongroup2" size="medium">
                <n-radio-button value="visit">
                  访问量
                </n-radio-button>
                <n-radio-button value="flux">
                  流量
                </n-radio-button>
<!--                <n-radio-button value="sys">-->
<!--                  注册量-->
<!--                </n-radio-button>-->
<!--                <n-radio-button value="download">-->
<!--                  下载量-->
<!--                </n-radio-button>-->
              </n-radio-group>
            </template>
            <!-- 客户端组件 -->
            <ClientOnly>
              <div v-if="charts_type === 'visit'" style="height: calc(100vh - 32rem);width: 100%">
                <CLineCharts color="#6557ec" v-if="show" height="calc(100vh - 33rem)" width="100%"
                             :x-axis="api_used.times" :data="api_used.datas" title="接口调用频率"/>
              </div>
              <div v-if="charts_type === 'flux'" style="height: calc(100vh - 32rem);width: 100%">
                <CLineCharts color="#a8449d" v-if="show" height="calc(100vh - 33rem)" width="100%"
                             :x-axis="flux.times" :data="flux.datas" title="接口调用频率"/>
              </div>
            </ClientOnly>
          </n-card>
        </div>
        <template #description>
          加载数据中。。。
        </template>
      </n-spin>
    </n-space>

  </div>
</template>

<style scoped>
.num-card-contianer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

}
</style>