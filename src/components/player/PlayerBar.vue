<template>
    <footer
        v-bind:class="{ animate }"
        class="z-20 bg-accent-light dark:bg-accent-dark"
        :style="`transform: translate(0, -${Math.max(position - 64, 0)}px);`"
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
import Vue from 'vue'
import Component from 'vue-class-component'

import Player from './Player.vue'
import Utils from '@/modules/utils'

@Component({ components: { Player } })
export default class PlayerBar extends Vue {

    private position: number = 0;
    private mobile: boolean = false;
    private animate: boolean = true;

    private end(event: TouchEvent) {
        this.animate = true;

        if (!this.mobile) {
            const amount = window.innerHeight * 0.2;
            this.dialog(this.position === 0 || this.position > amount);
        } else this.dialog(false);
    }

    private move(event: TouchEvent) {
        this.animate = false;

        const touch = event.touches[0];
        const position = window.innerHeight - touch.clientY;
        this.position = Utils.range(position, 0, window.innerHeight);
    }

    public dialog(visible: boolean) {
        if (!Utils.$breakpoints.$md) {
            this.mobile = visible;

            if (this.mobile) {
                return this.position = window.innerHeight;
            }
        }

        return this.position = 0;
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