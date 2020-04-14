<template>
    <v-container class="player primary elevation-10" fluid>
        <v-slider
            step="0.01"
            height="2"
            color="orange"
            :max="total"
            v-model="position"
            @change="setPosition"
            hide-details
        ></v-slider>
        <v-row align="center" justify="center" no-gutters>
            <v-col class="player-data" cols="4" v-if="current_song.data">
                <div>
                    <v-img width="72" :src="current_song.artwork_url"></v-img>
                </div>

                <v-container class="player-info" fill-height fluid>
                    <v-row>
                        <div
                            v-text="current_song.title"
                            class="body-2 font-weight-bold text-truncate"
                        ></div>
                    </v-row>
                    <v-row>
                        <div v-text="artists" class="body-2 grey--text text-truncate"></div>
                    </v-row>
                </v-container>
            </v-col>
            <v-spacer v-else></v-spacer>

            <v-col align="center" cols="4">
                <v-btn class="mx-3" icon>
                    <v-icon>mdi-repeat</v-icon>
                </v-btn>
                <v-btn class="mx-3" icon @click="$player.previous()">
                    <v-icon>mdi-skip-previous</v-icon>
                </v-btn>
                <v-btn class="mx-3" icon @click="$player.toggle()">
                    <v-icon x-large v-text="control_icon"></v-icon>
                </v-btn>
                <v-btn class="mx-3" icon @click="$player.next()">
                    <v-icon>mdi-skip-next</v-icon>
                </v-btn>
                <v-btn class="mx-3" icon @click="$player.shuffle()">
                    <v-icon>mdi-shuffle</v-icon>
                </v-btn>
            </v-col>

            <v-col align="right" cols="4">
                <v-btn class="mr-4" icon color="pink">
                    <v-icon v-text="like_icon"></v-icon>
                </v-btn>

                <v-dialog v-model="dialog">
                    <template v-slot:activator="{ on }">
                        <v-btn class="mr-4" v-on="on" icon>
                            <v-icon>mdi-playlist-plus</v-icon>
                        </v-btn>
                    </template>

                    <Dialog v-bind:track="current_song" @playlist-action="addToPlaylist" />
                </v-dialog>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import drippy from "../plugins/drippy.js";
import Dialog from "./PlaylistsDialog";

export default {
    name: 'Player',
    components: { Dialog },
    data: () => ({
        artists: '',
        total: 100,
        position: 0,
        dialog: false,
        current_song: {},
        like_icon: "mdi-heart-outline",
        control_icon: "mdi-play-circle-outline"
    }),
    mounted() {
        this.$player.on('update', value => this.position = value);
        this.$player.on('playback-started', track => {
            this.total = track['duration'];
            this.artists = track['artists'].join(', ');
            this.current_song = track;

            if (window.native) {
                window.native.setPlayerBar(JSON.stringify(this.current_song));
            }
        });
        this.$player.on('state', (playing) => {
            if (playing) {
                this.control_icon = "mdi-pause-circle-outline";
            } else {
                this.control_icon = "mdi-play-circle-outline";
            }
        });
    },
    methods: {
        setPosition(value) {
            this.$player.position = value;
        },
        async addToPlaylist(playlist, track) {
            this.dialog = false;
            await drippy.addTrackToPlaylist(playlist.id, track.data);
        }
    }
}
</script>