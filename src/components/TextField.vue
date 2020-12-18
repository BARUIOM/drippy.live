<template>
    <div
        class="h-10 bg-opacity-10 bg-black dark:bg-white"
        v-bind:class="{ 'rounded-full': rounded, rounded: !rounded }"
    >
        <input
            ref="input"
            type="text"
            @blur.stop="onblur"
            @focus.stop="onfocus"
            @input.stop="oninput"
            v-bind:value="value"
            placeholder="Search for artists, tracks or playlists"
            class="w-full h-full px-4 bg-transparent focus:outline-none"
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

    private oninput(event: Event): void {
        this.$emit('input', (event.target as HTMLInputElement).value);
    }

    private onfocus(event: Event): void {
        this.$emit('focus', event);
    }

    private onblur(event: Event): void {
        this.$emit('blur', event);
    }

    public focus(): void {
        const element = this.$refs['input'] as HTMLElement;
        return element.focus();
    }

}
</script>