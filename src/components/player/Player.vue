<template>
    <div class="player row">
        <div @click="mobile" class="lt-md absolute fit"></div>
        <div class="col-xs-9 col-md-3">
            <div v-if="$player.state" class="flex no-wrap justify-start items-center fit">
                <q-img class="q-ma-xs shadow-2" :src="track.images[2].url" />
                <div class="row q-px-sm ellipsis">
                    <div class="col-12 text-weight-bold ellipsis" v-text="track.title" />
                    <div class="col-12 text-grey">
                        <ArtistHyperlink v-bind:artists="track.artists" />
                    </div>
                </div>
            </div>
        </div>
        <div class="gt-sm col-6">
            <div class="row q-pa-sm">
                <div class="col-2">
                    <q-btn class="float-left" :disable="!$player.state" flat dense>
                        <q-icon name="mdi-thumb-up-outline" />
                    </q-btn>
                </div>
                <div class="col-8">
                    <Controls class="flex flex-center justify-evenly" />
                </div>
                <div class="col-2">
                    <q-btn
                        @click="$root.$emit('add', [track])"
                        class="float-right"
                        :disable="!$player.state"
                        flat
                        dense
                    >
                        <q-icon name="mdi-playlist-plus" />
                    </q-btn>
                </div>
            </div>
            <SeekBar v-bind:duration="track.duration" />
        </div>
        <div class="gt-sm col-3">
            <div class="flex justify-end items-center fit q-gutter-x-lg">
                <q-btn :disable="!$player.state" @click="open" flat dense>
                    <q-icon name="mdi-playlist-music" />
                </q-btn>
                <q-btn :disable="!$player.state" @click="$player.display()" flat dense>
                    <q-icon name="mdi-picture-in-picture-bottom-right" />
                </q-btn>
                <q-btn :disable="!$player.state" flat dense>
                    <q-icon :name="volume[$player.Volume]" />
                    <q-menu>
                        <div class="q-py-md q-px-sm">
                            <q-slider v-model="$player.volume" reverse vertical dense />
                        </div>
                    </q-menu>
                </q-btn>
            </div>
        </div>
        <div class="lt-md col">
            <div class="row flex-center fit q-gutter-x-sm">
                <q-btn @click="mobile" flat dense>
                    <q-icon name="mdi-chevron-up"></q-icon>
                </q-btn>
                <ToggleButton />
            </div>
        </div>
        <Queue ref="queue" />
        <MobilePlayer ref="mobile" v-bind:track="track" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { State, Mode, Volume } from '@/modules/web-player';

import Track from '@/models/track'

import Queue from '@/components/player/Queue.vue'
import SeekBar from '@/components/player/SeekBar.vue'
import Controls from '@/components/player/Controls.vue'
import ToggleButton from '@/components/player/ToggleButton.vue'
import MobilePlayer from '@/components/player/MobilePlayer.vue'
import ArtistHyperlink from '@/components/misc/ArtistHyperlink.vue'

@Component({
    components: { Queue, SeekBar, Controls, ToggleButton, MobilePlayer, ArtistHyperlink }
})
export default class Player extends Vue {

    private track: Track = {} as Track;

    private readonly volume = {
        [Volume.Muted]: 'mdi-volume-mute',
        [Volume.VolumeLow]: 'mdi-volume-low',
        [Volume.VolumeMedium]: 'mdi-volume-medium',
        [Volume.VolumeHigh]: 'mdi-volume-high'
    };

    public mounted(): void {
        this.$player.on('playback-started', track => {
            this.track = {
                id: track['id'],
                title: track['name'],
                album: track['album'],
                artists: track['artists'],
                duration: track['duration_ms'] / 1000,
                images: track['album'].images
            } as Track;
        });
    }

    public shuffle(): void {
        const playlist = this.$player.playlist.map(a => ({ sort: Math.random(), value: a }))
            .sort((a, b) => a.sort - b.sort).map(a => a.value);
        this.$player.playlist = playlist;
        this.$player.play(0);
    }

    private open() {
        (this.$refs['queue'] as Queue).show();
    }

    private mobile() {
        (this.$refs['mobile'] as MobilePlayer).show();
    }

}
</script>

<style lang="scss" scoped>
div.player {
    min-height: 72px;
    max-height: 72px;

    .q-img {
        z-index: -1;
        min-width: 64px;
        max-width: 64px;
    }
}
</style>