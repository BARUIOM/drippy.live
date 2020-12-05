<template>
    <div
        v-bind:class="{ 'rounded-full': rounded, rounded: !rounded }"
        class="flex items-center justify-between h-10 bg-opacity-10 bg-black dark:bg-white"
    >
        <div class="px-4">
            <slot />
        </div>
        <input
            type="text"
            @input.stop="input"
            v-bind:value="value"
            placeholder="Search for artists, tracks or playlists"
            class="bg-transparent focus:outline-none"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class TextField extends Vue {

    @Prop({ default: '' })
    private value!: string;

    @Prop({ default: false })
    private readonly rounded!: boolean;

    private input(event: Event): void {
        this.$emit('input', (event.target as HTMLInputElement).value);
    }

}
</script>

<style lang="scss" scoped>
div > input {
    width: 100%;
    height: 100%;
    line-height: 40px;
    padding: 1px 16px 4px 0;
}
</style>