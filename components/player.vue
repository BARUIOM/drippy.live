<template>
    <v-container class="player pa-0 grey darken-4 elevation-10" fluid>
        <div class="slider" v-if="!$native">
            <v-slider
                v-if="$player.loaded"
                @change="$player.position = arguments[0]"
                :max="current.duration_ms / 1000"
                :value="position"
                step="0.01"
                height="2"
                hide-details
            ></v-slider>
        </div>
        <div v-else class="activator" @click="$native.open()"></div>

        <v-row align="center" justify="center" dense no-gutters>
            <v-col class="player-data d-inline-flex" cols="10" md="4" v-if="$player.loaded">
                <v-img class="ma-1 elevation-4" :src="$drippy.getPicture(current.album, 2)"></v-img>

                <v-container class="player-info" fill-height fluid>
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

            <v-col class="hidden-sm-and-down" align="center" cols="12" md="4">
                <v-btn class="mx-3" :disabled="!$player.loaded" icon>
                    <v-icon>mdi-repeat</v-icon>
                </v-btn>
                <v-btn class="mx-3" @click="$player.previous()" :disabled="!$player.loaded" icon>
                    <v-icon>mdi-skip-previous</v-icon>
                </v-btn>
                <v-btn class="mx-3" @click="$player.toggle()" :disabled="!$player.loaded" icon>
                    <v-icon x-large v-text="control_icon"></v-icon>
                </v-btn>
                <v-btn class="mx-3" @click="$player.next()" :disabled="!$player.loaded" icon>
                    <v-icon>mdi-skip-next</v-icon>
                </v-btn>
                <v-btn class="mx-3" @click="$player.shuffle()" :disabled="!$player.loaded" icon>
                    <v-icon>mdi-shuffle</v-icon>
                </v-btn>
            </v-col>

            <v-col class="hidden-sm-and-down" align="right" cols="4">
                <v-btn class="mx-2" @click="$root.$emit('queue')" :disabled="!$player.loaded" icon>
                    <v-icon>mdi-menu-open</v-icon>
                </v-btn>

                <v-btn
                    class="mx-2"
                    @click="$root.$emit('add', [current])"
                    :disabled="!$player.loaded"
                    icon
                >
                    <v-icon>mdi-playlist-plus</v-icon>
                </v-btn>
            </v-col>

            <v-col class="hidden-md-and-up" align="right" cols="2">
                <v-btn class="mx-3" @click.stop="$player.toggle()" icon>
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
        position: 0,
        like_icon: "mdi-heart-outline",
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
    }
}
</script>

<style lang="scss">
.player .v-slider {
    z-index: 1;
    margin: 0px;
    cursor: pointer;
}
</style>

<style lang="scss" scoped>
@media screen and (max-width: 960px) {
    .player {
        z-index: 6 !important;
    }
}

@media screen and (min-width: 960px) {
    .player {
        .slider {
            padding-left: 56px;
        }

        .player-data {
            padding-left: 56px;
        }
    }
}

.player {
    bottom: 0;
    z-index: 4;
    position: fixed;
    min-height: 72px;

    .row {
        min-height: 72px;
    }

    .player-info {
        min-height: 72px;

        .row {
            min-height: unset;
        }
    }
}

.activator {
    position: fixed;
    min-width: 100vw;
    min-height: 72px;
}
</style>