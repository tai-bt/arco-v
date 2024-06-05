<template>
    <a-sub-menu v-if="menu.children && menu.children.length > 0" :key="menu.name">
        <template #icon><icon-apps></icon-apps></template>
        <template #title>{{ menu.meta.title }}</template>
        <template v-for="(item, index) in menu.children" :key="index">
            <menuView :menu="item"></menuView>
        </template>
    </a-sub-menu>

    <a-menu-item v-else :key="menu!.name">
        {{ menu.meta.title }}
    </a-menu-item>
</template>

<script setup lang="ts" name="menuView" >
import { IconApps, IconBug, IconBulb } from '@arco-design/web-vue/es/icon';

const props = defineProps({
    menu: {
        type: Object,
        default: () => {
            return {}
        }
    }
})
</script>

<style scoped>

</style>