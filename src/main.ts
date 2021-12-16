import {createApp} from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import './App.scss'
import {router} from "./router";
import Store, {key} from "./store";
// @ts-ignore
import BalmUI from 'balm-ui'; // Official Google Material Components
// @ts-ignore
import BalmUIPlus from 'balm-ui/dist/balm-ui-plus.esm.js'; // BalmJS Team Material Components
import 'balm-ui-css';

import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import { createI18n } from 'vue-i18n'

import en from './locales/en.js'
import fr from './locales/fr.js'

const i18n = createI18n({
    locale: 'fr',
    legacy: false,
    globalInjection: true,
    messages: {
        en,
        fr
    }
})
const app = createApp(App)
app.mixin({
    methods: {
        money(value: string) {
            return parseFloat(value).toLocaleString('fr-FR', {currency: 'CFA', style: 'currency'})
        },
        formatDate(date: string | number | Date) {
            return (new Date(date)).toDateString()
        },
        formatDateTime(date: string | number | Date) {
            return (new Date(date)).toUTCString()
        },
        shrinkText(value: string, size = 100) {
            if (value.length > size) {
                return value.substring(0, size) + '...'
            }
            return value
        }
    }
})

app.use(vuetify)
app.use(BalmUI)
app.use(VueLoading)
app.use(BalmUIPlus)
app.use(Store, key)
app.use(router)
app.use(i18n)
app.mount('#app')
