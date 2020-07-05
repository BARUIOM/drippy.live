<template>
    <div class="player row">
        <div class="col-3">
            <div class="flex justify-start items-center fit">
                <q-img class="q-ma-xs shadow-2" style="width: 64px" :src="track.artwork_url" />
                <div class="row q-px-sm">
                    <div class="col-12 text-weight-bold" v-text="track.title" />
                    <div class="col-12 text-grey" />
                </div>
            </div>
        </div>
        <div class="col-6">
            <div class="row q-pa-sm">
                <div class="col-2">
                    <q-btn class="float-left" icon="thumb_up" flat dense />
                </div>
                <div class="col-8 flex flex-center justify-evenly">
                    <q-btn size="sm" icon="repeat" flat dense />
                    <q-btn size="sm" icon="skip_previous" flat dense />
                    <q-btn icon="play_arrow" flat dense />
                    <q-btn size="sm" icon="skip_next" flat dense />
                    <q-btn size="sm" icon="shuffle" flat dense />
                </div>
                <div class="col-2">
                    <q-btn class="float-right" icon="playlist_add" flat dense />
                </div>
            </div>
            <div class="row">
                <div
                    class="col-1 text-center text-caption text-grey"
                    v-text="format($player.position)"
                />
                <div class="col-10">
                    <q-slider
                        v-model="$player.position"
                        v-bind:max="track.duration"
                        v-bind:min="0"
                        dense
                    />
                </div>
                <div
                    class="col-1 text-center text-caption text-grey"
                    v-text="format(track.duration)"
                />
            </div>
        </div>
        <div class="col-3">
            <div class="flex justify-end items-center fit q-gutter-x-lg">
                <q-btn icon="picture_in_picture_alt" flat dense />
                <q-btn icon="volume_up" flat dense />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class Player extends Vue {

    private track: Track = {
        duration: 0
    };

    mounted() {
        this.$player.on('update', () => this.$forceUpdate());
        this.$root.$on('metadata', (track: Track) => this.track = track);
    }

    format(seconds: number) {
        return new Date(Math.floor(seconds * 1000)).toLocaleTimeString()
            .replace(/[A-Z]/gi, '').trim().split(/:(.+)/, 2)[1];
    }
}

interface Track {

    title?: string;
    artists?: string[];
    duration: number;
    artwork_url?: string;

}
</script>

<style lang="scss" scoped>
div.player {
    min-height: 72px;
}
</style>