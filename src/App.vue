<template>
    <div
        class="w-screen h-screen text-black dark:text-white bg-main-light dark:bg-main-dark select-none overflow-hidden"
    >
        <router-view class="w-full h-full" />
        <transition name="overlay">
            <div
                v-if="overlay"
                class="top-0 absolute w-full h-full bg-opacity-80 bg-black backdrop-filter z-100"
            >
                <div class="flex items-center justify-center w-full h-full">
                    <Spinner class="text-white" />
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import Spinner from '@/components/Spinner.vue'

@Component({ components: { Spinner } })
export default class App extends Vue {

    private overlay = false;

    private created(): void {
        this.$root.$on('overlay', (overlay: boolean) => this.overlay = overlay);
    }

}
</script>

<style lang="scss" scoped>
.overlay-enter-active,
.overlay-leave-active {
    transition: opacity 600ms;
}

.overlay-enter,
.overlay-leave-to {
    opacity: 0;
}
</style>