<template>
  <a-layout class="layout">
    <a-layout-sider :style="{width: collapseIs ? '48px' : '200px'}">
      <a-menu
        :style="{ width: '200px', height: '100%' }"
        :default-open-keys="['2']"
        :default-selected-keys="['2_0']"
        show-collapse-button
        @collapse="collapseChange"
      >
        <a-menu-item key="0_0_0" data-obj="1" @click="jump()">Menu 1</a-menu-item>
        <a-sub-menu key="0">
          <template #icon><icon-apps></icon-apps></template>
          <template #title>Navigation 1</template>
          <a-menu-item key="0_0">Menu 1</a-menu-item>
          <a-menu-item key="0_1">Menu 2</a-menu-item>
          <a-menu-item key="0_2" disabled>Menu 3</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="1">
          <template #icon><icon-bug></icon-bug></template>
          <template #title>Navigation 2</template>
          <a-menu-item key="1_0">Menu 1</a-menu-item>
          <a-menu-item key="1_1">Menu 2</a-menu-item>
          <a-menu-item key="1_2">Menu 3</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="2">
          <template #icon><icon-bulb></icon-bulb></template>
          <template #title>Navigation 3</template>
          <a-menu-item key="2_0" @click="jump()">Menu 1</a-menu-item>
          <a-menu-item key="2_1">Menu 2</a-menu-item>
          <a-menu-item key="2_2">Menu 3</a-menu-item>
          <a-menu-item key="2_3">Menu 4</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout-header class="layoutHeader">Header</a-layout-header>
      <a-layout-content>
        <a-scrollbar
          style="
            height: calc(100vh - 120px);
            overflow: auto;
            padding: 10px;
            "
          >
          <RouterView></RouterView>
        </a-scrollbar>
      </a-layout-content>
      <a-layout-footer class="layoutFooter">Footer</a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IconMenuFold, IconMenuUnfold, IconApps, IconBug, IconBulb } from '@arco-design/web-vue/es/icon';
import { RouterView } from 'vue-router';

const jump = () => {
  alert('12312')
}

const collapseIs = ref<boolean>(false)
const collapseChange = (collapsed: boolean) => {
  console.log(collapsed);
  collapseIs.value = collapsed
}

</script>

<style scoped>
.layout {
  height: 100vh;
  width: 100vw
}
.layoutHeader {
  height: 60px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.08);
}
.layoutFooter {
  height: 60px;
  box-shadow: 2px 2px 5px 5px rgba(0, 0, 0, 0.08)
}

.t-plrtb {
  padding: 10px;
}
</style>
