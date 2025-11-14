<template>
  <el-card>
    <div>
      <span class="title">文章类型：</span>
      <el-tag
        :type="selectedTags.type === -1 ? 'primary' : 'info'"
        @click="handleClickTag(-1, 'type')"
        >全部</el-tag
      >
      <el-tag
        :type="index === selectedTags.type ? 'primary' : 'info'"
        class="ml"
        :key="index"
        @click="handleClickTag(index, 'type')"
        v-for="(item, index) of typeList.type"
        >{{ item }}</el-tag
      >
    </div>
    <div class="mt">
      <span class="title">重要程度：</span>
      <el-tag
        :type="selectedTags.important === -1 ? 'primary' : 'info'"
        @click="handleClickTag(-1, 'important')"
        >全部</el-tag
      >
      <el-tag
        :type="index === selectedTags.important ? 'primary' : 'info'"
        class="ml"
        :key="index"
        @click="handleClickTag(index, 'important')"
        v-for="(item, index) of typeList.important"
        >{{ item }}</el-tag
      >
    </div>
    <div class="mt">
      <span class="title">发布渠道：</span>
      <el-tag
        :type="selectedTags.publish === -1 ? 'primary' : 'info'"
        @click="handleClickTag(-1, 'publish')"
        >全部</el-tag
      >
      <el-tag
        :type="index === selectedTags.publish ? 'primary' : 'info'"
        class="ml"
        :key="index"
        @click="handleClickTag(index, 'publish')"
        v-for="(item, index) of typeList.publish"
        >{{ item }}</el-tag
      >
    </div>
    <el-divider />
    <div>
      <span class="title">已选：</span>
      <div style="display: inline-block" :key="key" v-for="(value, key) of selectedTags">
        <el-tag
          type="success"
          class="mr"
          v-if="value !== -1"
          @close="handleClickTag(-1, key)"
          closable
          >{{ typeList[key][value] }}</el-tag
        >
      </div>
    </div>
  </el-card>
  <el-button @click="exportToHtml" type="primary" class="mb mt">导出到 html 文件</el-button>
  <editor
    :apiKey="TinyMCE_API_KEY"
    v-model="editorContent"
    :init="{
      language: 'zh-CN',
      plugins: [
        // Core editing features
        'anchor',
        'autolink',
        'charmap',
        'codesample',
        'emoticons',
        'link',
        'lists',
        'media',
        'searchreplace',
        'table',
        'visualblocks',
        'wordcount',
      ],
      height: 400,
    }"
  />
  <el-button class="mt" @click="handleSubmit">提交文章</el-button>
</template>

<script lang="ts" setup>
import Editor from '@tinymce/tinymce-vue'
import { typeListApi } from '@/api/document'
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

type TTypeList<T> = {
  type: T
  important: T
  publish: T
}

const typeList = ref<TTypeList<string[]>>({
  type: [],
  important: [],
  publish: [],
})
const selectedTags = ref<TTypeList<number>>({
  type: -1,
  important: -1,
  publish: -1,
})

onMounted(async () => {
  const res = await typeListApi()
  typeList.value = res.data as TTypeList<string[]>
})

const handleClickTag = (selected: number, tag: keyof TTypeList<number>) => {
  selectedTags.value[tag] = selected
}

const TinyMCE_API_KEY = import.meta.env.VITE_TinyMCE_API_KEY
const editorContent = ref<string>('')
const exportToHtml = () => {
  const blob = new Blob([editorContent.value], { type: 'text/html' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'document.html'
  link.click()
  URL.revokeObjectURL(link.href)
}

const handleSubmit = () => {
  console.log('提交文章内容：', editorContent.value)
  console.log('文章标签：', selectedTags.value)
  ElMessage.success('提交成功！')
}
</script>

<style lang="less" scoped>
.title {
  display: inline-block;
  text-align: right;
  width: 80px;
  font-size: 14px;
}
.el-tag {
  cursor: pointer;
}
</style>
