<template>
    <v-app>
        <v-app-bar app color="primary">
            <v-spacer></v-spacer>
        </v-app-bar>

        <v-navigation-drawer permanent expand-on-hover app>
            <v-list nav dense>
                <v-list-item link to="/" exact>
                    <v-list-item-icon>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Home</v-list-item-title>
                </v-list-item>

                <v-list-item link to="/search" exact>
                    <v-list-item-icon>
                        <v-icon>mdi-magnify</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Search</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-content>
            <v-container fluid>
                <router-view />
            </v-container>
        </v-content>

        <v-container class="player primary" fluid v-if="current_song.data">
            <v-row align="center" justify="center" no-gutters>
                <v-col align="left" class="player-data">
                    <div>
                        <v-img width="72px" :src="current_song.artwork_url"></v-img>
                    </div>

                    <v-container class="player-info" fill-height fluid>
                        <div>
                            <div v-text="current_song.title" class="body-2 font-weight-bold"></div>
                            <div v-text="current_song.artists.join(', ')" class="body-2 grey--text"></div>
                        </div>
                    </v-container>
                </v-col>

                <v-col align="center">
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

                <v-col align="right">
                    <v-btn class="player-option" icon color="pink">
                        <v-icon>mdi-heart-outline</v-icon>
                    </v-btn>

                    <v-btn class="player-option" icon>
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
export default {
    name: 'Main',
    data: () => ({
        playing: false,
        audio: new Audio(),
        current_song: { artists: [] }
    }),
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
.v-navigation-drawer {
    height: calc(100vh - 72px) !important;
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