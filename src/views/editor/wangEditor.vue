<template>
    <div style="border: 1px solid #ccc">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden;"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />

    </div>
    <!-- <pre>
      {{ valueHtml }}
    </pre> -->
</template>

<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css';
import { onBeforeUnmount, ref, shallowRef, onMounted, watch } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const mode = 'default'

// 内容 HTML
const valueHtml = ref('<p>hello</p>')
watch(
  () => valueHtml.value,
  () => {
    console.log('valueHtml changed:', valueHtml.value)
  }
)

// 模拟 ajax 异步获取内容
onMounted(() => {
    setTimeout(() => {
        valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
    }, 1500)
})

const toolbarConfig = {}
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    'uploadImage': {
      // 最大图片限制
      maxFileSize: 1024 * 1024 * 20, // 20M
      // 自己处理上传图片
      customUpload(file:any, insertFn: any) {
        console.log(file, 'customUpload')
        // file 即选中的文件
        // 自己实现上传，并得到图片 url alt href
        // 最后插入图片
        // insertFn(url, alt, href)
      },
      // 小于该值就插入 base64 格式（而不上传），默认为 0
      base64LimitSize: 1024 * 1024 * 30 // 30M
    }
  }
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor:any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

</script>

<style scoped>

</style>