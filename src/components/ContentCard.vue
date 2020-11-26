<template>
    <div
        @click="$emit('click')"
        class="transition-shadow cursor-pointer shadow rounded p-4 bg-accent-light dark:bg-accent-dark hover:shadow-xl"
    >
        <div class="shadow cover" :style="`background-image: url(${cover})`" />
        <div
            class="text-xl text-center font-bold truncate pt-4"
            v-text="title"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class ContentCard extends Vue {

    @Prop({ required: true })
    private readonly title!: string;

    @Prop({ required: true })
    private readonly cover!: string;

}
</script>

<style lang="scss" scoped>
div.cover {
    padding-bottom: 100%;
    background-size: cover;
    background-position: center;
}
</style>