<template>
  <el-row :gutter="10">
    <el-col :span="16">
      <el-card>
        <MapContainer />
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card class="des">
        <div>1.累积充电站数量：<el-text type="primary">34个</el-text></div>
        <div>2.单省份最多充电站：<el-text type="primary">北京(4个)</el-text></div>
        <div>3.充电站遍及省份：<el-text type="primary">14个</el-text></div>
        <div>4.单日营收最高：<el-text type="primary">北京西单充电站</el-text></div>
        <div>5.单日营收最低：<el-text type="primary">南宁青秀山充电站</el-text></div>
        <div>6.故障率最高：<el-text type="primary">兰州黄河桥充电站</el-text></div>
      </el-card>
      <el-card style="margin-top: 10px">
        <template #header>
          <div class="card-header">
            <h4>新增站点地图</h4>
          </div>
        </template>
        <el-form :model="form" style="max-width: 600px">
          <el-form-item label="站点名称">
            <el-input v-model="form.name" placeholder="请输入站点名称" />
          </el-form-item>
          <el-form-item label="站点地址">
            <el-input v-model="form.address" placeholder="请输入站点地址" />
          </el-form-item>
          <el-form-item label="站点经度">
            <el-input v-model="form.longitude" placeholder="请输入站点经度" />
          </el-form-item>
          <el-form-item label="站点纬度">
            <el-input v-model="form.latitude" placeholder="请输入站点纬度" />
          </el-form-item>
          <el-form-item label="充电桩数量">
            <el-input v-model="form.count" placeholder="请输入充电桩数量" />
          </el-form-item>
          <el-form-item label="立即使用">
            <el-switch v-model="form.now" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remark" type="textarea" placeholder="请输入备注" />
          </el-form-item>
          <el-button type="primary">提交</el-button>
          <el-button>重置</el-button>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import MapContainer from '@/components/map/MapContainer.vue'
import { reactive } from 'vue'

const form = reactive({
  name: '',
  address: '',
  longitude: '',
  latitude: '',
  count: '',
  now: false,
  remark: '',
})
</script>
