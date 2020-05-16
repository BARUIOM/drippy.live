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
        <v-col cols="12" v-if="artist_list.length">
            <v-container class="d-flex flex-row overflow-x-auto pa-0" fluid>
                <v-col v-for="(artist, i) in artist_list" :key="i" cols="6" sm="4" md="2">
                    <v-card link :to="{ name: 'index-artist-id', params: { id: artist.id } }">
                        <div class="pa-4">
                            <v-img
                                aspect-ratio="1"
                                class="elevation-10"
                                :src="$drippy.getPicture(artist, 1, '/images/account-music.png')"
                            ></v-img>
                        </div>
                        <v-card-title class="text-truncate justify-center" v-text="artist.name"></v-card-title>
                    </v-card>
                </v-col>
            </v-container>
        </v-col>
        <v-col cols="12">
            <v-card>
                <songlist
                    v-bind:class="{ 'pb-0': track_list.length > 3 }"
                    v-bind:song_list="track_list.slice(0, 3)"
                />
                <v-expansion-panels v-if="track_list.length > 3" accordion hover tile>
                    <v-expansion-panel>
                        <v-expansion-panel-content>
                            <songlist class="pa-0" v-bind:song_list="track_list.slice(3)" />
                        </v-expansion-panel-content>
                        <v-expansion-panel-header></v-expansion-panel-header>
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
            this.artist_list = search_results['artists'];
            this.track_list = search_results['tracks'];
        }
    },
    methods: {
        search() {
            this.$drippy.search(this.search_input).then(result => {
                this.artist_list = result.artists;
                this.track_list = result.tracks;
            });
        }
    }
}
</script>

<style lang="scss">
.v-expansion-panel-content > div {
    padding: 0px !important;
}
</style>