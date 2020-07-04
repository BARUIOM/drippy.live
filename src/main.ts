import Vue from 'vue'
import { Loading } from 'quasar'

import App from '@/App.vue'
import router from '@/router'

import Drippy, { Manager } from '@/modules/drippy-api'

import '@/plugins/quasar'

Vue.config.productionTip = false;
Vue.prototype.$drippy = Drippy;

Loading.show();
Drippy.validate().then(async () => {
    Vue.prototype.$user = await Manager.getUser();
}).finally(() => {
    new Vue({ router, render: h => h(App) }).$mount('#app');
    Loading.hide();
});