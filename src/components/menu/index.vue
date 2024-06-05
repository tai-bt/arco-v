<template>
    <a-menu
        :style="{ width: '200px', height: '100%' }"
        show-collapse-button
        :default-open-keys="defaultOpenKeys"
        :default-selected-keys="defaultSelectedKeys"
        @collapse="collapseChange"
      >
        <menuView v-for="(item, index) in menuViews" :menu="item" :key="index"></menuView>
    </a-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { menuViews } from "@/router/modules/menu-views";
import menuView from './menu.vue'
import { useRoute } from 'vue-router';

const collapseIs = ref<boolean>(false)
const collapseChange = (collapsed: boolean) => {
  collapseIs.value = collapsed
}

function findParentPath(routes:any, targetName:any) {
  for (var i = 0; i < routes.length; i++) {
    if (routes[i].children) {
      for (const child of routes[i].children) {
        if (child.name === targetName) {
          return routes[i].name;
        }
      }
      const parentPath = findParentPath(routes[i].children, targetName);
      if (parentPath) {
        return routes[i].name;
      }
    }
  }
  return null;
}

const route = useRoute()
// 默认选中的菜单
const defaultSelectedKeys = [route.name]
// 默认展开的菜单
const defaultOpenKeys = [findParentPath(menuViews, route.name)]


</script>

<style scoped>

</style>