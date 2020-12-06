<template>
    <div
        class="flex flex-col h-screen text-black dark:text-white bg-main-light dark:bg-main-dark"
    >
        <header
            v-bind:class="{ collapsed: !scrolling }"
            class="flex items-center justify-between z-10 bg-accent-light dark:bg-accent-dark p-1"
        >
            <form class="w-full m-1" @submit.prevent="search">
                <TextField v-model="query" class="w-full" :rounded="true">
                    <span class="mdi mdi-magnify mdi-24px"></span>
                </TextField>
            </form>
            <Button class="m-1" size="2rem" @click="$router.push('/')">
                <span class="mdi mdi-home mdi-24px" />
            </Button>
        </header>
        <main
            @scroll="scroll"
            class="mb-auto overflow-x-hidden overflow-y-auto"
        >
            <router-view />
        </main>
        <footer
            v-if="$player.state"
            class="z-10 bg-accent-light dark:bg-accent-dark"
        >
            <Player />
        </footer>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import Button from '@/components/Button.vue'
import TextField from '@/components/TextField.vue'
import Player from '@/components/player/Player.vue'

@Component({ components: { Button, TextField, Player } })
export default class Home extends Vue {

    private query: string = '';
    private offset: number = 0;
    private scrolling: boolean = true;

    private mounted(): void {
        this.$player.on('playback-started', () =>
            this.$forceUpdate()
        );
    }

    private scroll(event: UIEvent) {
        const current = (event.target as HTMLElement).scrollTop
        this.scrolling = this.offset > current;
        this.offset = current;
    }

    private search() {
        const query = { query: this.query };
        this.$router.push({ name: 'search', query }).catch(() =>
            this.$router.replace({ query })
        );
    }

}
</script>

<style lang="scss" scoped>
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
    width: 100vw;
    position: absolute;
    will-change: transform;
    box-shadow: $shadow-1, $shadow-2;
    transition: transform 0.3s ease-in-out;
}

header.collapsed {
    transform: translate(0, -56px);
}

main {
    padding-top: 56px;
}

footer {
    will-change: transform;
    box-shadow: $shadow-1, $shadow-2;
}
</style>