import Vue from 'vue'
import VueSocketIO from 'vue-socket.io';

import io from 'socket.io-client';

import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

export const api_url = "https://drippy-music.herokuapp.com";
export const socket = io(api_url, { transports: ['websocket'] });

Vue.config.productionTip = false;

Vue.use(new VueSocketIO({ connection: socket }));
new Vue({ router, vuetify, render: h => h(App) }).$mount('#app');
