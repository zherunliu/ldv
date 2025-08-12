<template>
  <div id="container"></div>
</template>

<script setup lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader'
import { onMounted, onUnmounted, ref } from 'vue'
import { mapListApi } from '@/api/map'
import stationIcon from '@/assets/flashIcon.png'
let map: any = null
const markersData = ref<any>([])
onMounted(() => {
  AMapLoader.load({
    key: '99997aed9d68f53c894c3b2fae1e2e5b',
    version: '1.4.15',
    plugins: [],
  })
    .then((AMap) => {
      map = new AMap.Map('container', {
        viewMode: '3D',
        zoom: 5,
        center: [116.397428, 39.90923],
      })
      mapListApi().then(({ data }) => {
        markersData.value = data
        markersData.value.forEach((item) => {
          const marker = new AMap.Marker({
            position: item.position,
            icon: stationIcon,
          })
          map.add(marker)
        })
      })
    })
    .catch((e) => {
      console.log(e)
    })
})

onUnmounted(() => {
  map?.destroy()
})
</script>

<style lang="less" scoped>
#container {
  width: 100%;
  height: 80vh;
}
</style>
