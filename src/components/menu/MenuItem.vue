<template>
    <div
        @click="click"
        class="flex items-center text-sm h-8 px-4 py-2 hover:bg-opacity-10 hover:bg-black dark:hover:bg-white"
    >
        <slot />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class MenuItem extends Vue {

    private click(event: Event): void {
        const el = this.$el;
        this.$emit('click', event);
        el.parentElement?.blur();
    }

}
</script>