<template>
    <div class="q-gutter-y-md">
        <div class="row">
            <div class="col q-pa-md">
                <q-form @submit.prevent="search">
                    <q-input
                        v-model="query"
                        clear-icon="close"
                        placeholder="Search for artists, tracks or playlists"
                        rounded
                        standout
                        clearable
                        dense
                    >
                        <template v-slot:prepend>
                            <q-icon name="search" />
                        </template>
                    </q-input>
                </q-form>
            </div>
        </div>
        <Results title="Tracks" v-if="results.tracks.length">
            <TrackList v-bind:track_list="results.tracks" />
        </Results>
        <Results title="Artists" v-if="results.artists.length">
            <Contents
                type="artist"
                v-bind:contents="results.artists"
                @click="open('artist', arguments[0])"
            />
        </Results>
        <Results title="Playlists" v-if="results.playlists.length">
            <Contents type="collection" v-bind:contents="results.playlists" />
        </Results>
        <Results title="Albums" v-if="results.albums.length">
            <Contents type="collection" v-bind:contents="results.albums" />
        </Results>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import TrackList from '@/components/misc/TrackList.vue'
import Contents from '@/components/misc/Contents.vue'

import Results from './Results.vue'

@Component({ components: { Results, TrackList, Contents } })
export default class Search extends Vue {

    private query: string = '';
    private results: SearchResults = {
        tracks: [],
        artists: [],
        playlists: [],
        albums: []
    };

    mounted() {
        if (this.$q.sessionStorage.has('search_results')) {
            this.results = this.$q.sessionStorage.getItem('search_results') as SearchResults;
        }
    }

    search() {
        this.$drippy.search(this.query).then(result => this.results = result);
    }

    open(name: string, id: string) {
        this.$router.push({ name, params: { id } });
    }

}

interface SearchResults {

    tracks: any[];
    artists: any[];
    playlists: any[];
    albums: any[];

}
</script>