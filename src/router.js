import Vue from 'vue'
import VueRouter from 'vue-router'

import Search from './components/Search'
import Artist from './components/Artist'
import Playlist from './components/Playlist'
import Playlists from './components/Playlists'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
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
];

export default new VueRouter({ routes });