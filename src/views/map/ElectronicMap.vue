<template>
  <el-row :gutter="20">
    <el-col :span="18">
      <el-card>
        <MapContainer />
      </el-card>
    </el-col>
    <el-col :span="6"> </el-col>
  </el-row>
</template>

<script setup lang="ts">
import MapContainer from '@/components/map/MapContainer.vue'
</script>
