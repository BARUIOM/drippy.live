<template>
    <div class="w-full">
        <div class="flex flex-wrap sm:p-8 z-20">
            <div class="w-full sm:w-2/6 md:w-2/8 xl:w-1/6">
                <Cover class="shadow-xl" :url="thumbnail" />
            </div>
            <div class="w-full p-4 sm:w-4/6 md:w-6/8 xl:w-5/6">
                <div class="headline font-bold truncate" v-text="headline" />
                <slot name="subheader" />
            </div>
        </div>

        <slot />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import Cover from '@/components/Cover.vue'

@Component({ components: { Cover } })
export default class Container extends Vue {

    @Prop({ required: true })
    private headline!: string;

    @Prop({ required: true })
    private thumbnail!: string;

    @Prop({ default: false })
    private fit!: boolean;

}
</script>

<style lang="scss" scoped>
div.headline {
    font-size: 4vw;
}
</style>