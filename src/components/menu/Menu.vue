<template>
    <transition name="menu">
        <div
            tabindex="0"
            v-if="visible"
            class="outline-none bg-accent-light dark:bg-accent-dark py-2"
            @blur="visible = false"
        >
            <slot />
        </div>
    </transition>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Menu extends Vue {

    private visible: boolean = false;

    public toggle(): void {
        if (!this.visible) {
            this.visible = true;
            return this.$nextTick(() =>
                (this.$el as HTMLElement).focus()
            );
        }

        (this.$el as HTMLElement).blur();
    }

}
</script>

<style lang="scss" scoped>
div[tabindex="0"] {
    width: max-content;
}

.menu-enter-active,
.menu-leave-active {
    transition: opacity 300ms, transform 300ms;
}

.menu-enter,
.menu-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>