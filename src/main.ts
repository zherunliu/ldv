import { createApp } from 'vue'
import './style.less'
import App from './App.vue'
import router from './router'
import ElementPlus from "element-plus"
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import "./mock"
import "@/router/guard"

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(ElementPlus)

app.mount('#app')