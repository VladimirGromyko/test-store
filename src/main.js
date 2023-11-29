import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import elStore from "./vuex/basket/index.js";
import {createStore} from "vuex";

const store = createStore(elStore);


let app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus)
app.use(store)

app.mount('#app')

// createApp(App).mount('#app')
