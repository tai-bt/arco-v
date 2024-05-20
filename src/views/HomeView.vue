<template>
  <a-layout class="layout">
    <a-layout-sider>
      Sider
      <p>{{ count }}</p>
      <a-button @click="increment">加</a-button>
      <a-button @click="decrement">减</a-button>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="layoutHeader">Header</a-layout-header>
      <a-layout-content>Content</a-layout-content>
      <a-layout-footer class="layoutFooter">Footer</a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCounterStore } from '@/stores/modules/data';

const counterStore:any = useCounterStore()
const { increment, decrement } = counterStore
const count = computed(() => {
  return counterStore.count
})

</script>

<style scoped>
.layout {
  height: 100vh;
  width: 100vw
}
.layoutHeader {
  height: 60px;
  border-bottom: 1px solid #ccc;
}
.layoutFooter {
  height: 60px;
  border-top: 1px solid #ccc;
}
</style>
