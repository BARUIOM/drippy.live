<template>
    <div class="player row">
        <div class="col-3">
            <div class="flex justify-start items-center fit">
                <q-img class="q-ma-xs shadow-2" style="width: 64px"></q-img>
                <div class="row">
                    <div class="col-12 text-weight-bold"></div>
                    <div class="col-12 text-grey"></div>
                </div>
            </div>
        </div>
        <div class="col-6">
            <div class="row q-pa-sm">
                <div class="col-2">
                    <q-btn class="float-left" icon="thumb_up" flat dense></q-btn>
                </div>
                <div class="col-8 flex flex-center justify-evenly">
                    <q-btn size="sm" icon="repeat" flat dense></q-btn>
                    <q-btn size="sm" icon="skip_previous" flat dense></q-btn>
                    <q-btn icon="play_arrow" flat dense></q-btn>
                    <q-btn size="sm" icon="skip_next" flat dense></q-btn>
                    <q-btn size="sm" icon="shuffle" flat dense></q-btn>
                </div>
                <div class="col-2">
                    <q-btn class="float-right" icon="playlist_add" flat dense></q-btn>
                </div>
            </div>
            <div class="row">
                <div class="col-1 text-center text-caption text-grey">00:00</div>
                <div class="col-10">
                    <q-slider v-model="position" :min="0" :max="100" dense></q-slider>
                </div>
                <div class="col-1 text-center text-caption text-grey">00:00</div>
            </div>
        </div>
        <div class="col-3">
            <div class="flex justify-end items-center fit q-gutter-x-lg">
                <q-btn icon="picture_in_picture_alt" flat dense></q-btn>
                <q-btn icon="volume_up" flat dense></q-btn>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class Player extends Vue {

    private position: number = 0;

}
</script>

<style lang="scss" scoped>
div.player {
    min-height: 72px;
}
</style>