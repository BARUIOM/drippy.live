import Vue from 'vue'
import VueAxios from 'vue-axios'
import VueSocketIO from 'vue-socket.io';

import App from './App.vue'
import router from './router'

import axios from 'axios'
import io from 'socket.io-client';

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import './assets/theme.scss'

export const socket = io('https://drippy-music.herokuapp.com', { transports: ['websocket'] })

Vue.use(VueMaterial)
Vue.use(VueAxios, axios)
Vue.use(new VueSocketIO({ connection: socket }))

Vue.config.productionTip = false
new Vue({ router, render: h => h(App) }).$mount('#app')
