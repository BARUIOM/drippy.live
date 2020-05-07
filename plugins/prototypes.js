import Vue from 'vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

import drippy from '~/assets/js/drippy-api.js'
import webplayer from '~/assets/js/web-player.js'
import nativeplayer from '~/assets/js/native-player.js'

Vue.prototype.$drippy = drippy;
Vue.prototype.$native = window.native;
Vue.prototype.$player = (() => {
    if (window.native) {
        return nativeplayer;
    }
    return webplayer;
})();

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);