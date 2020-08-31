<template>
    <q-list padding>
        <q-virtual-scroll
            scroll-target="#page-container > .scroll"
            :items="Object.freeze(filter(track_list))"
            :virtual-scroll-item-size="56"
        >
            <template v-slot="{ item, index }">
                <TrackListItem :key="index" v-bind:item="item" @click="play(index + start)">
                    <slot name="menu" v-bind:index="index" v-bind:item="item" />
                </TrackListItem>
            </template>
        </q-virtual-scroll>
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