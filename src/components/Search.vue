<template>
    <v-container>
        <v-form @submit.prevent="doSearch">
            <v-text-field v-model="search_input" label="Search" color="orange" prepend-inner-icon="mdi-magnify" solo clearable required></v-text-field>
        </v-form>

        <SongTable v-bind:song_list="song_list" class="results-large" @selected-track="play" />
        <SongList v-bind:song_list="song_list" class="results-small" @selected-track="play" />
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
        search_input: '',
        song_list: [],
        search_results: []
    }),
    mounted() {
        if (sessionStorage['search_results']) {
            this.search_results = JSON.parse(sessionStorage['search_results']);
        }
    },
    methods: {
        async doSearch() {
            this.search_results = await drippy.search(this.search_input);
        },
        play(track) {
            this.$player.tracks = [];
            this.$player.play(track);
        }
    },
    watch: {
        search_results: {
            handler(value) {
                this.song_list = [...value].map(e => e[0]);
            }
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