<template>
    <div style="height: 400px;">
        <lazyView
            :lazyList="list"
            :pageSize="100"
            >
            <template #lazy="{scope}" >
                <div class="hand">{{ scope.name }}</div>
            </template>
        </lazyView>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import lazyView from '@/components/lazyLoading/index.vue'

const list = ref<any>([])
setTimeout(() => {
    for (var i = 0; i < 30000; i++) {
        list.value.push({
            name: 'name ' + i,
        })
    }
}, 1000)

</script>

<style scoped>

</style>