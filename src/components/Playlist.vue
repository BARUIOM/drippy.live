<template>
    <v-container>
        <v-row dense>
            <v-col>
                <v-card class="mx-auto mb-12" max-width="400">
                    <v-card-actions>
                        <v-row align="center" justify="center" dense>
                            <v-card-title class="text-no-wrap" v-text="name"></v-card-title>

                            <v-spacer></v-spacer>

                            <v-btn class="player-option" icon>
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col>
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
        artworks: [],
        song_list: []
    }),
    methods: {
        async loadPlaylist() {
            const playlist = await drippy.getPlaylist(this.$route.params["id"]);
            this.name = playlist.name;
            this.song_list = [...playlist.songs];
            this.artworks = this.song_list.slice(0, 4).map(e => e['artwork_url']);
            this.$player.tracks = this.song_list;
        },
        play(track) {
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
.col {
    padding: 12px;
}
</style>