<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated class="bg-dark">
            <q-toolbar>
                <q-btn @click="drawer = !drawer" icon="menu" flat dense></q-btn>
            </q-toolbar>
        </q-header>

        <q-drawer v-model="drawer" :width="256" :breakpoint="500" show-if-above bordered>
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
    </q-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import Drawer from '@/components/home/Drawer.vue'
import Player from '@/components/player/Player.vue'

@Component({
    components: { Drawer, Player }
})
export default class Home extends Vue {

    private drawer: boolean = false;

}
</script>

<style lang="scss">
.q-drawer {
    padding-bottom: 72px;
}

.q-footer {
    left: 0px !important;
}
</style>