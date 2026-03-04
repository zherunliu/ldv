import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '@/router/guard'
import permission from './directives/permission'

async function prepareApp() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mock/browser')
    return worker.start({
      onUnhandledRequest: 'warn',
    })
  }
}

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
const pinia = createPinia()

app.directive('permission', permission)
app.use(router)
app.use(pinia)

prepareApp().then(() => {
  app.mount('#app')
})
