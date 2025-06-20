<script setup lang="ts">
import {ref} from 'vue'
const darkMode = ref(localStorage.getItem("darkMode"));
const borderOpt = ref("1px solid #e0e1e4")
let interval;
onMounted(()=>{
  interval = setInterval(()=>{
    darkMode.value = localStorage.getItem("darkMode")
    if(darkMode.value == 'dark'){
      borderOpt.value = "1px solid #353537";
    }else {
      borderOpt.value = "1px solid #e0e1e4";
    }
  }, 200)
})

onUnmounted(()=>{
  clearInterval(interval)
})

</script>

<template>
  <div class="inner-box">
    <div class="title">
      默认前台模版
    </div>
    <div class="tooltips">
      <n-button strong secondary round type="info">
        使用 {{darkMode}}
      </n-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.inner-box {
  height: 14rem;
  //background-color: rgba(0, 128, 0, 0.12);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: url("https://cn.bing.com/th?id=OHR.SleepingFox_ZH-CN2622967726_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp");
  background-size: cover;
  border-radius: 3px;
  border: v-bind(borderOpt);
  transition: all .2s;
  .title{
    background: #555555;
    height: 3rem;
    width: 100%;
    backdrop-filter: blur(8px);
    background: var(--n-color);
    font-size: 1.1rem;
    font-weight: 800;
    line-height: 3rem;
    padding: 0 0 0 1rem;
    box-sizing: border-box;
    border-radius: 2px 2px 0 0;

  }
  .tooltips{
    height: 3rem;
    width: 100%;
    backdrop-filter: blur(8px);
    background: var(--n-color);
    box-sizing: border-box;
    display: flex;
    justify-content: right;
    align-items: center;
    padding: 0 1rem 0 0;
    border-radius: 0 0 2px 2px;
  }
}
</style>