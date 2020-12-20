<template>
    <div v-if="url" class="cover" :style="style" />
    <div v-else class="relative shadow" :style="`padding-bottom: 100%;`">
        <div class="absolute flex justify-center items-center">
            <span class="mdi mdi-image"></span>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class Cover extends Vue {

    @Prop({ required: true })
    private readonly url!: string;

    @Prop({ default: 'initial' })
    private readonly size!: string;

    @Prop({ default: false })
    private readonly fade!: boolean;

    private style: string = `padding-bottom: 100%; width: ${this.size}; height: ${this.size}; `;

    @Watch('url', { immediate: true })
    private loaded() {
        this.style += 'background-image: ';

        if (this.fade) {
            this.style += `linear-gradient(to bottom, transparent, var(--fade-color)), `;
        }

        this.style += `url("${this.url}");`;
    }

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