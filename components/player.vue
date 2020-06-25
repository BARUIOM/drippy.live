<template>
    <v-container class="player pa-0 grey darken-4 elevation-10" fluid>
        <div v-if="$native" class="activator" @click="$native.open()"></div>

        <v-row align="center" justify="center" dense no-gutters>
            <v-col class="player-data d-inline-flex" cols="10" md="4" v-if="$player.loaded">
                <div class="ma-1 artwork" @click="open">
                    <v-icon>mdi-open-in-new</v-icon>
                    <v-img class="elevation-4" :src="$drippy.getPicture(current.album, 2)"></v-img>
                </div>

                <v-container class="ma-0 player-info" fill-height fluid>
                    <v-row>
                        <div v-text="current.name" class="body-2 font-weight-bold text-truncate"></div>
                    </v-row>
                    <v-row>
                        <ArtistHyperlink
                            class="body-2 grey--text text-truncate"
                            v-bind:artists="current.artists"
                        />
                    </v-row>
                </v-container>
            </v-col>
            <v-spacer v-else></v-spacer>

            <v-col class="hidden-sm-and-down" md="4">
                <v-container class="pa-0" fluid>
                    <v-row class="pa-1 player-controls" align="center" justify="center">
                        <v-col class="pa-0" align="left" cols="2">
                            <v-btn @click="$root.$emit('queue')" :disabled="!$player.loaded" icon>
                                <v-icon>mdi-menu-open</v-icon>
                            </v-btn>
                        </v-col>
                        <v-col class="pa-0" align="center" cols="8">
                            <v-btn :disabled="!$player.loaded" icon>
                                <v-icon small>mdi-repeat</v-icon>
                            </v-btn>
                            <v-btn @click="$player.previous()" :disabled="!$player.loaded" icon>
                                <v-icon small>mdi-skip-previous</v-icon>
                            </v-btn>
                            <v-btn @click="$player.toggle()" :disabled="!$player.loaded" icon>
                                <v-icon v-text="control_icon"></v-icon>
                            </v-btn>
                            <v-btn @click="$player.next()" :disabled="!$player.loaded" icon>
                                <v-icon small>mdi-skip-next</v-icon>
                            </v-btn>
                            <v-btn @click="$player.shuffle()" :disabled="!$player.loaded" icon>
                                <v-icon small>mdi-shuffle</v-icon>
                            </v-btn>
                        </v-col>
                        <v-col class="pa-0" align="right" cols="2">
                            <v-btn
                                @click="$root.$emit('add', [current])"
                                :disabled="!$player.loaded"
                                icon
                            >
                                <v-icon>mdi-playlist-plus</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-row v-if="!$native" align="center" justify="center">
                        <span class="mx-1 caption grey--text">{{ format(position * 1000) }}</span>
                        <v-slider
                            @change="$player.position = arguments[0]"
                            :disabled="!$player.loaded"
                            :max="current.duration_ms / 1000"
                            :value="position"
                            height="20"
                            step="0.01"
                            hide-details
                        ></v-slider>
                        <span class="mx-1 caption grey--text">{{ format(current.duration_ms) }}</span>
                    </v-row>
                </v-container>
            </v-col>

            <v-col class="pr-2 player-controls hidden-sm-and-down" align="right" cols="4">
                <v-btn @click="$player.display()" :disabled="!$player.loaded" icon>
                    <v-icon>mdi-picture-in-picture-bottom-right</v-icon>
                </v-btn>

                <v-menu :close-on-content-click="false" offset-y>
                    <template v-slot:activator="{ on }">
                        <v-btn :disabled="!$player.loaded" v-on="on" icon>
                            <v-icon v-text="volume_icon"></v-icon>
                        </v-btn>
                    </template>
                    <div class="pa-2 player-volume">
                        <v-slider v-model="volume" min="0" max="100" vertical></v-slider>
                    </div>
                </v-menu>
            </v-col>

            <v-col class="hidden-md-and-up" align="right" cols="2">
                <v-btn class="mx-3" @click.stop="$player.toggle()" :disabled="!$player.loaded" icon>
                    <v-icon x-large v-text="control_icon"></v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import ArtistHyperlink from './ArtistHyperlink'

export default {
    components: { ArtistHyperlink },
    data: () => ({
        volume: 100,
        position: 0,
        volume_icon: "mdi-volume-high",
        control_icon: "mdi-play",
        current: {
            duration_ms: 0
        }
    }),
    mounted() {
        this.$player.on('playback-started', track => this.current = track);
        this.$player.on('update', value => this.position = value);
        this.$player.on('state', (playing) => {
            if (playing) {
                this.control_icon = "mdi-pause";
            } else {
                this.control_icon = "mdi-play";
            }
        });
    },
    methods: {
        open() {
            this.$router.push({ name: 'index-album-id', params: { id: this.current.album['id'] } });
        },
        format(time) {
            return new Date(Math.floor(time)).toLocaleTimeString()
                .replace(/[A-Z]/gi, '').trim().split(/:(.+)/, 2)[1];
        }
    },
    watch: {
        volume(value) {
            this.$player.volume = value / 100.0;
            if (this.$player.volume == 0) {
                this.volume_icon = 'mdi-volume-off'
            } else
                this.volume_icon = 'mdi-volume-high'
        }
    }
}
</script>

<style lang="scss">
.v-slider {
    cursor: pointer !important;
}
</style>

<style lang="scss" scoped>
@media screen and (max-width: 960px) {
    .player {
        z-index: 6 !important;
    }
}

@media screen and (min-width: 960px) {
    .player .player-data {
        padding-left: 56px;
    }
}

.player {
    bottom: 0;
    z-index: 4;
    position: fixed;
    min-height: 72px;

    > .row {
        min-height: 72px;
    }

    .player-info {
        min-height: 72px;
        max-width: calc(100% - 96px);

        .row {
            min-height: unset;
        }
    }

    .player-controls button {
        margin-left: 8px;
        margin-right: 8px;
    }
}

.player-volume {
    overflow: hidden;
    background-color: #212121;
}

.activator {
    position: fixed;
    min-width: 100vw;
    min-height: 72px;
}

.artwork {
    cursor: pointer;
    position: relative;

    i.v-icon {
        top: 0px;
        left: 0px;
        z-index: 1;
        width: 100%;
        height: 100%;
        opacity: 0.7;
        position: absolute;
        background-color: black;
        transition: opacity 0.2s linear;
    }
}

.artwork:not(:hover) i.v-icon {
    opacity: 0;
}
</style>