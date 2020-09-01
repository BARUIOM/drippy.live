<template>
    <div class="row q-gutter-x-md no-wrap non-selectable">
        <div class="text-center text-caption text-grey" v-text="format($player.position)" />
        <div class="fit">
            <q-slider
                :disable="!$player.state"
                v-model="$player.position"
                v-bind:max="duration"
                v-bind:min="0"
                dense
            />
        </div>
        <div class="text-center text-caption text-grey" v-text="format(duration)" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class SeekBar extends Vue {

    @Prop({ required: true })
    private duration!: number;

    private mounted(): void {
        this.$player.on('update-time', this.update);
    }

    private destroyed(): void {
        this.$player.off('update-time', this.update);
    }

    private format(seconds: number): string {
        return new Date(Math.floor(seconds * 1000)).toLocaleTimeString()
            .replace(/[A-Z]/gi, '').trim().split(/:(.+)/, 2)[1];
    }

    private update(): void {
        this.$forceUpdate();
    }

}
</script>