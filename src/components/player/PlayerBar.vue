<template>
    <footer
        v-bind:class="{ animate }"
        class="z-20 bg-accent-light dark:bg-accent-dark"
        :style="`transform: translate(0, calc(-${position}vh + ${offset}px));`"
    >
        <div
            @touchend.stop="end"
            @touchmove.stop="move"
            class="absolute w-full h-full z-10 md:hidden"
        ></div>
        <Player v-on:visible="dialog(arguments[0])" />
    </footer>
</template>

<script lang="ts">
const HEADER_SIZE = 64;

import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import Player from './Player.vue'
import Utils from '@/modules/utils'

@Component({ components: { Player } })
export default class PlayerBar extends Vue {

    private offset: number = 0;
    private position: number = 0;

    private mobile: boolean = false;
    private animate: boolean = true;

    private end(event: TouchEvent) {
        this.animate = true;

        if (!this.mobile) {
            this.dialog(this.position === 0 || this.position > 10);
        } else this.dialog(false);
    }

    private move(event: TouchEvent) {
        this.offset = 0;
        this.animate = false;

        const touch = event.touches[0];
        const position = window.innerHeight - touch.clientY;

        this.position = Utils.range((position / window.innerHeight) * 100,
            0, 100 - ((HEADER_SIZE / window.innerHeight) * 100));
    }

    public dialog(visible: boolean) {
        if (!Utils.$breakpoints.$md) {
            this.mobile = visible;

            if (this.mobile) {
                this.offset = HEADER_SIZE;
                return this.position = 100;
            }
        }

        this.offset = 0;
        return this.position = 0;
    }

    @Watch('breakpoints', { immediate: true, deep: true })
    private resize(): void {
        if (Utils.$breakpoints.$md) {
            this.offset = this.position = 0;
        }
    }

}
</script>

<style lang="scss" scoped>
footer {
    touch-action: none;
    will-change: transform;
}

footer.animate {
    transition: transform 0.2s ease-in-out;
}
</style>