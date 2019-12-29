<template>
    <div>
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

        <div class="player md-elevation-12 md-layout md-alignment-center-space-between" v-if="loaded">
            <img class="artwork" :src="current_song.artwork_url" />

            <div class="md-layout-item md-layout md-gutter md-alignment-center-left">
                <div class="song-info md-layout-item">
                    <div><b>{{ current_song.title }}</b></div>
                    <div>{{ current_song.artists.join(', ') }}</div>
                </div>
            </div>

            <div class="md-layout-item md-layout md-gutter md-alignment-center-center large-controls">
                <div class="md-layout-item">
                    <md-icon>repeat</md-icon>
                </div>
                <div class="md-layout-item">
                    <md-icon>skip_previous</md-icon>
                </div>
                <div class="md-layout-item">
                    <md-button class="md-icon-button" @click="toggle">
                        <md-icon class="md-size-2x" v-if="!playing">play_circle_filled</md-icon>
                        <md-icon class="md-size-2x" v-else>pause_circle_filled</md-icon>
                    </md-button>
                </div>
                <div class="md-layout-item">
                    <md-icon>skip_next</md-icon>
                </div>
                <div class="md-layout-item">
                    <md-icon>shuffle</md-icon>
                </div>
            </div>

            <div class="md-layout-item md-layout md-gutter md-alignment-center-right small-controls">
                <div class="md-layout-item">
                    <md-button class="md-icon-button" @click="toggle">
                        <md-icon class="md-size-2x" v-if="!playing">play_arrow</md-icon>
                        <md-icon class="md-size-2x" v-else>pause</md-icon>
                    </md-button>
                </div>
            </div>

            <div class="actions md-layout-item md-layout md-gutter md-alignment-center-right">
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
export default {
    name: "Main",
    data: () => ({
        audio: new Audio(),
        loaded: false,
        playing: false,
        current_song: { artists: [] },
        showNavigation: false
    }),
    mounted() {
        this.audio.autoplay = true;
        this.$root.$on('playback_started', (song) => {
            this.current_song = song;
            this.playing = this.loaded = true;
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
};
</script>

<style lang="scss" scoped>
.md-app {
    min-height: 100vh;
}

.md-layout-item {
    flex: none;
}

.md-layout .md-layout {
    flex: 1 !important;
}

.player {
    -webkit-user-select: none !important;
    -moz-user-select: none !important;
    -khtml-user-select: none !important;
    -ms-user-select: none !important;
}

.song-info {
    position: fixed;
    padding-left: 0px !important;
    margin-left: 10vh !important;
}

.small-controls {
    margin-right: 16px !important;
}

div.player {
    bottom: 0;
    width: 100%;
    position: fixed;
    min-height: 8vh;
    background-color: white;
}

div.player.md-layout.md-gutter {
    margin-right: 0px;
    margin-left: 0px;
}

img.artwork {
    width: 8vh;
    position: fixed;
}

@media screen and (max-width: 700px) {
    .large-controls {
        display: none;
    }

    .actions {
        display: none;
    }
}

@media screen and (min-width: 700px) {
    .small-controls {
        display: none;
    }
}

@media screen and (orientation: landscape) and (max-height: 420px) {
    div.player {
        min-height: 18vh;
    }

    img.artwork {
        width: 18vh;
    }

    .song-info {
        margin-left: 22vh !important;
    }
}

@media screen and (orientation: portrait) and (max-height: 800px) {
    div.player {
        min-height: 10vh;
    }

    img.artwork {
        width: 10vh;
    }

    .song-info {
        margin-left: 12vh !important;
    }
}
</style>