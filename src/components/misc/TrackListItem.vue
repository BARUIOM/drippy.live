<template>
    <div
        @click="$emit('click')"
        @contextmenu.prevent="menu = true"
        class="item flex w-full cursor-pointer select-none hover:bg-opacity-10 hover:bg-black dark:hover:bg-white p-2"
        style="height: 64px"
    >
        <div class="flex w-10/12 md:w-6/12 h-full items-center">
            <div
                class="flex w-2/12 md:w-1/12 h-full justify-end items-center px-4"
            >
                <span class="mdi mdi-play mdi-24px" />
                <span v-text="index + 1" />
            </div>
            <div class="w-10/12 md:w-11/12">
                <div class="truncate" v-text="item.name" />
                <HyperLink :elements="Utils.map(item.artists, 'artist')" />
            </div>
        </div>
        <div class="hidden md:flex w-4/12 items-center">
            <HyperLink :elements="Utils.map([item.album], 'album')" />
        </div>
        <div class="flex w-2/12 justify-end items-center">
            <div class="menu-section mx-4">
                <Button size="2rem">
                    <span class="mdi mdi-dots-horizontal mdi-24px" />
                </Button>
            </div>
            <div class="hidden md:block mx-4">
                <span
                    class="text-opacity-40 text-black dark:text-white"
                    v-text="Utils.format(item.duration_ms)"
                />
            </div>
            <div>
                <Cover
                    class="shadow"
                    size="48px"
                    :url="item.album.images[2].url"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import Cover from '@/components/Cover.vue'
import Button from '@/components/Button.vue'
import HyperLink from '@/components/HyperLink.vue'

@Component({ components: { Cover, Button, HyperLink } })
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