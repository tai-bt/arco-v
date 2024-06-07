<template>
    <div class="t-lazy" ref="lazyRef">
        <template v-for="(item, index) in showLazyList" :key="index">
            <slot name="lazy" :scope="item"></slot>
        </template>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
const props = defineProps({
    // 所有需要渲染的数据
    lazyList: {
        type: Array,
        default: () => {
            return []
        }
    },
    // 每次加载多少条数据
    pageSize: {
        type: Number,
        default: 10
    }
})

const showLazyList = ref<any>([])
const pagination = ref<any>({
    pageNo: 1,
    pageSize: props.pageSize,
})

const getShowLazyList = () => {
    return props.lazyList.slice((pagination.value.pageNo - 1) * pagination.value.pageSize, pagination.value.pageNo * pagination.value.pageSize)
}

watch(
    () => props.lazyList,
    () => {
        pagination.value.pageNo = 1
        showLazyList.value = getShowLazyList()
    },
    {
        deep: true
    }
)

const lazyRef = ref<any>(null)
const lazyScroll = () => {
    if (showLazyList.value.length === props.lazyList.length) {
        return
    }
    if (lazyRef.value.scrollHeight - lazyRef.value.scrollTop - lazyRef.value.clientHeight < 60) {
        pagination.value.pageNo++
        showLazyList.value = showLazyList.value.concat(getShowLazyList())
    }
}

onMounted(() => {
    lazyRef.value.addEventListener('scroll', lazyScroll, true)
})
onUnmounted(() => {
    if (lazyRef.value) {
        lazyRef.value.removeEventListener('scroll', lazyScroll, true)
    }
})
</script>

<style scoped>
.t-lazy {
    width: 100%;
    height: 100%;
    overflow: auto;
}
</style>