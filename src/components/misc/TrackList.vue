<template>
    <q-list padding>
        <template v-for="(item, index) in track_list">
            <TrackListItem :key="index" v-bind:item="item" @click="play(index)" />
        </template>
    </q-list>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import TrackListItem from '@/components/misc/TrackListItem.vue'

@Component({ components: { TrackListItem } })
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