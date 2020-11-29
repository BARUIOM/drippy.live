<template>
    <button
        @click="$emit('click')"
        class="select-none leading-none align-middle rounded focus:outline-none hover:bg-opacity-10 hover:bg-black dark:hover:bg-white"
    >
        <div>
            <slot />
        </div>
    </button>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Button extends Vue {

}
</script>

<style lang="scss" scoped>
div > span {
    display: inline-block;
    height: 100%;
}
</style>