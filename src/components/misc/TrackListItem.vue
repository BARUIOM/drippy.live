<template>
    <q-item clickable v-ripple @click="$emit('click')" @contextmenu.prevent="menu = true">
        <q-item-section avatar>
            <q-icon name="mdi-music-note"></q-icon>
        </q-item-section>
        <q-item-section>
            <q-item-label class="ellipsis" v-text="item.name"></q-item-label>
            <q-item-label caption>
                <ArtistHyperlink class="text-grey" v-bind:artists="item.artists" />
            </q-item-label>
        </q-item-section>
        <q-item-section class="menu-section" :active="menu" avatar>
            <q-btn icon="mdi-dots-horizontal" @click.stop="menu = !menu" flat dense></q-btn>
            <q-menu v-model="menu" transition-show="jump-down" transition-hide="jump-up" auto-close>
                <q-list padding dense>
                    <q-item clickable>
                        <q-item-section>Add track to playlist</q-item-section>
                    </q-item>
                    <q-item @click="copy" clickable>
                        <q-item-section>Copy track link</q-item-section>
                    </q-item>
                </q-list>
            </q-menu>
        </q-item-section>
        <q-item-section avatar>
            <q-avatar class="no-border-radius shadow-4">
                <q-img :src="item.album.images[0].url" />
            </q-avatar>
        </q-item-section>
    </q-item>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import ArtistHyperlink from '@/components/misc/ArtistHyperlink.vue'

@Component({ components: { ArtistHyperlink } })
export default class TrackListItem extends Vue {

    private menu: boolean = false;

    @Prop({ required: true })
    private readonly item!: any;

    public copy(): void {
        navigator.clipboard.writeText(`${window.location.origin}/track/${this.item['id']}`).then(() => {
            this.$q.notify({ type: 'positive', message: 'Track link copied to clipboard!', position: 'top' });
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