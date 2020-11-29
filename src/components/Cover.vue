<template>
    <div
        class="cover"
        v-bind:class="{ responsive }"
        :style="`background-image: url(${url}); width: ${size}; height: ${size}`"
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
    private readonly size!: string;

    @Prop({ default: false })
    private readonly responsive!: boolean;

}
</script>

<style lang="scss" scoped>
div.cover {
    background-size: cover;
    background-position: center;
}

div.responsive {
    padding-bottom: 100%;
}
</style>