import {createApp} from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import './App.scss'
import {router} from "./router";
import Store, {key} from "./store";
import BalmUI from 'balm-ui'; // Official Google Material Components
import BalmUIPlus from 'balm-ui/dist/balm-ui-plus.esm.js'; // BalmJS Team Material Components
import 'balm-ui-css';

const app = createApp(App)
app.mixin({
    methods: {
        money(value) {
            return parseFloat(value).toLocaleString('en-NG', {currency: 'NGN', style: 'currency'})
        },
        formatDate(date) {
            return (new Date(date)).toDateString()
        },
        formatDateTime(date) {
            return (new Date(date)).toUTCString()
        }
    }
})
app.use(vuetify)
app.use(BalmUI)
app.use(BalmUIPlus)
app.use(Store, key)
app.use(router)

app.mount('#app')
