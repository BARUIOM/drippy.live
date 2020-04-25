import Vue from 'vue'
import VueSocketIO from 'vue-socket.io';

import io from 'socket.io-client';

import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import player from './plugins/media-player.js';

export const api_url = "https://drippy.live";
export const socket = io(api_url, { transports: ['websocket'] });

Vue.config.productionTip = false;

Vue.prototype.$player = player;
Vue.use(new VueSocketIO({ connection: socket }));
new Vue({ router, vuetify, render: h => h(App) }).$mount('#app');
