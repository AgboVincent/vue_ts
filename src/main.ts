import {createApp} from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import './App.scss'
import {router} from "./router";
import Store, {key} from "./store";

const app = createApp(App)
app.use(vuetify)
app.use(Store, key)
app.use(router)

app.mount('#app')
