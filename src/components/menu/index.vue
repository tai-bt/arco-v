<template>
    <a-menu
        :style="{ width: '200px', height: '100%' }"
        show-collapse-button
        @collapse="collapseChange"
      >
        <menuView v-for="(item, index) in menuViews" :menu="item" :key="index"></menuView>
    </a-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IconApps, IconBug, IconBulb } from '@arco-design/web-vue/es/icon';
import { menuViews } from "@/router/modules/menu-views";
import menuView from './menu.vue'

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

</style>