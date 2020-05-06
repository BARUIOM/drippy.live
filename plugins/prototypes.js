import Vue from 'vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

import drippy from '~/assets/js/drippy-api.js'
import webplayer from '~/assets/js/web-player.js'

Vue.prototype.$drippy = drippy;
Vue.prototype.$player = webplayer;
Vue.prototype.$native = window.native;

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);