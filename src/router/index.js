import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/Home.vue'
import Search from '../components/Search.vue'

Vue.use(VueRouter)

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