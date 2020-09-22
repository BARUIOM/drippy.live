<template>
    <div>
        <q-btn @click="repeat" :disable="!$player.state" flat dense>
            <q-icon v-bind:class="{ 'text-primary': $player.mode }" :name="mode[$player.mode]" />
        </q-btn>
        <q-btn @click="previous" :disable="!$player.state" flat dense>
            <q-icon name="mdi-skip-previous" />
        </q-btn>
        <ToggleButton />
        <q-btn @click="next" :disable="!$player.state" flat dense>
            <q-icon name="mdi-skip-next" />
        </q-btn>
        <q-btn @click="shuffle" :disable="!$player.state" flat dense>
            <q-icon
                v-bind:class="{ 'text-primary': $player.shuffle_mode }"
                :name="shuffle_mode[$player.shuffle_mode]"
            />
        </q-btn>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { Mode, ShuffleMode } from '@/modules/web-player';
import ToggleButton from '@/components/player/ToggleButton.vue'

@Component({ components: { ToggleButton } })
export default class Controls extends Vue {

    private readonly mode = {
        [Mode.RepeatNone]: 'mdi-repeat-off',
        [Mode.RepeatAll]: 'mdi-repeat',
        [Mode.RepeatOnce]: 'mdi-repeat-once'
    };

    private readonly shuffle_mode = {
        [ShuffleMode.ShuffleOff]: 'mdi-shuffle-disabled',
        [ShuffleMode.ShuffleOn]: 'mdi-shuffle'
    }

    private mounted(): void {
        this.$player.on('update-state', this.update);
    }

    private destroyed(): void {
        this.$player.off('update-state', this.update);
    }

    public repeat(): void {
        this.$player.repeat();
    }

    public shuffle(): void {
        this.$player.shuffle();
    }

    public previous(): void {
        this.$player.play(this.$player.index - 1);
    }

    public next(): void {
        this.$player.play(this.$player.index + 1);
    }

    private update(): void {
        this.$forceUpdate();
    }

}
</script>