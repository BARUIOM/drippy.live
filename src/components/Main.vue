<template>
    <v-app>
        <v-app-bar app color="primary">
            <v-btn icon @click.stop="drawer = !drawer">
                <v-icon>mdi-menu</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
        </v-app-bar>

        <div v-bind:class="{ 'player-drawer': player }">
            <v-navigation-drawer class="drawer-large" permanent expand-on-hover app>
                <Drawer />
            </v-navigation-drawer>

            <v-navigation-drawer class="drawer-small" v-model="drawer" absolute temporary>
                <Drawer />
            </v-navigation-drawer>
        </div>

        <v-content>
            <v-container v-bind:class="{ 'player-content': player, 'no-player-content': !player }" class="overflow-y-auto" fluid>
                <router-view />
            </v-container>
        </v-content>

        <v-container class="player primary" fluid v-if="player">
            <v-row align="center" justify="center" no-gutters>
                <v-col align="left" class="player-data">
                    <div>
                        <v-img width="72px" :src="current_song.artwork_url"></v-img>
                    </div>

                    <v-container class="player-info" fill-height fluid>
                        <div>
                            <div v-text="current_song.title" class="body-2 font-weight-bold text-no-wrap"></div>
                            <div v-text="current_song.artists.join(', ')" class="body-2 grey--text"></div>
                        </div>
                    </v-container>
                </v-col>

                <v-col align="center" class="player-large">
                    <v-btn class="player-control" icon>
                        <v-icon>mdi-repeat</v-icon>
                    </v-btn>
                    <v-btn class="player-control" icon>
                        <v-icon>mdi-skip-previous</v-icon>
                    </v-btn>
                    <v-btn class="player-control" icon @click="toggle">
                        <v-icon x-large v-if="!playing">mdi-play-circle-outline</v-icon>
                        <v-icon x-large v-if="playing">mdi-pause-circle-outline</v-icon>
                    </v-btn>
                    <v-btn class="player-control" icon>
                        <v-icon>mdi-skip-next</v-icon>
                    </v-btn>
                    <v-btn class="player-control" icon>
                        <v-icon>mdi-shuffle</v-icon>
                    </v-btn>
                </v-col>

                <v-col align="right" class="player-large">
                    <v-btn class="player-option" icon color="pink">
                        <v-icon>mdi-heart-outline</v-icon>
                    </v-btn>

                    <v-btn class="player-option" icon>
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </v-col>

                <v-col align="right" class="player-small">
                    <v-btn class="player-option" icon @click="toggle">
                        <v-icon x-large v-if="!playing">mdi-play</v-icon>
                        <v-icon x-large v-if="playing">mdi-pause</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
import Drawer from './Drawer'

export default {
    name: 'Main',
    components: { Drawer },
    data: () => ({
        drawer: false,
        playing: false,
        audio: new Audio(),
        current_song: { artists: [] }
    }),
    computed: {
        player: {
            get: function() {
                return this.current_song.data !== undefined;
            }
        }
    },
    mounted() {
        this.audio.autoplay = true;
        this.$root.$on('playback_started', (song) => {
            this.playing = true;
            this.current_song = song;
            this.audio.src = `${this.$root.api_url}/stream/${this.$root.userdata['idToken']}/${song.data}`;
        });
        this.audio.addEventListener('play', () => this.playing = !this.audio.paused);
        this.audio.addEventListener('pause', () => this.playing = !this.audio.paused);
    },
    methods: {
        toggle() {
            this.playing ? this.audio.pause() : this.audio.play();
        }
    }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 840px) {
    .player-large {
        display: none;
    }

    .drawer-large {
        display: none;
    }

    .v-content {
        padding-left: 0px !important;
    }
}

@media screen and (min-width: 840px) {
    .player-small {
        display: none;
    }

    .drawer-small {
        display: none;
    }
}

.v-app-bar {
    left: 0px !important;
}

.v-navigation-drawer {
    max-height: inherit !important;
}

.player-drawer {
    max-height: calc(100vh - 72px) !important;
}

.player-content {
    max-height: calc(100vh - 120px) !important;
}

.no-player-content {
    max-height: calc(100vh - 50px) !important;
}

.player {
    bottom: 0;
    z-index: 10;
    padding: 0px;
    position: fixed;
    min-height: 72px;
}

.player-control {
    margin-left: 10px;
    margin-right: 10px;
}

.player-data {
    display: inline-flex;
}

.player-info {
    min-height: 72px;
    padding-left: 24px;
}

.player-option {
    margin-right: 16px;
}
</style>