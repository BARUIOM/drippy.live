<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated class="bg-dark">
            <q-toolbar class="q-gutter-x-sm">
                <q-btn @click="drawer = !drawer" icon="mdi-menu" flat dense></q-btn>
                <portal-target class="fit" name="header" />
            </q-toolbar>
        </q-header>

        <q-drawer v-model="drawer" :width="256" show-if-above bordered>
            <Drawer />
        </q-drawer>

        <q-page-container class="window-width window-height">
            <q-scroll-area class="fit">
                <router-view />
            </q-scroll-area>
        </q-page-container>

        <q-footer class="bg-dark" elevated>
            <q-separator />
            <Player />
        </q-footer>

        <Playlists />
    </q-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import Drawer from '@/components/home/Drawer.vue'
import Player from '@/components/player/Player.vue'
import Playlists from '@/components/dialog/Playlists.vue'

@Component({ components: { Drawer, Player, Playlists } })
export default class Home extends Vue {

    private drawer: boolean = false;

}
</script>

<style lang="scss">
@media screen and (min-width: 1024px) {
    .q-drawer {
        padding-bottom: 72px;
    }
}

.q-footer {
    left: 0px !important;
}
</style>