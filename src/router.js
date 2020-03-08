import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './components/Home'
import Search from './components/Search'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/search',
        name: 'search',
        component: Search
    }
];

export default new VueRouter({ routes });