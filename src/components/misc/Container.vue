<template>
    <div class="w-full">
        <div class="flex flex-wrap sm:p-8 z-20">
            <div class="relative w-full sm:w-2/6 md:w-2/8 xl:w-1/6">
                <div
                    class="absolute fade w-full"
                    v-bind:class="{ hidden: breakpoints.$sm }"
                />
                <Cover
                    :url="thumbnail"
                    v-bind:class="{ 'shadow-xl': breakpoints.$sm }"
                    :responsiveness="responsiveness"
                />
            </div>
            <div class="w-full p-2 sm:p-4 sm:w-4/6 md:w-6/8 xl:w-5/6">
                <div
                    class="headline font-bold truncate text-center sm:text-left"
                    v-text="headline"
                />
                <slot name="subheader" />
            </div>
        </div>

        <slot />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import Cover from '@/components/Cover.vue'
import Utils from '@/modules/utils';

@Component({ components: { Cover } })
export default class Container extends Vue {

    @Prop({ required: true })
    private headline!: string;

    @Prop({ required: true })
    private thumbnail!: string;

    private responsiveness: number = 100;

    @Watch('breakpoints', { immediate: true, deep: true })
    private resize() {
        if (Utils.$breakpoints.$sm) {
            return this.responsiveness = 100;
        }

        this.responsiveness = 50;
    }

}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

div.headline {
    font-size: 6vw;
}

div.fade {
    padding-bottom: 50%;
    background-image: linear-gradient(to bottom, transparent, $dark);
}
</style>