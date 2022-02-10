import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'


import './assets/markdown.css';

import MyKit from '../packages';
import Preview from './components/Preview.vue';
import 'element-plus/dist/index.css'

const app = createApp(App)
app.component('Preview', Preview)
app.use(ElementPlus)

app.use(MyKit).use(router).mount('#app')
