<template>
    <q-list padding>
        <template v-for="(item, index) in track_list">
            <q-item clickable v-ripple :key="index" @click="play(index)">
                <q-item-section avatar>
                    <q-icon name="music_note"></q-icon>
                </q-item-section>
                <q-item-section>
                    <q-item-label class="ellipsis" v-text="item.name"></q-item-label>
                    <q-item-label caption>
                        <ArtistHyperlink v-bind:artists="item.artists" />
                    </q-item-label>
                </q-item-section>
                <q-item-section avatar>
                    <q-avatar class="no-border-radius shadow-4">
                        <q-img :src="item.album.images[0].url" />
                    </q-avatar>
                </q-item-section>
            </q-item>
        </template>
    </q-list>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import ArtistHyperlink from '@/components/misc/ArtistHyperlink.vue'

@Component({ components: { ArtistHyperlink } })
export default class TrackList extends Vue {

    @Prop({ required: true })
    private track_list!: any[];

    play(index: number) {
        if (this.$player.playlist != this.track_list)
            this.$player.playlist = this.track_list;
        this.$player.play(index);
    }

}
</script>