<template>
    <div
        @click="$emit('click')"
        class="card transition-shadow duration-300 cursor-pointer rounded p-4 bg-accent-light dark:bg-accent-dark"
    >
        <Cover class="shadow" :url="cover" />
        <div
            class="text-xl text-center font-bold truncate pt-4"
            v-text="title"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import Cover from '@/components/Cover.vue'

@Component({ components: { Cover } })
export default class ContentCard extends Vue {

    @Prop({ required: true })
    private readonly title!: string;

    @Prop({ required: true })
    private readonly cover!: string;

}
</script>

<style lang="scss" scoped>
$shadow-1: rgba(
    $color: #000000,
    $alpha: 0.2,
);
$shadow-2: rgba(
    $color: #000000,
    $alpha: 0.14,
);
$shadow-3: rgba(
    $color: #000000,
    $alpha: 0.12,
);

div.card:not(:hover) {
    box-shadow: 0 1px 5px $shadow-1, 0 2px 2px $shadow-2,
        0 3px 1px -2px $shadow-3;
}

div.card:hover {
    box-shadow: 0 1px 10px $shadow-1, 0 2px 20px $shadow-2,
        0 3px 10px -2px $shadow-3;
}
</style>