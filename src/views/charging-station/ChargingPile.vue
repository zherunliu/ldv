<template>
  <el-card>
    <div class="toolbar">
      <el-select style="width: 250px" placeholder="选择/输入站点名称" v-model="value" filterable>
        <el-option v-for="item of options" :key="item.id" :label="item.name" :value="item.name" />
      </el-select>
      <el-radio-group class="ml" v-model="radio" @change="handleChange">
        <el-radio-button :label="`全部(${allCount})`" :value="0" />
        <el-radio-button :label="`空闲中(${checkCount(1)})`" :value="1" />
        <el-radio-button :label="`充电中(${checkCount(2)})`" :value="2" />
        <el-radio-button :label="`连接中(${checkCount(3)})`" :value="3" />
        <el-radio-button :label="`排队中(${checkCount(4)})`" :value="4" />
        <el-radio-button :label="`已预约(${checkCount(5)})`" :value="5" />
        <el-radio-button :label="`故障/离线(${checkCount(6)})`" :value="6" />
      </el-radio-group>
    </div>
  </el-card>
  <el-card class="mt">
    <el-row :gutter="20">
      <el-col :span="6" v-for="item of dataListCopy" :key="item.id">
        <div class="item">
          <div class="pic">
            <p v-if="item.status === 1">空闲中</p>
            <p v-if="item.status === 2">充电中</p>
            <p v-if="item.status === 3">连接中</p>
            <p v-if="item.status === 4">排队中</p>
            <p v-if="item.status === 5">已预约</p>
            <p v-if="item.status === 6">故障/离线</p>
            <img
              :src="item.status === 1 ? free : item.status === 6 ? outline : ing"
              width="100px"
            />
            <p v-if="item.status === 2">{{ item.percent }}</p>
          </div>
          <div class="info">
            <h3>CD1001</h3>
            <hr style="margin-bottom: 10px" />
            <p>电压：{{ item.voltage }}</p>
            <p>电流：{{ item.current }}</p>
            <p>功率：{{ item.power }}</p>
            <p>温度：{{ item.tem }}</p>
          </div>
        </div>
        <div class="btn">
          <div class="divider" />
          <div>
            <p class="fl ml" style="font-size: 12px; color: #999">暂无预警</p>
            <div class="fr" style="text-align: right">
              <el-popover placement="right" :width="240" trigger="click">
                <template #reference>
                  <el-button size="small">维保记录</el-button>
                </template>
                <h3 class="mb">维保记录</h3>
                <el-timeline style="max-width: 600px">
                  <el-timeline-item
                    :timestamp="i.time"
                    v-for="i of item.record"
                    :key="i.time"
                    :hollow="true"
                    type="primary"
                  >
                    {{ i.msg }}
                  </el-timeline-item>
                </el-timeline>
              </el-popover>
              <el-popover placement="right" :width="240" trigger="click">
                <template #reference>
                  <el-button size="small" type="primary" class="mr">使用记录</el-button>
                </template>
                <h3 class="mb">使用记录</h3>
                <el-timeline style="max-width: 600px">
                  <el-timeline-item
                    :timestamp="j.time"
                    v-for="j of item.record"
                    :key="j.time"
                    :hollow="true"
                    type="primary"
                  >
                    {{ j.msg }}
                  </el-timeline-item>
                </el-timeline>
              </el-popover>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
import free from '@/assets/free.png'
import outline from '@/assets/outline.png'
import ing from '@/assets/ing.png'
import { currentListApi } from '@/api/charging-station'
import { onMounted, ref, computed, watch } from 'vue'
import { type IPileType, type IChargeDevice } from '@/types/station'

const value = ref('')
const radio = ref(0)
const options = ref<IPileType[]>([])
const dataList = ref<IChargeDevice[]>([])
const dataListCopy = ref<IChargeDevice[]>([])
const allCount = computed(() => dataList.value.length)
const loadData = async () => {
  const { data } = await currentListApi()
  options.value = data as IPileType[]
  dataList.value = (data as IPileType[])[0].list
  dataListCopy.value = (data as IPileType[])[0].list
  if (import.meta.env.DEV) {
    console.log(dataList.value)
  }
}
function checkCount(num: number) {
  return dataList.value.filter((item) => item.status === num).length
}
const handleChange = () => {
  dataListCopy.value = dataList.value
  if (radio.value !== 0) {
    dataListCopy.value = dataList.value.filter((item) => item.status === radio.value)
  }
}

watch(value, () => {
  const res = options.value.filter((item) => item.name === value.value)
  dataList.value = res[0].list
  dataListCopy.value = res[0].list
  radio.value = 0
})

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
}

.item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 180px;
  background-color: rgb(247, 251, 254);
  padding: 10px;
  border-radius: 10px 10px 0 0;

  .pic {
    p {
      width: 76px;
      text-align: center;
      margin-bottom: 10px;
      color: rgb(61, 187, 146);
    }
  }

  .info {
    color: #999;
    margin-left: 20px;
    line-height: 26px;
  }
}

.btn {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: #f7fbfe;
  margin-bottom: 20px;

  .divider {
    background-color: #f4f4f4;
    height: 2px;
    width: 95%;
  }
}
</style>
