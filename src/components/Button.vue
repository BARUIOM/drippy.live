<template>
    <button
        :type="type"
        @click="$emit('click')"
        class="select-none leading-none rounded focus:outline-none hover:bg-opacity-10 hover:bg-black dark:hover:bg-white"
    >
        <div class="flex items-center justify-center uppercase font-bold p-1">
            <slot />
        </div>
    </button>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class Button extends Vue {

    @Prop({ default: 'button' })
    private readonly type!: string;

}
</script>