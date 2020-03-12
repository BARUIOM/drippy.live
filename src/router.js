import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './components/Home'
import Search from './components/Search'
import Playlist from './components/Playlist'
import Playlists from './components/Playlists'

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
];

export default new VueRouter({ routes });