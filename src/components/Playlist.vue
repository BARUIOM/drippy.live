<template>
    <v-card>
        <v-container fluid>
            <v-row no-gutters>
                <v-col cols="12" sm="4" lg="2" class="d-flex flex-row flex-wrap elevation-10">
                    <v-img v-for="(item, i) in artworks" :key="i" :src="item"></v-img>
                </v-col>
                <v-col cols="12" sm="8" lg="10">
                    <v-card-title class="display-1 font-weight-bold" v-text="name"></v-card-title>
                    <v-card-subtitle class="title" v-text="creator"></v-card-subtitle>
                    <v-card-actions>
                        <v-btn icon>
                            <v-icon>mdi-heart-outline</v-icon>
                        </v-btn>
                        <v-btn icon>
                            <v-icon>mdi-dots-horizontal</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col>
                    <SongList v-bind:song_list="song_list" @selected-track="play" />
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
import drippy from "../plugins/drippy.js";
import SongList from "./SongList";

export default {
    name: "Playlist",
    components: {
        SongList
    },
    data: () => ({
        name: "",
        creator: "",
        artworks: [],
        song_list: [],
        playlist: true
    }),
    methods: {
        async update() {
            this.playlist = this.$route.name === 'playlist';
            if (this.playlist) {
                const playlist = await drippy.getPlaylist(this.$route.params["id"]);
                this.name = playlist.name;
                this.creator = playlist.owner.display_name;
                this.song_list = [...playlist.tracks];

                this.artworks = this.song_list.slice(0, 4).map(e => e['artwork_url']);
                if (this.artworks.length < 4) this.artworks = [].concat(this.artworks.shift());
            } else {
                const album = await drippy.getAlbum(this.$route.params["id"]);
                this.name = album.name;
                this.creator = album.artist;
                this.song_list = [...album.tracks];
                this.artworks = [album.artwork_url];
            }
        },
        async removeTrack(track) {
            this.song_list = await drippy.removeTrackFromPlaylist(this.$route.params["id"], track['id']);
        },
        play(track) {
            this.$player.tracks = this.song_list;
            this.$player.play(track);
        }
    },
    mounted() { this.update() },
    watch: {
        $route() { this.update() }
    }
};
</script>

<style lang="scss" scoped>
.v-image:not(:only-child) {
    max-width: 50%;
}
</style>