<template>
    <v-row dense>
        <v-col cols="12">
            <v-form @submit.prevent="search">
                <v-text-field
                    prepend-inner-icon="mdi-magnify"
                    v-model="search_input"
                    hide-details
                    clearable
                    solo
                ></v-text-field>
            </v-form>
        </v-col>
        <v-col v-for="(artist, i) in artist_list" :key="i" cols="12">
            <v-card link :to="{ name: 'index-artist-id', params: { id: artist.id } }">
                <v-container fluid>
                    <v-row no-gutters dense>
                        <v-col cols="auto">
                            <v-avatar size="80" tile>
                                <v-img :src="artist.picture"></v-img>
                            </v-avatar>
                        </v-col>
                        <v-col cols="6">
                            <v-card-title class="headline text-truncate" v-text="artist.name"></v-card-title>
                            <v-card-subtitle class="pb-0">Artist</v-card-subtitle>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-icon size="40">mdi-chevron-right</v-icon>
                    </v-row>
                </v-container>
            </v-card>
        </v-col>
        <v-col cols="12">
            <v-card>
                <songlist v-bind:song_list="track_list.slice(0, 3)" />
                <v-expansion-panels v-if="track_list.length > 3" accordion hover tile>
                    <v-expansion-panel>
                        <v-expansion-panel-header></v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <songlist v-bind:song_list="track_list.slice(3)" />
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import songlist from '~/components/songlist'

export default {
    components: { songlist },
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
        search() {
            this.$drippy.search(this.search_input, 'artist').then(results => this.artist_list = results);
            this.$drippy.search(this.search_input, 'track').then(results => this.track_list = results);
        }
    }
}
</script>

<style lang="scss">
.v-expansion-panel-content > div {
    padding: 0px !important;
}
</style>