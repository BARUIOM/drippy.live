<template>
    <q-list padding>
        <template v-for="(item, i) in filter(track_list)">
            <slot v-bind:name="i" />
            <TrackListItem :key="i" v-bind:item="item" @click="play(i + start)">
                <slot name="menu" v-bind:index="i" v-bind:item="item" />
            </TrackListItem>
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