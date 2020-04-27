import Vue from 'vue'

import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import player from './plugins/media-player.js';

Vue.config.productionTip = false;
Vue.prototype.$player = player;
new Vue({ router, vuetify, render: h => h(App) }).$mount('#app');
