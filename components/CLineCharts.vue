<script setup lang="ts">
import {onMounted, provide, ref, watch} from "vue";
import VChart, {THEME_KEY} from "vue-echarts";
import * as echarts from "echarts";
const echarts_ref = ref()
const theme = ref(localStorage.getItem("darkMode"))
const props = defineProps([
    'height',
    'width',
    'xAxis',
    'yAxis',
    'data',
    'title',
    'color'
])

const colspan = ref(localStorage.getItem("colspan"))
const option = ref({
  color: [`${props.color}`],
  backgroundColor: '',
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderColor: 'transparent'
  },
  dataZoom: [

    {
      start: 60,
      end: 100
    }
  ],
  grid: {
    left: '3%',
    right: '1%',
    bottom: '14%',
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: props.xAxis
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: props.title,
      type: 'line',
      stack: 'Total',
      data: props.data,
      smooth: true,
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: props.color
          },
          {
            offset: 1,
            color: props.color+'4A'
          }
        ])
      },
      animationEasing: 'cubicInOut',
      animationDuration: 1500,
      symbol: "none",
    }
  ]
})

onMounted(()=>{
  // echarts_ref.value.loading = true
  window.addEventListener('resize', ()=>{
    echarts_ref.value.chart.resize()
    theme.value = 'dark'
  })

  setInterval(()=>{
    theme.value = localStorage.getItem("darkMode")
    colspan.value = localStorage.getItem("colspan")
  },100)
})

watch(()=>colspan.value, (value)=>{
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