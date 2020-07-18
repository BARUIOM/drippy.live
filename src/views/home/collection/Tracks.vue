<template>
    <Container
        headline="Liked Songs"
        v-bind:thumbnail="require('@/assets/thumb-up.png')"
        :fit="true"
    >
        <template v-slot:subheader>
            <div class="text-h6 text-grey" v-text="$user.profile.name" />
        </template>
        <TrackList v-bind:track_list="$user.collection.tracks" />
    </Container>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import Container from '@/components/misc/Container.vue'
import TrackList from '@/components/misc/TrackList.vue'

@Component({ components: { Container, TrackList } })
export default class Tracks extends Vue {

    public mounted(): void {
        this.$user.on('ready', () => this.$forceUpdate());
    }

}
</script>