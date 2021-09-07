import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css'
import './assets/style/index.scss'

import i18n from '@/lang/register-i18n'
import registerVant from '@/register_vant'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(i18n)
app.use(registerVant)
app.mount('#app')
