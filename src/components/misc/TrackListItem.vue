<template>
    <div
        @click="$emit('click')"
        @contextmenu.prevent="menu = true"
        class="item cursor-pointer w-full h-16 hover:bg-opacity-10 hover:bg-black dark:hover:bg-white"
    >
        <div class="flex items-center h-full select-none p-2">
            <div class="flex items-center justify-center w-8 h-full mx-2">
                <span class="mdi mdi-play mdi-24px" />
                <span v-text="index + 1" />
            </div>
            <div v-if="!album" class="mx-2">
                <Cover
                    class="shadow"
                    size="48px"
                    :url="Utils.get(item.album.images, 'small')"
                />
            </div>
            <div class="flex-1 min-w-0">
                <div class="truncate" v-text="item.name" />
                <HyperLink :elements="Utils.map(item.artists, 'artist')" />
            </div>
            <div v-if="!album" class="hidden md:block flex-1 min-w-0">
                <HyperLink :elements="Utils.map([item.album], 'album')" />
            </div>
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

    @Prop({ default: false })
    private readonly album!: boolean;

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