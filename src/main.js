import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'



let app = createApp(App)
app.use(ElementPlus)

app.mount('#app')

// createApp(App).mount('#app')
