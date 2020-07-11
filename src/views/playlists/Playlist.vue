<template>
    <Container v-bind:headline="name" v-bind:thumbnail="artwork" :fit="true">
        <template v-slot:actions>
            <q-btn v-if="$user.profile.id !== author.id" icon="favorite" flat />
            <q-btn icon="more_horiz" flat />
        </template>
        <template v-slot:subheader>
            <div class="text-h6 text-grey" v-text="author.name" />
        </template>
        <TrackList v-bind:track_list="track_list" />
    </Container>
</template>

<script lang="ts">
import Vue from 'vue'
import { Route } from 'vue-router'
import { Component, Watch } from 'vue-property-decorator'

import Container from '@/components/misc/Container.vue'
import TrackList from '@/components/misc/TrackList.vue'

@Component({ components: { Container, TrackList } })
export default class Playlist extends Vue {

    private name: string = '';
    private author: Author = {};
    private track_list: any[] = [];
    private artwork: string = '';

    public async load(id: string): Promise<void> {
        const playlist = await this.$drippy.getPlaylist(id);
        this.name = playlist.name;
        this.author = {
            id: playlist.owner.id,
            name: playlist.owner.display_name
        };
        this.track_list = [...playlist.tracks.items.map((e: any) => e.track)];
        this.artwork = playlist.images[0].url;
    }

    public async mounted(): Promise<void> {
        await this.load(this.$route.params["id"]);
    }

    @Watch('$route', { immediate: true, deep: true })
    private async change(route: Route): Promise<void> {
        await this.load(route.params['id']);
    }

}

interface Author {

    id?: string;
    name?: string;

}
</script>