import Vue from 'vue'

import '@/styles/quasar.scss'
import 'quasar/dist/quasar.ie.polyfills'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/mdi-v5/mdi-v5.css'
import { Quasar, Notify, Loading, LocalStorage, SessionStorage } from 'quasar'

import MDIv5 from 'quasar/icon-set/mdi-v5'

Vue.use(Quasar, {
    config: {
        dark: true
    },
    iconSet: MDIv5,
    plugins: [Notify, Loading, LocalStorage, SessionStorage]
});