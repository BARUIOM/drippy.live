<template>
    <v-app>
        <v-app-bar app color="primary">
            <v-btn icon @click.stop="drawer = !drawer">
                <v-icon>mdi-menu</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <div class="d-flex align-center">
                <v-img
                    class="shrink"
                    src="../assets/logo.svg"
                    transition="scale-transition"
                    width="40"
                    contain
                />
            </div>
        </v-app-bar>

        <div class="player-drawer">
            <v-navigation-drawer class="drawer-large" permanent expand-on-hover app>
                <Drawer />
            </v-navigation-drawer>

            <v-navigation-drawer class="drawer-small" v-model="drawer" absolute temporary>
                <Drawer />
            </v-navigation-drawer>
        </div>

        <v-content>
            <v-container class="player-content overflow-y-auto" fluid>
                <router-view @playlist-action="openPlaylist" />
            </v-container>
        </v-content>

        <div class="large-player">
            <Player />
        </div>
        <div class="mini-player">
            <MiniPlayer />
        </div>
    </v-app>
</template>

<script>
import Drawer from "./Drawer";
import Player from "./Player";
import MiniPlayer from "./MiniPlayer";

export default {
    name: "Main",
    components: { Drawer, Player, MiniPlayer },
    data: () => ({
        drawer: false,
    }),
    methods: {
        async openPlaylist(playlist) {
            await this.$router.push({ name: 'playlist', params: { id: playlist.id } });
        }
    }
};
</script>

<style lang="scss">
.player {
    bottom: 0;
    z-index: 10;
    padding: 0px;
    position: fixed;
    min-height: 72px;

    .row {
        min-height: 72px;
    }

    .v-slider {
        z-index: 1;
        margin: 0px;
        cursor: pointer;
    }
}

.player-data {
    display: inline-flex;
}

.player-info {
    min-height: 72px;

    .row {
        margin: 0px;
        min-height: unset;
    }
}
</style>

<style lang="scss" scoped>
@media screen and (max-width: 960px) {
    .drawer-large {
        display: none;
    }

    .large-player {
        display: none;
    }

    .v-content {
        padding-left: 0px !important;
    }
}

@media screen and (min-width: 960px) {
    .drawer-small {
        display: none;
    }

    .mini-player {
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
</style>