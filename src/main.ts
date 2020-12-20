import Vue from 'vue'

import App from '@/App.vue'
import router from '@/router'

import player from '@/modules/web-player'
import drippy, { Manager } from '@/modules/drippy-api'
import { Utils } from '@/modules/utils'

import '@/plugins/validation-rules'
import '@/styles/drippy.scss'

Vue.config.productionTip = false;
Vue.prototype.$drippy = drippy;
Vue.prototype.$player = player;

const vm = new Vue({
    data: { $user: {} }
});

Vue.mixin({
    data: () => ({ Utils, breakpoints: Utils.$breakpoints }),
    computed: {
        $user: {
            get: () => vm.$data.$user,
            set: (user) => vm.$data.$user = user
        }
    }
});

//Loading.show();
drippy.validate().then(async () => {
    vm.$data.$user = await Manager.getUser();
}).catch((error) => {
    if (error.response || error.message === 'User not authenticated') {
        if (!window.location.pathname.startsWith('/auth'))
            router.push({ name: 'login' })
    }
}).finally(() => {
    new Vue({ router, render: h => h(App) }).$mount('#app');
    //Loading.hide();
});