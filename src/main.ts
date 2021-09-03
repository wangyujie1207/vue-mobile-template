import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import registerVant from '@/register_vant'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(registerVant)
app.mount('#app')
