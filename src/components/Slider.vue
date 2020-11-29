<template>
    <div class="slider relative my-2.5">
        <input
            type="range"
            @input.stop="input"
            v-bind:value="value"
            v-bind:max="max"
            class="absolute appearance-none z-20 h-1 w-full opacity-0 cursor-pointer"
        />
        <div class="relative h-1">
            <div
                :style="`width: ${(value / max) * 100}%`"
                class="track absolute z-10 top-0 bottom-0 rounded-md bg-primary"
            ></div>
            <div
                class="absolute w-full top-0 bottom-0 rounded-md bg-black dark:bg-white bg-opacity-40"
            ></div>
            <div
                :style="`left: ${(value / max) * 100}%`"
                class="thumb absolute z-10 w-3 h-3 top-0 left-0 bg-black dark:bg-white rounded-full -mt-1 -ml-1.5"
            ></div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class Slider extends Vue {

    @Prop({ default: 0 })
    private value!: number;

    @Prop({ default: 100 })
    private max!: number;

    private get _value(): number {
        return this.value;
    }

    private input(event: Event): void {
        this.$emit('input', (event.target as HTMLInputElement).value);
    }

}
</script>

<style lang="scss" scoped>
* {
    transition: none;
    -moz-transition: none;
    -webkit-transition: none;
}

div.slider:not(:hover) {
    div.thumb {
        visibility: hidden;
    }

    div.track {
        background-color: rgba($color: #ffffff, $alpha: 0.4);
    }
}
</style>