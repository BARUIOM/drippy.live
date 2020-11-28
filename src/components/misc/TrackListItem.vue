<template>
    <div
        @click="$emit('click')"
        @contextmenu.prevent="menu = true"
        class="item flex w-full p-2 cursor-pointer select-none hover:bg-opacity-10 hover:bg-black dark:hover:bg-white"
        style="height: 64px"
    >
        <div class="relative w-20">
            <div
                class="absolute w-full h-full inline-flex justify-end items-center px-4"
            >
                <span class="mdi mdi-play mdi-24px"></span>
                <span v-text="index + 1" />
            </div>
        </div>
        <div class="w-3/4 md:w-2/4 m-auto">
            <div v-text="item.name" />
            <HyperLink :elements="Utils.map(item.artists, 'artist')" />
        </div>
        <div class="w-2/4 m-auto hidden md:block">
            <HyperLink :elements="Utils.map([item.album], 'album')" />
        </div>
        <div class="menu-section m-auto">
            <button
                class="w-8 mx-4 select-none leading-none align-middle rounded hover:bg-opacity-10 hover:bg-white"
            >
                <span class="mdi mdi-dots-horizontal mdi-24px"></span>
            </button>
        </div>
        <div class="m-auto hidden md:block">
            <span
                class="mx-4 text-opacity-40 text-black dark:text-white"
                v-text="Utils.format(item.duration_ms)"
            />
        </div>
        <div>
            <Cover
                class="shadow-md"
                width="48px"
                height="48px"
                :url="item.album.images[2].url"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import Cover from '@/components/Cover.vue'
import HyperLink from '@/components/HyperLink.vue'

@Component({ components: { Cover, HyperLink } })
export default class TrackListItem extends Vue {

    private menu: boolean = false;

    @Prop({ required: true })
    private readonly index!: number;

    @Prop({ required: true })
    private readonly item!: any;

    public copy(): void {
        navigator.clipboard.writeText(`${window.location.origin}/track/${this.item['id']}`).then(() => {
            //this.$q.notify({ type: 'positive', message: 'Track link copied to clipboard!', position: 'top' });
        });
    }

}
</script>

<style lang="scss" scoped>
div.item:not(:hover) {
    .mdi {
        display: none;
    }

    > .menu-section:not([active]) {
        visibility: hidden;
    }
}

div.item:hover {
    .mdi + span {
        display: none;
    }

    > .menu-section {
        visibility: visible;
    }
}
</style>