<template>
    <div class="page-container">
        <md-app>
            <md-app-toolbar class="md-primary" md-elevation="0">
                <div class="md-toolbar-row">
                    <div class="md-toolbar-section-start">
                        <md-button class="md-icon-button" @click="showNavigation = true">
                            <md-icon>menu</md-icon>
                        </md-button>
                        <span class="md-title">Drippy Music</span>
                    </div>

                    <div class="md-toolbar-section-end">
                        <md-button class="md-icon-button">
                            <md-icon>refresh</md-icon>
                        </md-button>

                        <md-button class="md-icon-button">
                            <md-icon>more_vert</md-icon>
                        </md-button>
                    </div>
                </div>
            </md-app-toolbar>

            <md-app-drawer :md-active.sync="showNavigation" md-swipeable>
                <md-toolbar class="md-transparent" md-elevation="0">
                    <span class="md-title">Drippy Music</span>
                </md-toolbar>

                <md-list>
                    <md-list-item to="/" exact>
                        <md-icon>home</md-icon>
                        <span class="md-list-item-text">Home</span>
                    </md-list-item>

                    <md-list-item to="/search" exact>
                        <md-icon>search</md-icon>
                        <span class="md-list-item-text">Search</span>
                    </md-list-item>
                </md-list>
            </md-app-drawer>

            <md-app-content>
                <router-view />
            </md-app-content>
        </md-app>
        
        <div class="player md-elevation-12 md-layout md-gutter md-alignment-center-center">
            
            <div class="md-layout-item md-layout md-gutter md-alignment-center-left">
                <div class="md-layout-item artwork">
                    <img :src="current_song.artwork_url" width="78px" />
                </div>
            </div>

            <div class="md-layout-item md-layout md-gutter md-alignment-center-center">
                <div class="md-layout-item">
                    <md-icon>repeat</md-icon>
                </div>
                <div class="md-layout-item">
                    <md-icon>skip_previous</md-icon>
                </div>
                <div class="md-layout-item" @click="toggle">
                    <md-icon class="md-size-2x" v-if="!playing">play_circle_filled</md-icon>
                    <md-icon class="md-size-2x" v-else>pause_circle_filled</md-icon>
                </div>
                <div class="md-layout-item">
                    <md-icon>skip_next</md-icon>
                </div>
                <div class="md-layout-item">
                    <md-icon>shuffle</md-icon>
                </div>
            </div>

            <div class="md-layout-item md-layout md-gutter md-alignment-center-right">
                <div class="md-layout-item">
                    <md-icon>thumb_up</md-icon>
                </div>
                <div class="md-layout-item">
                    <md-icon>thumb_down</md-icon>
                </div>
                <div class="md-layout-item">
                    <md-icon>more_vert</md-icon>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import engine from './socket-engine.js'

export default {
    name: "App",
    data: () => ({
        playing: false,
        current_song: {},
        showNavigation: false
    }),
    mounted() {
        this.$root.$on('playback_started', (song) => {
            this.playing = true;
            this.current_song = song;
        });
    },
    methods: {
        toggle() {
            engine.isPlaying() ? engine.pause() : engine.play();
            this.playing = engine.isPlaying();
        }
    },
    sockets: engine.sockets
};
</script>

<style lang="scss" scoped>
.md-app {
    min-height: 100vh;
}

div.player {
    bottom: 0;
    width: 100%;
    position: fixed;
    min-height: 80px;
    border: 1px solid #eaeaea;
    background-color: white;
}

div.player.md-layout.md-gutter {
    margin-right: 0px;
    margin-left: 0px;
}

.md-layout-item {
    flex: none;
}

.md-layout-item.artwork {
    padding-left: 0px !important;
    margin-left: -20px !important;
}

.md-layout-item > .md-icon {
    cursor: pointer;
}

@media screen and (max-width: 720px) {
    .md-alignment-center-left {
        display: none;
    }

    .md-alignment-center-right {
        display: none;
    }

    .md-alignment-center-center > .md-layout-item {
        padding-left: 14px !important;
        padding-right: 14px !important;
    }
}
</style>