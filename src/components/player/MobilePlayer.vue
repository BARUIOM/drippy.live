<template>
    <q-dialog
        v-model="visible"
        transition-show="slide-up"
        transition-hide="slide-down"
        persistent
        maximized
    >
        <q-layout v-if="visible" class="background" container>
            <q-header class="bg-transparent">
                <q-toolbar>
                    <q-btn class="fit" @click="visible = false" flat dense>
                        <q-icon name="mdi-chevron-down" />
                    </q-btn>
                </q-toolbar>
            </q-header>

            <q-page-container class="window-width window-height">
                <div class="row fit">
                    <div class="col-12">
                        <q-img :src="track.images[0].url">
                            <div class="artwork absolute-full" />
                        </q-img>
                    </div>
                    <div class="col-12">
                        <div class="row flex-center fit non-selectable">
                            <div
                                class="col-12 text-center text-weight-bold ellipsis"
                                v-text="track.title"
                            />
                            <div class="col-12 text-center text-grey">
                                <ArtistHyperlink v-bind:artists="track.artists" />
                            </div>
                            <div class="col-12 text-center text-grey" v-text="track.album.name" />
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="row items-end fit">
                            <div class="col-12 q-px-md">
                                <SeekBar v-bind:duration="track.duration" />
                            </div>
                            <div class="col-12">
                                <Controls class="row flex-center justify-between q-pa-md" />
                            </div>
                        </div>
                    </div>
                </div>
            </q-page-container>
        </q-layout>
    </q-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Watch, Prop } from 'vue-property-decorator'

import SeekBar from '@/components/player/SeekBar.vue'
import Controls from '@/components/player/Controls.vue'
import ArtistHyperlink from '@/components/misc/ArtistHyperlink.vue'

import Track from '@/models/track'

@Component({ components: { SeekBar, Controls, ArtistHyperlink } })
export default class MobilePlayer extends Vue {

    @Prop({ required: true })
    private track!: Track;

    private visible: boolean = false;

    public show(): void {
        this.visible = true;
    }

    @Watch('$route', { immediate: true, deep: true })
    private change(): void {
        this.visible = false;
    }

}
</script>

<style lang="scss" scoped>
.background {
    background-color: #121212;
}

.q-page-container {
    padding-top: 0px !important;

    div.artwork {
        background-image: linear-gradient(to bottom, transparent, #121212);
    }
}
</style>