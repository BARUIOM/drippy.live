<template>
    <v-row dense>
        <v-col class="pa-4" cols="12">
            <v-form @submit.prevent="search">
                <v-text-field
                    placeholder="Search for artists, tracks or playlists"
                    prepend-inner-icon="mdi-magnify"
                    v-model="search_input"
                    hide-details
                    clearable
                    rounded
                    solo
                ></v-text-field>
            </v-form>
        </v-col>
        <v-col class="pa-0" cols="12" v-if="results.artists.length">
            <contents title="Artists" route="index-artist-id" v-bind:contents="results.artists" />
        </v-col>
        <v-col class="pa-0" cols="12" v-if="results.playlists.length">
            <contents
                title="Playlists"
                route="index-playlists-id"
                v-bind:contents="results.playlists"
            />
        </v-col>
        <v-col class="pa-0" cols="12" v-if="results.albums.length">
            <contents title="Albums" route="index-album-id" v-bind:contents="results.albums" />
        </v-col>
        <v-col class="pa-0" cols="12" v-if="results.tracks.length">
            <v-card color="accent" flat tile>
                <v-card-title class="headline font-weight-bold">Tracks</v-card-title>
                <songlist v-bind:song_list="results.tracks" />
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import songlist from '~/components/songlist'
import contents from '~/components/contents'

export default {
    components: { songlist, contents },
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