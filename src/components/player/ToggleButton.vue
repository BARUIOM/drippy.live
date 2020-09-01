<template>
    <q-btn @click="toggle" :disable="!$player.state" flat dense>
        <q-icon :name="state[$player.state]" />
    </q-btn>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { State } from '@/modules/web-player'

@Component
export default class ToggleButton extends Vue {

    private readonly state = {
        [State.Idle]: 'mdi-play-outline',
        [State.Playing]: 'mdi-pause',
        [State.Paused]: 'mdi-play'
    };

    private mounted(): void {
        this.$player.on('update-state', this.update);
    }

    private destroyed(): void {
        this.$player.off('update-state', this.update);
    }

    private toggle(): void {
        this.$player.toggle();
    }

    private update(): void {
        this.$forceUpdate();
    }

}
</script>