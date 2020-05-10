<template>
    <v-container class="player pa-0 grey darken-4 elevation-10" fluid>
        <v-slider
            v-if="!$native && $player.current.id"
            @change="$player.position = arguments[0]"
            :value="position"
            :max="total"
            step="0.01"
            height="2"
            hide-details
        ></v-slider>

        <div v-else class="activator" @click="$native.open()"></div>
        <v-row align="center" justify="center" no-gutters>
            <v-col class="player-data" cols="10" md="4" v-if="$player.current.id">
                <div>
                    <v-img width="72" :src="$player.current.album.images[0].url"></v-img>
                </div>

                <v-container class="player-info" fill-height fluid>
                    <v-row>
                        <div
                            v-text="$player.current.name"
                            class="body-2 font-weight-bold text-truncate"
                        ></div>
                    </v-row>
                    <v-row>
                        <div
                            v-text="$player.current.artists.map(e => e.name).join(', ')"
                            class="body-2 grey--text text-truncate"
                        ></div>
                    </v-row>
                </v-container>
            </v-col>
            <v-spacer v-else></v-spacer>

            <v-col class="hidden-sm-and-down" align="center" cols="12" md="4">
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

            <v-col class="hidden-sm-and-down" align="right" cols="4">
                <v-btn class="mr-4" icon color="pink">
                    <v-icon v-text="like_icon"></v-icon>
                </v-btn>

                <v-btn class="mr-4" icon @click="$root.$emit('add', $player.current)">
                    <v-icon>mdi-playlist-plus</v-icon>
                </v-btn>
            </v-col>

            <v-col class="hidden-md-and-up" align="right" cols="2">
                <v-btn class="mx-3" icon @click="$player.toggle()">
                    <v-icon x-large v-text="control_icon"></v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        total: 0,
        position: 0,
        dialog: false,
        like_icon: "mdi-heart-outline",
        control_icon: "mdi-play"
    }),
    mounted() {
        this.$player.on('playback-started', () => {
            this.total = Math.floor(this.$player.current.duration_ms / 1000);
        });
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
.player {
    .v-slider {
        z-index: 1;
        margin: 0px;
        cursor: pointer;
    }
}
</style>

<style lang="scss" scoped>
@media screen and (max-width: 960px) {
    .player {
        z-index: 6 !important;
    }
}

.player {
    bottom: 0;
    z-index: 10;
    position: fixed;
    min-height: 72px;

    .row {
        min-height: 72px;
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