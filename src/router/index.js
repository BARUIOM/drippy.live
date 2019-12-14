import Vue from 'vue'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import VueSocketIO from 'vue-socket.io';

import axios from 'axios'
import io from 'socket.io-client';

import Home from '../components/Home.vue'
import Search from '../components/Search.vue'

export const socket = io('https://drippy-music.herokuapp.com', { transports: ['websocket'] })

Vue.use(VueRouter)
Vue.use(VueAxios, axios)
Vue.use(new VueSocketIO({ connection: socket }))

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
]

const router = new VueRouter({ routes })
export default router