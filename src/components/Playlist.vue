<template>
    <v-container>
        <v-row>
            <v-col class="pb-0" cols="12" md="6">
                <v-container class="artworks pa-0">
                    <v-row align="center" justify="center" no-gutters dense>
                        <v-img v-for="(item, i) in artworks" :key="i" :src="item"></v-img>
                    </v-row>
                </v-container>
                <v-container fluid>
                    <v-row align="center" justify="center">
                        <span class="headline font-weight-bold text-no-wrap" v-text="name"></span>
                    </v-row>
                    <v-row align="center" justify="center">
                        <span class="subtitle-1 grey--text text-no-wrap" v-text="creator"></span>
                    </v-row>
                    <v-row align="center" justify="center">
                        <v-btn icon>
                            <v-icon>mdi-heart-outline</v-icon>
                        </v-btn>
                        <v-btn icon>
                            <v-icon>mdi-dots-horizontal</v-icon>
                        </v-btn>
                    </v-row>
                </v-container>
            </v-col>
            <v-col class="pt-0" cols="12" md="6">
                <SongList v-bind:song_list="song_list" @selected-track="play" />
            </v-col>
        </v-row>
    </v-container>
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
@media screen and (max-width: 600px) {
    .artworks {
        max-width: 100%;
    }
}

@media screen and (min-width: 600px) {
    .artworks {
        max-width: 50%;
    }
}

.v-image:not(:only-child) {
    max-width: 50%;
}
</style>