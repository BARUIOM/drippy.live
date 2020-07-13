<template>
    <q-dialog
        v-model="visible"
        transition-show="slide-up"
        transition-hide="slide-down"
        persistent
        maximized
    >
        <q-card>
            <q-toolbar class="bg-dark">
                <q-btn icon="mdi-chevron-down" flat round dense v-close-popup />
                <q-toolbar-title>
                    <span class="text-weight-bold">Play Queue</span>
                </q-toolbar-title>
            </q-toolbar>
            <q-scroll-area>
                <TrackList v-bind:track_list="$player.playlist" v-bind:start="$player.index">
                    <template v-bind:slot="$player.index">
                        <div class="q-pa-md text-h6">Now playing</div>
                    </template>
                    <template v-bind:slot="$player.index + 1">
                        <div class="q-pa-md text-h6">Next</div>
                    </template>
                </TrackList>
            </q-scroll-area>
        </q-card>
    </q-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import TrackList from '@/components/misc/TrackList.vue'

@Component({ components: { TrackList } })
export default class Queue extends Vue {

    private visible: boolean = false;

    public mounted(): void {
        this.$player.on('playback-started', () => this.$forceUpdate());
    }

    public show(): void {
        this.visible = true;
    }

}
</script>

<style lang="scss" scoped>
.q-card {
    background-color: #121212;

    .q-toolbar {
        box-shadow: inherit;
    }

    .q-scrollarea {
        height: calc(100vh - 50px);
    }
}
</style>