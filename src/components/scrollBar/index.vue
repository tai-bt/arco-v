<template>
    <div class="scrollBar" ref="scrollBarRef">
        <slot></slot>
        <div class="rightScroll" ref="rightScrollRef">
            <div class="rightScroll-children hand"
                ref="rightScrollChildrenRef"
                @mousedown="rightScrollMouseDown"
                @mouseup="rightScrollMouseUp"
                >
            </div>
        </div>
        <div class="bottomScroll" ref="bottomScrollRef"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted } from 'vue'

const scrollBarRef = ref<any>(null)
const rightScrollRef = ref<any>(null)
const rightScrollChildrenRef = ref<any>(null)
const bottomScrollRef = ref<any>(null)

// 初始化滚动条
const initScroll = () => {
    // 纵向滚动条的高度设置
    const scrollBarClientHeight = scrollBarRef.value.clientHeight
    const scrollBarScrollHeight = scrollBarRef.value.scrollHeight
    rightScrollChildrenRef.value.style.height = scrollBarClientHeight/scrollBarScrollHeight * 100 + '%'
}
nextTick(() => {
    initScroll()
})

// scrollBar监听
const scrollBarListener = () => {
    rightScrollRef.value.style.top = scrollBarRef.value.scrollTop + 'px'
    rightScrollChildrenRef.value.style.top = scrollBarRef.value.scrollTop / scrollBarRef.value.scrollHeight * 100 + '%'
}
// 右侧滚动条鼠标按下事件
let downY = 0
const rightScrollMouseDown = (e:any) => {
    // 鼠标按下时在滚动条哪个位置（鼠标的X - 当前元素距屏幕顶部的距离）
    downY = e.clientY - e.target.getBoundingClientRect().top
    // 鼠标移动事件
    e.target.addEventListener('mousemove', rightScrollMouseMove, true)
}
// 移动
const rightScrollMouseMove = (e:any) => {
    // e.target.getBoundingClientRect().top
    console.log(e.clientY - Number(e.target.offsetParent.getBoundingClientRect().top))
    e.target.style.top = e.clientY - Number(e.target.offsetParent.getBoundingClientRect().top) - downY + 'px'
    // console.dir(e.target.getBoundingClientRect().top, e.target)
    // console.log(scrollBarRef.value.scrollTop)
}
// 右侧滚动条鼠标抬起事件
const rightScrollMouseUp = (e:any) => {
    e.target.removeEventListener('mousemove', rightScrollMouseMove, true)
}

onMounted(() => {
    scrollBarRef.value.addEventListener('scroll', scrollBarListener, true)
})
onUnmounted(() => {
    if (scrollBarRef.value) {
        scrollBarRef.value.removeEventListener('scroll', scrollBarListener, true)
    }
})
</script>

<style scoped>
.scrollBar {
    overflow: auto;
    position: relative;
}
.rightScroll {
    position: absolute;
    right: 3px;
    top: 0;
    width: 20px;
    height: 100%;
    background-color: #000;
}
.rightScroll-children {
    background-color: aqua;
    width: 100%;
    border-radius: 5px;
    position: relative;
}

.bottomScroll {
    position: absolute;
    left: 0;
    right: 0;
    height: 5px;
    background-color: #000;
}
.scrollBar::-webkit-scrollbar {
  width: 0px;
}
</style>