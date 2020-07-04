import Vue from 'vue'
import { Loading } from 'quasar'

import App from '@/App.vue'
import router from '@/router'

import player from '@/modules/web-player'
import drippy, { Manager } from '@/modules/drippy-api'

import '@/plugins/quasar'
import '@/plugins/validation-rules'

Vue.config.productionTip = false;
Vue.prototype.$drippy = drippy;
Vue.prototype.$player = player;

Loading.show();
drippy.validate().then(async () => {
    Vue.prototype.$user = await Manager.getUser();
}).finally(() => {
    new Vue({ router, render: h => h(App) }).$mount('#app');
    Loading.hide();
});