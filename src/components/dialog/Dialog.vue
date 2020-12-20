<template>
    <transition name="overlay" @enter="content = true">
        <div
            v-if="visible"
            class="absolute w-full h-full bg-black bg-opacity-80 text-white backdrop-filter z-100"
        >
            <transition name="scale" @leave="visible = false">
                <slot v-if="content" :close="close" />
            </transition>
        </div>
    </transition>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Dialog extends Vue {

    private visible: boolean = false;
    private content: boolean = false;

    public show(): void {
        this.visible = true;
    }

    public close(): void {
        this.$emit('close');
        this.content = false;
    }

}
</script>

<style lang="scss" scoped>
.scale-enter-active {
    animation: bounce-in 0.5s;
}

.scale-leave-active {
    animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1);
    }
}
</style>