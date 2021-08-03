import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/lib/styles/main.sass'
import { createVuetify, VuetifyOptions } from 'vuetify';
import * as components from 'vuetify/lib/components'
import * as directives from 'vuetify/lib/directives'
import { LIGHT_THEME_COLORS } from '../constants'

export default createVuetify({
  components,
  directives,
  defaults:{
    VBtn: {
      height: 50,
      color: 'primary',
      flat: true
    }
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: LIGHT_THEME_COLORS
      }
    }
  }
} as VuetifyOptions)
