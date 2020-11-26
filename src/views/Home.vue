<template>
    <div class="flex flex-col h-screen">
        <header class="h-16 dark:bg-dark"></header>
        <main
            class="grid grid-cols-1 gap-4 p-4 h-full dark:bg-body dark:text-light overflow-auto"
        >
            <div class="row-span-1">
                <span class="text-xl font-bold">Artists</span>
            </div>
            <div class="row-span-2">
                <span class="text-xl font-bold">Playlists</span>
            </div>
        </main>
        <footer class="h-20 dark:bg-dark"></footer>
    </div>
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