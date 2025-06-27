<script setup lang="ts">
import {ref, onMounted, watch} from 'vue'

import VChart from "vue-echarts";

const echarts_ref = ref()
import * as echarts from 'echarts'
import {THEME_KEY} from 'vue-echarts'
import {provide} from 'vue'

const theme = ref(localStorage.getItem("darkMode"))

const props = defineProps([
  'height',
  'width',
  'title',
  'contant',
  'times',
  'data',
  'name',
  'color'
])

const color = ref()
const background = ref()
const colspan = ref(localStorage.getItem("colspan"))

const option = ref({
  color: [`${props.color[1]}`, `${props.color[2]}`],
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderColor: 'transparent',
  },
  dataZoom: [
    {
      start: 60,
      end: 100
    }
  ],
  grid: {
    left: '5%',
    right: '1%',
    bottom: '14%',
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: props.times,
    axisLine: { show: true },
    axisTick: { show: false },
  },
  yAxis: {
    type: 'value',
    axisTick: { show: true },
    axisLine: { show: false },
    axisLabel: {
      show: true,
      formatter: '{value} MB/5min'
    },
    splitLine: { show: true }
  },
  series: [
    {
      name: props.title[1],
      type: 'line',
      data: props.data[0], // 上传转 MB/s
      smooth: true,
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: props.color[1] },
          { offset: 1, color: props.color[1] + '4A' }
        ])
      },
      animationEasing: 'cubicInOut',
      animationDuration: 1500,
      symbol: "none",
    },
    {
      name: props.title[2],
      type: 'line',
      data: props.data[1], // 下载本来就是 MB/s
      smooth: true,
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: props.color[2] },
          { offset: 1, color: props.color[2] + '4A' }
        ])
      },
      animationEasing: 'cubicInOut',
      animationDuration: 1500,
      symbol: "none",
    }
  ]
})


onMounted(() => {
  color.value = `1px solid ${props.color[0]}`;
  background.value = `${props.color[0]}1A`
  // echarts_ref.value.loading = true
  window.addEventListener('resize', () => {
    echarts_ref.value.chart.resize()
    theme.value = 'dark'
  })

  setInterval(() => {
    theme.value = localStorage.getItem("darkMode")
    colspan.value = localStorage.getItem("colspan")
  }, 100)
})

watch(()=>colspan.value, ()=>{
  setTimeout(()=>{
    echarts_ref.value.chart.resize()
  }, 300);
})
</script>

<template>
  <div :style="{'height': props.height, 'width': props.width}">
    <VChart :theme="theme" ref="echarts_ref" class="chart" :option="option"/>
  </div>
</template>

<style scoped>

</style>