<template>
    <v-container>
        <v-row>
            <v-col class="pb-0" cols="12" md="6">
                <v-container class="artworks">
                    <v-row align="center" justify="center" no-gutters dense>
                        <v-col v-for="(item, i) in artworks" :key="i" cols="6" md="5">
                            <v-img :src="item"></v-img>
                        </v-col>
                    </v-row>
                </v-container>
                <v-container fluid>
                    <v-row align="center" justify="center">
                        <span class="headline font-weight-bold text-no-wrap" v-text="name"></span>
                    </v-row>
                    <v-row align="center" justify="center">
                        <span class="subtitle-1 grey--text text-no-wrap" v-text="owner"></span>
                    </v-row>
                    <v-row align="center" justify="center">
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
        owner: "",
        artworks: [],
        song_list: []
    }),
    methods: {
        async loadPlaylist() {
            const playlist = await drippy.getPlaylist(this.$route.params["id"]);
            this.name = playlist.name;
            this.owner = playlist.owner.name;
            this.song_list = [...playlist.songs];

            this.artworks = this.song_list.slice(0, 4).map(e => e['artwork_url']);
            if (this.artworks.length < 4) this.artworks = [].concat(this.artworks.shift());
        },
        play(track) {
            this.$player.tracks = this.song_list;
            this.$player.play(track);
        }
    },
    mounted() {
        this.loadPlaylist();
    },
    watch: {
        $route() {
            this.loadPlaylist();
        }
    }
};
</script>

<style lang="scss" scoped>
.artworks {
    padding: 0px;
    max-width: 400px;
}
</style>