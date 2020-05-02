<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card tile>
            <v-toolbar dark @click="$emit('close')">
                <v-toolbar-items>
                    <v-icon>mdi-chevron-left</v-icon>
                </v-toolbar-items>
            </v-toolbar>
            <v-container class="py-0" v-if="$player.current.id" fluid>
                <v-row align="center" justify="center">
                    <v-col cols="12">
                        <v-img max-height="500" contain :src="$player.current.album.images[0].url"></v-img>
                    </v-col>
                </v-row>
                <v-row align="center" justify="center">
                    <v-container fluid>
                        <v-row align="center" justify="center">
                            <span
                                class="title font-weight-bold text-no-wrap"
                                v-text="$player.current.name"
                            ></span>
                        </v-row>
                        <v-row align="center" justify="center">
                            <span
                                class="subtitle-1 grey--text text-no-wrap"
                                v-text="$player.current.album.name"
                            ></span>
                        </v-row>
                        <v-row align="center" justify="center">
                            <span
                                class="subtitle-1 grey--text text-no-wrap"
                                v-text="$player.current.artists.map(e => e.name).join(', ')"
                            ></span>
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
                                :max="$player.current.duration_ms / 1000"
                                @change="$emit('position', arguments[0])"
                                :value="position"
                                step="0.01"
                                hide-details
                            ></v-slider>
                        </v-row>
                        <v-row align="center" justify="center">
                            <v-btn class="mx-2" @click="$emit('add')" icon>
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
    props: {
        dialog: {
            type: Boolean,
            default: false
        },
        position: Number,
        control_icon: String
    }
}
</script>

<style lang="scss" scoped>
.player-controls {
    bottom: 0;
    position: fixed;
}
</style>