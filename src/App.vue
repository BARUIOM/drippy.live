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
        <div
            class="toaster fixed top-0 left-1/2 z-100 p-1 w-full md:w-1/3 xl:w-1/4"
        >
            <transition-group name="overlay">
                <div
                    v-for="message in messages"
                    :key="i + message.text"
                    class="w-full rounded shadow p-2 my-1"
                    :style="`background-color: ${colors[message.type]};`"
                >
                    <div class="font-bold text-center" v-text="message.text" />
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import Spinner from '@/components/Spinner.vue'
import { Message, MessageType } from '@/modules/utils'

@Component({ components: { Spinner } })
export default class App extends Vue {

    private overlay = false;
    private messages: Message[] = [];

    private readonly colors = {
        [MessageType.Success]: '#00c853',
        [MessageType.Error]: '#d50000',
        [MessageType.Alert]: '#ffab00'
    };

    private created(): void {
        this.$root.$on('toast', (message: Message) => {
            this.messages.push(message);
            setTimeout(() => this.messages.splice(0, 1), 3000);
        });
        this.$root.$on('overlay', (overlay: boolean) => this.overlay = overlay);
    }

}
</script>

<style lang="scss">
.overlay-enter-active,
.overlay-leave-active {
    transition: opacity 600ms;
}

.overlay-enter,
.overlay-leave-to {
    opacity: 0;
}
</style>

<style lang="scss" scoped>
div.toaster {
    transform: translateX(-50%);
}
</style>