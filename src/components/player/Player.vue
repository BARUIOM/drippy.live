<template>
    <div class="player row">
        <div class="col-3">
            <div class="flex no-wrap justify-start items-center fit">
                <q-img class="q-ma-xs shadow-2" :src="track.artwork_url" />
                <div class="row q-px-sm ellipsis">
                    <div class="col-12 text-weight-bold ellipsis" v-text="track.title" />
                    <div class="col-12 text-grey">
                        <ArtistHyperlink v-bind:artists="track.artists" />
                    </div>
                </div>
            </div>
        </div>
        <div class="col-6">
            <div class="row q-pa-sm">
                <div class="col-2">
                    <q-btn class="float-left" icon="mdi-thumb-up-outline" flat dense />
                </div>
                <div class="col-8 flex flex-center justify-evenly">
                    <q-btn @click="$player.repeat()" size="sm" flat dense>
                        <q-icon
                            v-bind:class="{ 'text-primary': $player.mode }"
                            :name="mode[$player.mode]"
                        />
                    </q-btn>
                    <q-btn @click="$player.play($player.index - 1)" size="sm" flat dense>
                        <q-icon name="mdi-skip-previous" />
                    </q-btn>
                    <q-btn @click="$player.toggle()" flat dense>
                        <q-icon :name="state[$player.state]" />
                    </q-btn>
                    <q-btn @click="$player.play($player.index + 1)" size="sm" flat dense>
                        <q-icon name="mdi-skip-next" />
                    </q-btn>
                    <q-btn @click="shuffle" size="sm" flat dense>
                        <q-icon name="mdi-shuffle" />
                    </q-btn>
                </div>
                <div class="col-2">
                    <q-btn class="float-right" icon="mdi-playlist-plus" flat dense />
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
                <q-btn icon="mdi-picture-in-picture-bottom-right" flat dense />
                <q-btn icon="mdi-volume-high" flat dense />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { State, Mode } from '@/modules/web-player';

import Track from '@/models/track'
import ArtistHyperlink from '@/components/misc/ArtistHyperlink.vue'

@Component({ components: { ArtistHyperlink } })
export default class Player extends Vue {

    private track: Track = {} as Track;

    private readonly state = {
        [State.Playing]: 'mdi-pause',
        [State.Paused]: 'mdi-play'
    };

    private readonly mode = {
        [Mode.RepeatNone]: 'mdi-repeat-off',
        [Mode.RepeatAll]: 'mdi-repeat',
        [Mode.RepeatOnce]: 'mdi-repeat-once'
    };

    public mounted(): void {
        this.$player.on('update', () => this.$forceUpdate());
        this.$player.on('playback-started', track => {
            this.track = {
                title: track['name'],
                artists: track['artists'],
                duration: track['duration_ms'] / 1000,
                artwork_url: track['album'].images[2].url
            } as Track;
        });
    }

    public format(seconds: number): string {
        return new Date(Math.floor(seconds * 1000)).toLocaleTimeString()
            .replace(/[A-Z]/gi, '').trim().split(/:(.+)/, 2)[1];
    }

    public shuffle(): void {
        const playlist = this.$player.playlist.map(a => ({ sort: Math.random(), value: a }))
            .sort((a, b) => a.sort - b.sort).map(a => a.value);
        this.$player.playlist = playlist;
        this.$player.play(0);
    }

}
</script>

<style lang="scss" scoped>
div.player {
    min-height: 72px;

    .q-img {
        min-width: 64px;
        max-width: 64px;
    }
}
</style>