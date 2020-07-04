<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated class="bg-grey-10">
            <q-toolbar>
                <q-btn @click="drawer = !drawer" icon="menu" flat dense></q-btn>
            </q-toolbar>
        </q-header>

        <q-drawer v-model="drawer" :width="256" :breakpoint="500" show-if-above bordered>
            <Drawer />
        </q-drawer>

        <q-page-container>
            <q-scroll-area>
                <router-view />
            </q-scroll-area>
        </q-page-container>

        <q-footer class="bg-grey-10">
            <q-separator />
            <Player />
        </q-footer>
    </q-layout>
</template>

<script lang="ts">
import Vue from 'vue'

import Drawer from '@/components/home/Drawer.vue'
import Player from '@/components/player/Player.vue'

export default Vue.extend({
    components: { Drawer, Player },
    data: () => ({
        drawer: false
    })
});
</script>

<style lang="scss" scoped>
.q-scrollarea {
    height: calc(100vh - 122px);
}
</style>