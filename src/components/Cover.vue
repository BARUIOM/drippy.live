<template>
    <div
        v-if="url"
        class="cover"
        v-bind:class="{ responsive }"
        :style="`background-image: url(${url}); width: ${size}; height: ${size}`"
    />
    <div v-else class="relative shadow">
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

div.relative {
    padding-bottom: 100%;

    div.absolute {
        width: 100%;
        height: 100%;

        > span.mdi {
            font-size: 10vh;
        }
    }
}
</style>