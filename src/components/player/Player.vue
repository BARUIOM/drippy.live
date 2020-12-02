<template>
    <div class="flex flex-wrap w-full h-full select-none items-center">
        <div class="hidden md:flex md:w-2/12 items-center p-2">
            <Button @click="previous" class="m-2" size="2rem">
                <span class="mdi mdi-skip-previous mdi-24px" />
            </Button>
            <ToggleButton />
            <Button @click="next" class="m-2" size="2rem">
                <span class="mdi mdi-skip-next mdi-24px" />
            </Button>
        </div>
        <div
            v-if="breakpoints.$md"
            class="hidden md:flex w-6/12 h-full items-center"
        >
            <div class="pt-6 px-4 text-xs">
                <span
                    class="text-opacity-60 text-black dark:text-white"
                    v-text="Utils.format($player.position * 1000)"
                />
            </div>
            <div class="w-full">
                <div class="flex justify-between">
                    <div
                        class="truncate w-full"
                        v-text="$player.current.name"
                    />
                    <HyperLink
                        class="w-2/4 text-right"
                        :elements="Utils.map($player.current.artists, 'artist')"
                    />
                </div>

                <Slider
                    v-model="$player.position"
                    v-bind:max="$player.current.duration_ms / 1000"
                />
            </div>
            <div class="pt-6 px-4 text-xs">
                <span
                    class="text-opacity-60 text-black dark:text-white"
                    v-text="Utils.format($player.current.duration_ms)"
                />
            </div>
        </div>
        <div class="flex w-10/12 md:w-1/12 items-center">
            <div class="p-2">
                <Cover
                    size="56px"
                    class="shadow"
                    :url="$player.current.album.images[2].url"
                />
            </div>
            <div class="w-full md:hidden p-2">
                <div class="truncate font-bold" v-text="$player.current.name" />
                <HyperLink
                    :elements="Utils.map($player.current.artists, 'artist')"
                />
            </div>
            <div class="hidden md:flex flex-col p-1">
                <Button class="m-1" size="1.5rem">
                    <span class="mdi mdi-thumb-up" />
                </Button>
                <Button class="m-1" size="1.5rem">
                    <span class="mdi mdi-plus" />
                </Button>
            </div>
        </div>
        <div class="hidden md:flex md:w-3/12 justify-end p-2">
            <Button class="m-2" size="2rem">
                <span
                    class="mdi mdi-picture-in-picture-bottom-right mdi-24px"
                />
            </Button>
            <Button class="m-2" size="2rem">
                <span class="mdi mdi-repeat mdi-24px" />
            </Button>
            <Button class="m-2" size="2rem">
                <span class="mdi mdi-shuffle mdi-24px" />
            </Button>
            <Button class="m-2" size="2rem">
                <span
                    class="mdi mdi-24px"
                    v-bind:class="volume[$player.Volume]"
                />
            </Button>
        </div>
        <div class="w-2/12 md:hidden px-2">
            <ToggleButton class="float-right" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { State, Mode, Volume } from '@/modules/web-player';

import Track from '@/models/track'

import Cover from '@/components/Cover.vue'
import Slider from '@/components/Slider.vue'
import Button from '@/components/Button.vue'
import HyperLink from '@/components/HyperLink.vue'

import ToggleButton from '@/components/player/ToggleButton.vue'

@Component({
    components: { Cover, Slider, Button, HyperLink, ToggleButton }
})
export default class Player extends Vue {

    private readonly volume = {
        [Volume.Muted]: 'mdi-volume-mute',
        [Volume.VolumeLow]: 'mdi-volume-low',
        [Volume.VolumeMedium]: 'mdi-volume-medium',
        [Volume.VolumeHigh]: 'mdi-volume-high'
    };

    public mounted(): void {
        this.$player.on('update-time', () =>
            this.$forceUpdate()
        );
    }

    public previous(): void {
        this.$player.play(this.$player.previous());
    }

    public next(): void {
        this.$player.play(this.$player.next());
    }

}
</script>

<style lang="scss" scoped>
</style>