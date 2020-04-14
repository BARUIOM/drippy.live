<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <template v-slot:activator="{ on }">
            <v-container class="player primary elevation-10" fluid v-on="on">
                <v-row align="center" justify="center" no-gutters>
                    <v-col class="player-data" cols="6" v-if="current_song.data">
                        <div>
                            <v-img width="72" :src="current_song.artwork_url"></v-img>
                        </div>

                        <v-container class="player-info" fill-height fluid>
                            <v-row>
                                <div
                                    class="body-2 font-weight-bold text-truncate"
                                    v-text="current_song.title"
                                ></div>
                            </v-row>
                            <v-row>
                                <div class="body-2 grey--text text-truncate" v-text="artists"></div>
                            </v-row>
                        </v-container>
                    </v-col>
                    <v-spacer v-else></v-spacer>

                    <v-col align="right" cols="6">
                        <v-btn class="mr-4" icon @click.stop="$player.toggle()">
                            <v-icon x-large v-text="control_icon"></v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </template>
        <v-card tile>
            <v-toolbar dark color="primary" @click="dialog = false">
                <v-toolbar-items>
                    <v-icon>mdi-chevron-left</v-icon>
                </v-toolbar-items>
            </v-toolbar>
            <v-container class="py-0" v-if="current_song.data" fluid>
                <v-row align="center" justify="center">
                    <v-col cols="12">
                        <v-img max-height="500" contain :src="current_song.artwork_url"></v-img>
                    </v-col>
                </v-row>
                <v-row align="center" justify="center">
                    <v-container fluid>
                        <v-row align="center" justify="center">
                            <span
                                class="title font-weight-bold text-no-wrap"
                                v-text="current_song.title"
                            ></span>
                        </v-row>
                        <v-row align="center" justify="center">
                            <span
                                class="subtitle-1 grey--text text-no-wrap"
                                v-text="current_song.album"
                            ></span>
                        </v-row>
                        <v-row align="center" justify="center">
                            <span class="subtitle-1 grey--text text-no-wrap" v-text="artists"></span>
                        </v-row>
                    </v-container>
                    <v-container class="player-controls" fluid>
                        <v-row class="mx-2">
                            <v-btn icon>
                                <v-icon>mdi-repeat</v-icon>
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn icon @click="$player.shuffle()">
                                <v-icon>mdi-shuffle</v-icon>
                            </v-btn>
                        </v-row>
                        <v-row class="mx-1" align="center" justify="center">
                            <v-slider
                                step="0.01"
                                color="orange"
                                :max="total"
                                v-model="position"
                                @change="setPosition"
                                hide-details
                            ></v-slider>
                        </v-row>
                        <v-row align="center" justify="center">
                            <v-btn class="mx-2" icon>
                                <v-icon>mdi-playlist-plus</v-icon>
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn class="mx-2" icon @click="$player.previous()">
                                <v-icon>mdi-skip-previous</v-icon>
                            </v-btn>
                            <v-btn class="mx-2" icon @click="$player.toggle()">
                                <v-icon x-large v-text="control_icon"></v-icon>
                            </v-btn>
                            <v-btn class="mx-2" icon @click="$player.next()">
                                <v-icon>mdi-skip-next</v-icon>
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn class="mx-2" icon>
                                <v-icon>mdi-heart-outline</v-icon>
                            </v-btn>
                        </v-row>
                    </v-container>
                </v-row>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "MiniPlayer",
    data: () => ({
        artists: '',
        dialog: false,
        total: 100,
        position: 0,
        current_song: {},
        control_icon: 'mdi-play'
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
                this.control_icon = "mdi-pause";
            } else {
                this.control_icon = "mdi-play";
            }
        });
    },
    methods: {
        setPosition(value) {
            this.$player.position = value;
        }
    }
}
</script>

<style lang="scss" scoped>
.player-controls {
    bottom: 0;
    position: fixed;
}
</style>