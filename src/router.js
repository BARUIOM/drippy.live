import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from './components/Main'
import Auth from './components/Auth'
import Login from './components/Login'
import Search from './components/Search'
import Artist from './components/Artist'
import Playlist from './components/Playlist'
import Playlists from './components/Playlists'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'app',
        components: {
            main: Main,
            login: Login
        },
        children: [
            {
                path: '/search',
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
                component: Playlist
            },
            {
                path: '/playlists/:id',
                name: 'playlist',
                component: Playlist
            },
            {
                path: '/playlists',
                name: 'playlists',
                component: Playlists
            }
        ]
    },
    {
        name: 'auth',
        path: '/auth/:code',
        component: Auth
    }
];

export default new VueRouter({ routes });