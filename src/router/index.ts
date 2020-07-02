import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import Home from '@/views/Home.vue'

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        component: Home,
        children: []
    }
];

export default new VueRouter({ mode: 'history', base: process.env.BASE_URL, routes });