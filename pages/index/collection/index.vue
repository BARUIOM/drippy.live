<template>
    <div>
        <portal to="header">
            <v-tabs v-model="tab" grow>
                <v-tab>Playlists</v-tab>
                <v-tab>Artists</v-tab>
                <v-tab>Albums</v-tab>
            </v-tabs>
        </portal>
        <v-tabs-items v-model="tab">
            <v-tab-item>
                <Contents route="index-playlists-id" v-bind:contents="playlists" wrap />
            </v-tab-item>
            <v-tab-item>
                <Contents route="index-artist-id" v-bind:contents="artists" wrap />
            </v-tab-item>
            <v-tab-item>
                <Contents route="index-album-id" v-bind:contents="albums" wrap />
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
import Contents from '@/components/Contents'

export default {
    components: { Contents },
    data: () => ({
        tab: 0,
        playlists: [],
        artists: [],
        albums: []
    }),
    mounted() {
        this.$drippy.getPlaylists().then(playlists => this.playlists = playlists);
        this.$drippy.getFollowedArtists().then(artists => this.artists = artists);
        this.$drippy.getSavedAlbums().then(albums => this.albums = albums);
    }
}
</script>

<style lang="scss">
.v-tabs-bar {
    background-color: transparent !important;
}
</style>