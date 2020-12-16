<template>
    <div>
        <template v-for="(item, index) in Object.freeze(filter(track_list))">
            <TrackListItem
                :key="index"
                :item="item"
                :index="index"
                :album="album"
                @click="play(index + start)"
            >
            </TrackListItem>
        </template>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import TrackListItem from '@/components/misc/TrackListItem.vue'

import { Reason } from '@/modules/web-player'

@Component({ components: { TrackListItem } })
export default class TrackList extends Vue {

    @Prop({ required: true })
    private track_list!: any[];

    @Prop({ default: 0 })
    private start!: number;

    @Prop({ default: false })
    private readonly album!: boolean;

    private play(index: number): void {
        if (this.$player.playlist != this.track_list)
            this.$player.playlist = this.track_list;
        this.$player.play(index, Reason.UserAction);
    }

    private filter(array: any[]): any[] {
        return array.filter((e, i) => i > this.start - 1);
    }

}
</script>

<style lang="scss" scoped>
div.queue {
    ~ .q-item {
        transition: opacity 0.2s linear;
    }

    ~ .q-item:not(:hover) {
        opacity: 0.4;
    }
}
</style>