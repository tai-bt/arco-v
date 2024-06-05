<template>
  <a-config-provider :locale="locale" :global="true">
    <RouterView />
  </a-config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterView } from 'vue-router'
import { zh } from '@/i18n/language/zh'
import { en } from '@/i18n/language/en'
import { globalCounterStore } from '@/stores/modules/global'

const globalStore = globalCounterStore()
const locale = computed(() => {
  if (globalStore.language == "zh") return zh;
  if (globalStore.language == "en") return en;
});

</script>

<style lang="scss" scoped>

</style>
