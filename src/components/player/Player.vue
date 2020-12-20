<template>
    <div>
        <div class="flex w-full h-full items-center">
            <div class="hidden md:flex items-center p-2">
                <Button @click="previous" class="mx-2">
                    <span class="mdi mdi-skip-previous mdi-24px" />
                </Button>
                <ToggleButton class="mx-2" />
                <Button @click="next" class="mx-2">
                    <span class="mdi mdi-skip-next mdi-24px" />
                </Button>
            </div>
            <div class="hidden md:block flex-1 min-w-0 px-4">
                <div class="m-auto w-4/5">
                    <div class="flex justify-between">
                        <div class="truncate" v-text="$player.current.name" />
                        <HyperLink
                            class="text-right"
                            :elements="
                                Utils.map($player.current.artists, 'artist')
                            "
                        />
                    </div>

                    <div class="flex items-center relative text-xs">
                        <div
                            class="absolute right-full text-opacity-60 text-black dark:text-white px-2"
                            v-text="Utils.format($player.position * 1000)"
                        />
                        <Slider
                            class="w-full"
                            v-model="$player.position"
                            v-bind:max="$player.current.duration_ms / 1000"
                        />
                        <div
                            class="absolute left-full text-opacity-60 text-black dark:text-white px-2"
                            v-text="Utils.format($player.current.duration_ms)"
                        />
                    </div>
                </div>
            </div>
            <div class="p-2 md:p-3">
                <Cover
                    size="48px"
                    class="shadow"
                    :url="Utils.get($player.current.album.images, 'small')"
                />
            </div>
            <div class="flex-1 md:hidden min-w-0 p-2">
                <div class="w-full">
                    <div
                        class="truncate font-bold"
                        v-text="$player.current.name"
                    />
                    <HyperLink
                        :elements="Utils.map($player.current.artists, 'artist')"
                    />
                </div>
            </div>
            <div class="hidden md:flex flex-col">
                <Button class="m-1">
                    <span class="mdi mdi-thumb-up" />
                </Button>
                <Button
                    class="m-1"
                    @click="$root.$emit('add', [$player.current])"
                >
                    <span class="mdi mdi-plus" />
                </Button>
            </div>
            <div class="hidden md:flex justify-end p-2">
                <Button class="m-2">
                    <span
                        class="mdi mdi-picture-in-picture-bottom-right mdi-24px"
                    />
                </Button>
                <Button class="m-2">
                    <span class="mdi mdi-repeat mdi-24px" />
                </Button>
                <Button class="m-2">
                    <span class="mdi mdi-shuffle mdi-24px" />
                </Button>
                <Button class="m-2">
                    <span
                        class="mdi mdi-24px"
                        v-bind:class="volume[$player.Volume]"
                    />
                </Button>
            </div>
            <div class="md:hidden px-2 z-10">
                <ToggleButton class="float-right" />
            </div>
        </div>
        <div
            class="mobile flex flex-col justify-between bg-main-light dark:bg-main-dark"
        >
            <div class="relative h-full">
                <Cover
                    size="100%"
                    :fade="true"
                    :url="Utils.get($player.current.album.images, 'large')"
                />
            </div>
            <div>
                <div class="relative mx-2 z-10">
                    <div
                        class="absolute w-full bottom-full flex justify-between"
                    >
                        <span
                            class="text-sm text-opacity-60 text-black dark:text-white"
                            v-text="Utils.format($player.position * 1000)"
                        />
                        <span
                            class="text-sm text-opacity-60 text-black dark:text-white"
                            v-text="Utils.format($player.current.duration_ms)"
                        />
                    </div>
                    <Slider
                        v-model="$player.position"
                        v-bind:max="$player.current.duration_ms / 1000"
                    />
                </div>
                <div class="flex items-center justify-around p-2">
                    <Button class="m-2">
                        <span class="mdi mdi-repeat mdi-24px" />
                    </Button>
                    <Button @click="previous">
                        <span class="mdi mdi-skip-previous mdi-24px" />
                    </Button>
                    <ToggleButton />
                    <Button @click="next">
                        <span class="mdi mdi-skip-next mdi-24px" />
                    </Button>
                    <Button class="m-2">
                        <span class="mdi mdi-shuffle mdi-24px" />
                    </Button>
                </div>
            </div>
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

    private mounted(): void {
        this.$player.on('update-time', () =>
            this.$forceUpdate()
        );
    }

    private previous(): void {
        this.$player.play(this.$player.previous());
    }

    private next(): void {
        this.$player.play(this.$player.next());
    }

}
</script>

<style lang="scss" scoped>
div.mobile {
    width: 100%;
    z-index: 100;
    position: absolute;
    height: calc(100vh - 64px);
}
</style>