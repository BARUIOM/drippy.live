<template>
    <div
        class="flex flex-col h-screen text-black dark:text-white bg-main-light dark:bg-main-dark"
    >
        <header
            v-bind:class="{ collapsed: !scrolling, [header]: header }"
            class="flex items-center justify-between z-20 bg-accent-light dark:bg-accent-dark p-2"
        >
            <Button
                class="m-1"
                @click="$router.push('/')"
                v-if="$route.name !== 'library'"
            >
                <span class="mdi mdi-home mdi-24px" />
            </Button>
            <div class="w-full"></div>
            <Button class="m-1">
                <span class="mdi mdi-magnify mdi-24px" />
            </Button>
        </header>
        <main
            @scroll="scroll"
            class="pt-14 mb-auto overflow-x-hidden overflow-y-auto"
        >
            <router-view />
        </main>
        <PlayerBar ref="bar" v-if="$player.state" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import Button from '@/components/Button.vue'
import TextField from '@/components/TextField.vue'
import PlayerBar from '@/components/player/PlayerBar.vue'

@Component({ components: { Button, TextField, PlayerBar } })
export default class Home extends Vue {

    private query: string = '';
    private offset: number = 0;
    private scrolling: boolean = true;

    private _header!: string;
    private header: string = 'default';

    private created(): void {
        this.$root.$on('header', (header: string) =>
            this.header = this._header = header
        );
    }

    private mounted(): void {
        this.$player.on('playback-started', () =>
            this.$forceUpdate()
        );
    }

    private scroll(event: UIEvent) {
        const current = (event.target as HTMLElement).scrollTop
        this.scrolling = this.offset > current;
        this.offset = current;

        if (this.offset === 0) {
            return this.header = this._header;
        }

        if (this.header !== 'default') {
            this.header = 'default';
        }
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
header {
    width: 100vw;
    position: absolute;
    will-change: transform;
    transition: transform 300ms ease-in-out, background-color 300ms linear;
}

header.transparent {
    box-shadow: none;
    background-color: transparent;
}

header.collapsed {
    transform: translate(0, -56px);
}
</style>