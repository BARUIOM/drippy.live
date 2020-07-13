<template>
    <q-list padding>
        <template v-for="(item, i) in track_list">
            <slot v-bind:name="i" />
            <div v-if="i >= start" :key="i">
                <TrackListItem v-bind:item="item" @click="play(i)" />
            </div>
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

    @Prop({ default: 0 })
    private start!: number;

    private play(index: number): void {
        if (this.$player.playlist != this.track_list)
            this.$player.playlist = this.track_list;
        this.$player.play(index);
    }

}
</script>