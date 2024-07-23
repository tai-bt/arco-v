<template>
  <a-layout class="layout">
    <a-layout-sider style="width: auto">
      <menuView></menuView>
    </a-layout-sider>

    <a-layout>
      <a-layout-header class="layoutHeader">
        <languageView></languageView>
      </a-layout-header>
      <a-layout-content>
          <!-- style="
            height: calc(100vh - 120px);
            overflow: auto;
            padding: 10px;
          " -->
        <div class="t-scroll">
          <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer class="layoutFooter">Footer</a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import languageView from '@/components/language/index.vue'
import menuView from '@/components/menu/index.vue'

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

.t-scroll {
  height: calc(100vh - 120px);
  padding: 10px;
  overflow: auto;
}
</style>
