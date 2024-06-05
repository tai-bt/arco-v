<template>
    <a-button @click="languageChange">切换12</a-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { globalCounterStore } from '@/stores/modules/global'
import { useI18n } from 'vue-i18n';

const i18n = useI18n();
const zhIs = ref<boolean>(true)
const globalStore = globalCounterStore()
const languageChange = () => {
  zhIs.value = !zhIs.value
  i18n.locale.value = zhIs.value ? 'zh' : 'en';
  globalStore.setGlobalState('language', zhIs.value ? 'zh' : 'en')
}
</script>

<style scoped>

</style>