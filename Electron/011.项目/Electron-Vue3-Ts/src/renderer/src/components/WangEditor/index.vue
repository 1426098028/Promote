<template>
  <el-card shadow="hover">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
    <Editor style="height: 400px; overflow-y: auto;" v-model="modelValue" :defaultConfig="editorConfig" :mode="mode"
      @onCreated="handleCreated" @onChange='onChange' />
  </el-card>
</template>
<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, watch } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
const Props = defineProps({
  modelValue: {
    type: String,
    required: true,
    default: ""
  }
})
const emit = defineEmits(['update:modelValue', 'onChange'])


// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()


// 初始 内容 HTML 
const modelValue = ref(Props.modelValue)
const mode = ref('default')
const toolbarConfig = {}
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      server: `http://localhost:5173/api/upload/uploadFileWithWangEditor`,
      fieldName: "file",
      headers: { Authorization: localStorage.getItem("TOKEN") },
      maxFileSize: 10 * 1024 * 1024,
      maxNumberOfFiles: 10,
      allowedFileTypes: ["image/*"],
      timeout: 10000,
    },
    uploadVideo: {
      server: `http://localhost:5173/api/upload/uploadFileWithWangEditor`,
      fieldName: "video",
      headers: { Authorization: localStorage.getItem("TOKEN") },
      maxFileSize: 10 * 1024 * 1024,
      maxNumberOfFiles: 1,
      allowedFileTypes: ["video/*"],
      timeout: 15 * 1000,
    }
  }
}


const onChange = (event) => {
  const EditorValue = event.getHtml() == '<p><br></p>' ? '' : event.getHtml()
  emit("update:modelValue", EditorValue)
  emit("onChange", event, event.getHtml())
}
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
watch(Props, (NewValue) => {
  modelValue.value = NewValue.modelValue
})
</script>
