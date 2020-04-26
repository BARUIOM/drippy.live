<template>
    <v-container fluid>
        <v-form @submit.prevent="doSearch">
            <v-text-field
                v-model="search_input"
                label="Search"
                color="orange"
                prepend-inner-icon="mdi-magnify"
                solo
                clearable
                required
            ></v-text-field>
        </v-form>

        <div class="mb-1">
            <v-row dense align="center" justify="start">
                <v-col v-for="(artist, i) in artist_list" :key="i" cols="12">
                    <v-card link :to="{ name: 'artist', params: { id: artist.id } }">
                        <v-container class="d-flex flex-no-wrap" fluid>
                            <v-row align="center" justify="center" class="mx-2">
                                <v-avatar size="80" tile>
                                    <v-img :src="artist.picture"></v-img>
                                </v-avatar>

                                <div>
                                    <v-card-title class="headline" v-text="artist.name"></v-card-title>
                                    <v-card-subtitle>Artist</v-card-subtitle>
                                </div>

                                <v-spacer></v-spacer>
                                <v-icon size="40">mdi-chevron-right</v-icon>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-col>
            </v-row>
        </div>

        <div class="results-large">
            <SongTable v-bind:song_list="track_list" @selected-track="play" />
        </div>
        <div class="results-small">
            <SongList v-bind:song_list="track_list" @selected-track="play" />
        </div>
    </v-container>
</template>

<script>
import drippy from '../plugins/drippy.js'

import SongList from "./SongList";
import SongTable from "./SongTable";

export default {
    name: 'Search',
    components: { SongList, SongTable },
    data: () => ({
        track_list: [],
        artist_list: [],
        search_input: ''
    }),
    mounted() {
        if (sessionStorage['search_results']) {
            let search_results = JSON.parse(sessionStorage['search_results']);
            this.artist_list = search_results['artist'];
            this.track_list = search_results['track'];
        }
    },
    methods: {
        doSearch() {
            drippy.search(this.search_input, 'artist').then(results => this.artist_list = results);
            drippy.search(this.search_input, 'track').then(results => this.track_list = results);
        },
        play(track) {
            this.$player.tracks = [track];
            this.$player.play(track);
        }
    }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 960px) {
    .results-large {
        display: none;
    }
}

@media screen and (min-width: 960px) {
    .results-small {
        display: none;
    }
}
</style>