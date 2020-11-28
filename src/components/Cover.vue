<template>
    <div
        class="cover"
        :style="`background-image: url(${url}); width: ${width}; height: ${height}`"
    />
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class Cover extends Vue {

    @Prop({ required: true })
    private readonly url!: string;

    @Prop({ default: 'initial' })
    private readonly width!: string;

    @Prop({ default: 'initial' })
    private readonly height!: string;

}
</script>

<style lang="scss" scoped>
div.cover {
    padding-bottom: 100%;
    background-size: cover;
    background-position: center;
}
</style>