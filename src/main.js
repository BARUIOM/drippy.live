import Vue from 'vue'
import VueAxios from 'vue-axios'

import App from './App.vue'
import router from './router'

import axios from 'axios'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import './assets/theme.scss'

Vue.use(VueMaterial)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false
new Vue({ router, render: h => h(App) }).$mount('#app')
