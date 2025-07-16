/// <reference types="vite/client" />
declare module "mockjs"
// 声明引入的 .vue 文件的类型
declare module "*.vue" {
    import { type ComponentOptions } from "vue";
    const componentOptions: ComponentOptions
    export default componentOptions
}