<template>
    <div
        @click="$emit('click')"
        @contextmenu.prevent="menu = true"
        class="flex w-full p-2 cursor-pointer select-none hover:bg-opacity-10 hover:bg-white"
        style="height: 64px"
    >
        <div class="w-20 m-auto">
            <span class="mx-4 float-right" v-text="index + 1" />
        </div>
        <div class="w-full md:w-2/4 m-auto">
            <div v-text="item.name" />
            <div
                class="text-opacity-30 text-white"
                v-text="item.artists[0].name"
            />
        </div>
        <div class="w-2/4 m-auto hidden md:block">
            <span v-text="item.album.name" />
        </div>
        <div class="m-auto hidden md:block">
            <span class="mx-4" v-text="Utils.format(item.duration_ms)" />
        </div>
        <div>
            <Cover width="48px" height="48px" :url="item.album.images[2].url" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import Cover from '@/components/Cover.vue'
//import ArtistHyperlink from '@/components/misc/ArtistHyperlink.vue'

@Component({ components: { Cover } })
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
.q-item:hover > .menu-section {
    visibility: visible;
}

.q-item:not(:hover) > .menu-section:not([active]) {
    visibility: hidden;
}
</style>