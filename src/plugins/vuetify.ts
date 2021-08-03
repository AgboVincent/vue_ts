import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/lib/styles/main.sass'
import { createVuetify, VuetifyOptions } from 'vuetify';
import * as components from 'vuetify/lib/components'
import * as directives from 'vuetify/lib/directives'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          surface: '#E5E5E5',
          primary: '#268BD0',
          secondary: '#03DAC6',
          error: '#E23C43',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#994900',
        }
      }
    }
  }
} as VuetifyOptions)
