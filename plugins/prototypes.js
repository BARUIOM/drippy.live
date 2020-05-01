import Vue from 'vue'
import drippy from '~/assets/js/drippy-api.js'
import webplayer from '~/assets/js/web-player.js'

Vue.prototype.$drippy = drippy;
Vue.prototype.$player = webplayer;