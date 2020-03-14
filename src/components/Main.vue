<template>
    <v-app>
        <v-app-bar app color="primary">
            <v-btn icon @click.stop="drawer = !drawer">
                <v-icon>mdi-menu</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <div class="d-flex align-center">
                <v-img
                    class="shrink mr-2"
                    src="../assets/logo.svg"
                    transition="scale-transition"
                    width="40"
                    contain
                />
            </div>
        </v-app-bar>

        <div v-bind:class="{ 'player-drawer': isLoaded }">
            <v-navigation-drawer class="drawer-large" permanent expand-on-hover app>
                <Drawer />
            </v-navigation-drawer>

            <v-navigation-drawer class="drawer-small" v-model="drawer" absolute temporary>
                <Drawer />
            </v-navigation-drawer>
        </div>

        <v-content>
            <v-container v-bind:class="{ 'player-content': isLoaded, 'no-player-content': !isLoaded }" class="overflow-y-auto" fluid>
                <router-view @playlist-action="openPlaylist" />
            </v-container>
        </v-content>

        <v-container class="player primary" fluid v-if="isLoaded">
            <v-row align="center" justify="center" no-gutters>
                <v-col align="left" class="player-data" cols="6" md="4">
                    <div>
                        <v-img width="72px" :src="current_song.artwork_url"></v-img>
                    </div>

                    <v-container class="player-info" fill-height fluid>
                        <v-row>
                            <div
                                v-text="current_song.title"
                                class="body-2 font-weight-bold text-truncate"
                            ></div>
                        </v-row>
                        <v-row>
                            <div
                                v-text="current_song.artists.join(', ')"
                                class="body-2 grey--text text-truncate"
                            ></div>
                        </v-row>
                    </v-container>
                </v-col>

                <v-col align="center" class="player-large" cols="4">
                    <v-btn class="player-control" icon>
                        <v-icon>mdi-repeat</v-icon>
                    </v-btn>
                    <v-btn class="player-control" icon @click="previous">
                        <v-icon>mdi-skip-previous</v-icon>
                    </v-btn>
                    <v-btn class="player-control" icon @click="toggle">
                        <v-icon x-large v-text="control_icon"></v-icon>
                    </v-btn>
                    <v-btn class="player-control" icon @click="next">
                        <v-icon>mdi-skip-next</v-icon>
                    </v-btn>
                    <v-btn class="player-control" icon>
                        <v-icon>mdi-shuffle</v-icon>
                    </v-btn>
                </v-col>

                <v-col align="right" class="player-large" cols="4">
                    <v-btn class="player-option" icon color="pink">
                        <v-icon v-text="like_icon"></v-icon>
                    </v-btn>

                    <v-dialog v-model="dialog">
                        <template v-slot:activator="{ on }">
                            <v-btn class="player-option" v-on="on" icon>
                                <v-icon>mdi-playlist-plus</v-icon>
                            </v-btn>
                        </template>

                        <Dialog v-bind:track="current_song" @playlist-action="addToPlaylist" />
                    </v-dialog>
                </v-col>

                <v-col align="right" class="player-small" cols="6">
                    <v-btn class="player-option" icon @click="toggle">
                        <v-icon x-large v-text="control_icon_small"></v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
import drippy from "../plugins/drippy.js";

import Drawer from "./Drawer";
import Dialog from "./PlaylistsDialog";

export default {
    name: "Main",
    components: { Drawer, Dialog },
    data: () => ({
        drawer: false,
        dialog: false,
        like_icon: "mdi-heart-outline",
        control_icon: "mdi-pause-circle-outline",
        control_icon_small: 'mdi-pause',
        isLoaded: false,
        current_song: {}
    }),
    mounted() {
        this.$player.on('playback-started', track => {
            this.isLoaded = true;
            this.current_song = track;
        });
        this.$player.on('state', (playing) => {
            if (playing) {
                this.control_icon = "mdi-pause-circle-outline";
                this.control_icon_small = "mdi-pause";
            } else {
                this.control_icon = "mdi-play-circle-outline";
                this.control_icon_small = "mdi-play";
            }
        });
    },
    methods: {
        toggle() {
            this.$player.toggle();
        },
        next() {
            this.$player.next();
        },
        previous() {
            this.$player.previous();
        },
        async addToPlaylist(playlist, track) {
            this.dialog = false;
            await drippy.addTrackToPlaylist(playlist.id, track.data);
        },
        async openPlaylist(playlist) {
            await this.$router.push({ name: 'playlist', params: { id: playlist.id } });
        }
    }
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 960px) {
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

@media screen and (min-width: 960px) {
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

    .row {
        margin: 0px;
    }
}

.player-option {
    margin-right: 16px;
}
</style>