<template>
    <v-row dense>
        <portal to="header">
            <v-form @submit.prevent="search">
                <v-text-field
                    placeholder="Search for artists, tracks or playlists"
                    prepend-inner-icon="mdi-magnify"
                    v-model="search_input"
                    hide-details
                    clearable
                    rounded
                    dense
                    solo
                ></v-text-field>
            </v-form>
        </portal>
        <v-col class="pa-0" cols="12" v-if="results.tracks.length">
            <v-card flat tile>
                <v-card-title class="headline font-weight-bold">Tracks</v-card-title>
                <Tracklist v-bind:song_list="results.tracks" />
            </v-card>
        </v-col>
        <v-col class="pa-0" cols="12" v-if="results.artists.length">
            <Contents title="Artists" route="index-artist-id" v-bind:contents="results.artists" />
        </v-col>
        <v-col class="pa-0" cols="12" v-if="results.playlists.length">
            <Contents
                title="Playlists"
                route="index-playlists-id"
                v-bind:contents="results.playlists"
            />
        </v-col>
        <v-col class="pa-0" cols="12" v-if="results.albums.length">
            <Contents title="Albums" route="index-album-id" v-bind:contents="results.albums" />
        </v-col>
    </v-row>
</template>

<script>
import Tracklist from '@/components/misc/Tracklist'
import Contents from '@/components/Contents'

export default {
    components: { Tracklist, Contents },
    data: () => ({
        results: {
            artists: [],
            playlists: [],
            albums: [],
            tracks: []
        },
        search_input: ''
    }),
    mounted() {
        if (sessionStorage['search_results']) {
            this.results = JSON.parse(sessionStorage['search_results']);
        }
    },
    methods: {
        search() {
            this.$drippy.search(this.search_input).then(result => this.results = result);
        }
    }
}
</script>