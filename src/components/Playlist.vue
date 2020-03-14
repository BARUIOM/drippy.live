<template>
    <v-container>
        <v-row dense>
            <v-col cols="12" md="6">
                <v-card class="mx-auto" max-width="400" max-height="400">
                    <div class="artworks">
                        <v-img v-for="(item, i) in artworks" :src="item" :key="i"></v-img>
                    </div>
                </v-card>
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
            <v-col cols="12" md="6">
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
.col {
    padding: 12px;
}

div.artworks {
    max-height: 400px;

    .v-image:not(:only-child) {
        max-width: 200px;
    }

    .v-image:nth-child(1) {
        top: 0px;
        left: 0px;
    }

    .v-image:nth-child(2) {
        top: -200px;
        left: 200px;
    }

    .v-image:nth-child(3) {
        top: -200px;
    }

    .v-image:nth-child(4) {
        top: -400px;
        left: 200px;
    }
}
</style>