<template>
    <div class="slider flex items-center relative">
        <input
            type="range"
            @input.stop="input"
            v-bind:value="value"
            v-bind:max="max"
            class="absolute appearance-none z-20 h-full w-full opacity-0 cursor-pointer"
        />
        <div class="relative">
            <div
                :style="`width: ${(value / max) * 100}%`"
                class="track absolute z-10 top-0 bottom-0 rounded-md bg-primary"
            ></div>
            <div
                class="absolute w-full top-0 bottom-0 rounded-md bg-black dark:bg-white bg-opacity-40"
            ></div>
            <div
                :style="`left: ${(value / max) * 100}%`"
                class="thumb shadow absolute z-10 top-0 left-0 bg-black dark:bg-white rounded-full"
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

div.slider {
    height: 24px;

    > div.relative {
        width: 100%;
        height: 4px;

        div.thumb {
            width: 12px;
            height: 12px;
            margin: -4px 0 0 -4px;
        }
    }
}

div.slider:not(:hover) {
    > div.relative {
        div.thumb {
            visibility: hidden;
        }

        div.track {
            background-color: rgba($color: #ffffff, $alpha: 0.4);
        }
    }
}
</style>