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
</template>

<script lang="ts" setup>
import { typeListApi } from '@/api/document'
import { ref, onMounted } from 'vue'

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
