<template>
    <Container v-bind:headline="name" v-bind:thumbnail="artwork" :fit="true">
        <template v-slot:actions>
            <q-btn icon="favorite" flat />
            <q-btn icon="more_horiz" flat />
        </template>
        <template v-slot:subheader>
            <ArtistHyperlink
                class="text-h6 text-grey"
                v-bind:artists="artists"
                :spacer="true"
                separator="•"
            />
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
import ArtistHyperlink from '@/components/misc/ArtistHyperlink.vue'

@Component({ components: { Container, TrackList, ArtistHyperlink } })
export default class Album extends Vue {

    private name: string = '';
    private artists: any[] = [];
    private track_list: any[] = [];
    private artwork: string = '';

    public async load(id: string): Promise<void> {
        const album = await this.$drippy.getAlbum(id);
        this.name = album.name;
        this.artists = [...album.artists];
        this.track_list = [...album.tracks.items];
        this.artwork = album.images[0].url;
    }

    public async mounted() {
        await this.load(this.$route.params["id"]);
        if (this.$route.query['highlight']) {
            const track = this.track_list.find(e => e['id'] === this.$route.query['highlight']);
            if (this.$player.playlist != this.track_list)
                this.$player.playlist = this.track_list;

            this.$player.play(this.track_list.indexOf(track));
            this.$router.replace({});
        }
    }

}
</script>