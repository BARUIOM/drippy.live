<template>
    <div v-if="artists && artists.length" class="w-full">
        <div class="p-2 text-xl font-bold">Artists</div>
        <div class="relative flex flex-wrap">
            <div class="indicator left-0" @click="previous">
                <span class="mdi mdi-chevron-left mdi-24px"></span>
            </div>
            <template v-for="(artist, i) in array">
                <div :key="i" class="p-2 w-full sm:w-1/2 lg:w-1/3">
                    <div
                        @click="$emit('click', artist)"
                        class="card relative transition-shadow duration-300 shadow hover:shadow-lg cursor-pointer rounded"
                    >
                        <Cover
                            class="cover shadow rounded"
                            :url="artist.images[0].url"
                            :responsive="true"
                        />
                        <div
                            class="absolute label h-10 rounded-b text-white font-bold p-2"
                        >
                            <span v-text="artist.name"></span>
                        </div>
                    </div>
                </div>
            </template>
            <div class="indicator right-0" @click="next">
                <span class="mdi mdi-chevron-right mdi-24px"></span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import Utils from '@/modules/utils'
import Cover from '@/components/Cover.vue'

@Component({ components: { Cover } })
export default class Artists extends Vue {

    @Prop({ default: 5000 })
    private readonly timeout!: number;

    private array: any[] = [];
    private artists: any[][] = [];

    private size: number = 1;
    private callback: number = 0;
    private position: number = 0;

    private advance(): void {
        clearTimeout(this.callback);
        this.array = this.artists[this.position].flat();
        this.callback = setTimeout(() => this.next(), this.timeout);
    }

    private next(): void {
        this.position++;

        if (this.position >= this.artists.length) {
            this.position = 0;
        }

        this.advance();
    }

    private previous(): void {
        this.position--;

        if (this.position < 0) {
            this.position = this.artists.length - 1;
        }

        this.advance();
    }

    @Watch('breakpoints', { immediate: true, deep: true })
    private resize(): void {
        const item = (() => {
            if (this.artists.length) {
                return this.artists[this.position][0];
            }
        })();

        this.size = 1;
        this.artists = [];

        if (Utils.$breakpoints.$sm) {
            this.size = 2;
        }

        if (Utils.$breakpoints.$lg) {
            this.size = 3;
        }

        const length = this.$user.collection.following.length;
        const collection = this.$user.collection.following;

        for (let i = 1; i <= length; i++) {
            if (i % this.size === 0) {
                this.artists.push(collection.splice(0, this.size));
                continue;
            }

            if (collection.length && collection.length <= this.size) {
                this.artists.push(collection.splice(0));
            }
        }

        if (item !== undefined) {
            const array = this.artists.find(e => e.includes(item));
            if (array !== undefined) {
                this.position = this.artists.indexOf(array);
            }
        }

        this.advance();
    }

}
</script>

<style lang="scss" scoped>
div.card {
    > div.label {
        bottom: 0;
        width: 100%;
        text-align: center;
        background-color: rgba($color: #000000, $alpha: 0.6);
    }

    > div.cover {
        padding-bottom: 16rem;
        -webkit-transition: background-image 0.4s ease-in-out;
        transition: background-image 0.4s ease-in-out;
    }
}

div.indicator {
    z-index: 10;
    width: 4rem;
    height: 100%;
    display: flex;
    cursor: pointer;
    position: absolute;
    align-items: center;
    justify-content: center;
}
</style>