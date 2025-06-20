<script setup lang="ts">
import {ref, onMounted, watch} from 'vue'

import VChart from "vue-echarts";

const echarts_ref = ref()
import * as echarts from 'echarts'
import {THEME_KEY} from 'vue-echarts'
import {provide} from 'vue'

const theme = ref(localStorage.getItem("darkMode"))

const props = defineProps([
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
  color: [`${props.color}`],
  backgroundColor: '',
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderColor: 'transparent',

  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: props.times,
    axisLine: {
      show: true, //隐藏y轴
    },
    axisTick: {
      show: false,  //刻度线
    },
  },
  yAxis: {
    type: 'value',
    axisTick: {
      show: false,  //刻度线
    },
    axisLine: {
      show: false, //隐藏y轴
    },
    axisLabel: {
      show: false, //隐藏刻度值
    },
    splitLine: false
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

onMounted(() => {
  color.value = `1px solid ${props.color}`;
  background.value = `${props.color}1A`
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
  <div class="num-card" id="main">
    <div class="title">
      {{ props.title }}
    </div>
    <div class="number">
      {{ props.contant }}
    </div>
    <div class="charts">
      <div style="height: 11.5rem;width: 100%">
        <VChart :theme="theme" ref="echarts_ref" class="chart" :option="option"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.num-card {
  width: 24%;
  height: 14rem;
  background: v-bind(background);
  //border: v-bind(color);
  border-radius: 8px;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .title {
    font-size: 1.1rem;
    font-weight: 800;
  }

  .number {
    font-size: 1.4rem;
  }

  .charts {
    position: relative;
    top: -3rem;
  }
}

@media (max-width: 768px) {
  .num-card {
    width: 100%;
    height: 14rem;
    background: v-bind(background);
    //border: v-bind(color);
    border-radius: 8px;
    margin-bottom: 1rem;
  }

}

</style>