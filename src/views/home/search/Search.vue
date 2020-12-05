<template>
    <div>
        <div>
            <div class="p-4 text-xl font-bold">Tracks</div>
            <TrackList v-bind:track_list="results.tracks" />
        </div>
        <div class="p-2">
            <Collection
                title="Artists"
                v-bind:collection="results.artists"
                @click="open('artist', arguments[0])"
            />
            <Collection
                title="Albums"
                v-bind:collection="results.albums"
                @click="open('album', arguments[0])"
            />
            <Collection
                title="Playlists"
                v-bind:collection="results.playlists"
                @click="open('playlist', arguments[0])"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import TrackList from '@/components/misc/TrackList.vue'
import Collection from '@/components/misc/Collection.vue'

import { SearchResults } from '@/modules/drippy-api'

@Component({ components: { TrackList, Collection } })
export default class Search extends Vue {

    private results: SearchResults = {
        tracks: [],
        artists: [],
        playlists: [],
        albums: []
    };

    private mounted() {
        if (!this.$route.query.query) {
            return this.$router.push('/');
        }
    }

    private open(name: string, object: any): void {
        this.$router.push({ name, params: { id: object.id } });
    }

    @Watch('$route', { immediate: true, deep: true })
    private change(): void {
        const query = this.$route.query.query as string;

        this.$drippy.search(query).then(result => {
            this.results = Object.freeze(result);
        });
    }

}
</script>