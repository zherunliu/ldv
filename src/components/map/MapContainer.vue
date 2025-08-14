<template>
  <div id="container"></div>
</template>

<script setup lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader'
import { onMounted, onUnmounted, ref } from 'vue'
import { mapListApi } from '@/api/map'
import stationIcon from '@/assets/flashIcon.png'
import station from '@/assets/station.jpg'
import { type IStation } from '@/types/map'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let map: any = null
const markersData = ref<IStation[]>([])
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
        markersData.value = data as IStation[]
        // 创建信息窗体
        const infoWindow = new AMap.InfoWindow({
          offset: new AMap.Pixel(0, -30),
        })
        markersData.value.forEach((item) => {
          const marker = new AMap.Marker({
            position: item.position,
            icon: stationIcon,
          })
          marker.on('click', () => {
            infoWindow.setContent(`
              <div style="display: flex; padding: 10px; align-items: center;">
                <div>
                  <img src="${station}" style="width: 200px;" />
                </div>
                <div style="width: 150px; margin-left: 20px; line-height: 30px">
                  <h4>${item.title}</h4>
                  <p>充电站数量：${item.count}</p>
                  <p>充电站状态：<span style="color: blue">${item.status == 1 ? '使用中' : '维护中'}</span></p>
                </div>
              </div>`)
            infoWindow.open(map, marker.getPosition())
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
