<template>
    <button
        @click="$emit('click')"
        class="select-none leading-none rounded focus:outline-none hover:bg-opacity-10 hover:bg-black dark:hover:bg-white"
        :style="`width: ${width || size}; height: ${height || size};`"
    >
        <div>
            <slot />
        </div>
    </button>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class Button extends Vue {

    @Prop()
    private readonly width!: string;

    @Prop()
    private readonly height!: string;

    @Prop({ default: 'initial' })
    private readonly size!: string;

}
</script>