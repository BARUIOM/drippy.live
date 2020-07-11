import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import Home from '@/views/Home.vue'
import Login from '@/views/auth/Login.vue'
import Spotify from '@/views/auth/Spotify.vue'

import Search from '@/views/home/search/Search.vue'
import Library from '@/views/home/collection/Library.vue'

import Artist from '@/views/artist/Artist.vue'
import Album from '@/views/albums/Album.vue'

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        component: Home,
        children: [
            {
                path: '',
                name: 'search',
                component: Search
            },
            {
                path: '/artist/:id',
                name: 'artist',
                component: Artist
            },
            {
                path: '/album/:id',
                name: 'album',
                component: Album
            },
            {
                path: '/collection',
                name: 'collection',
                component: Library
            }
        ]
    },
    {
        name: 'login',
        path: '/auth/login',
        component: Login
    },
    {
        name: 'spotify',
        path: '/auth/spotify',
        component: Spotify
    }
];

export default new VueRouter({ mode: 'history', base: process.env.BASE_URL, routes });