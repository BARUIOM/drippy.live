<template>
    <div class="flex flex-col h-screen text-black dark:text-white">
        <header class="bg-accent-light dark:bg-accent-dark"></header>
        <main
            class="h-full bg-main-light dark:bg-main-dark overflow-x-hidden overflow-y-auto"
        >
            <router-view />
        </main>
        <footer
            v-if="$player.state"
            class="bg-accent-light dark:bg-accent-dark"
        >
            <Player />
        </footer>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import Player from '@/components/player/Player.vue'

@Component({ components: { Player } })
export default class Home extends Vue {

    private mounted(): void {
        this.$player.on('playback-started', () =>
            this.$forceUpdate()
        );
    }
}
</script>

<style lang="scss">
$shadow-1: 0 0 10px 2px
    rgba(
        $color: #000000,
        $alpha: 0.2,
    );
$shadow-2: 0 0 10px
    rgba(
        $color: #000000,
        $alpha: 0.24,
    );

header {
    z-index: 10;
    flex: 0 0 54px;
    box-shadow: $shadow-1, $shadow-2;
}

footer {
    z-index: 10;
    flex: 0 0 72px;
    box-shadow: $shadow-1, $shadow-2;
}
</style>