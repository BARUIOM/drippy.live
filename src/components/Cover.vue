<template>
    <div
        v-if="url"
        class="cover"
        :style="`background-image: url(${url}); padding-bottom: ${responsiveness}%; width: ${size}; height: ${size}`"
    />
    <div
        v-else
        class="relative shadow"
        :style="`padding-bottom: ${responsiveness}%;`"
    >
        <div class="absolute flex justify-center items-center">
            <span class="mdi mdi-image"></span>
        </div>
    </div>
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

    @Prop({ default: 100 })
    private readonly responsiveness!: number;

}
</script>

<style lang="scss" scoped>
div.cover {
    background-size: cover;
    background-position: center;
}

div.relative > div.absolute {
    width: 100%;
    height: 100%;

    > span.mdi {
        font-size: 10vh;
    }
}
</style>