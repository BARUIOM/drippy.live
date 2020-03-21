<template>
    <v-container no-gutters fill-height>
        <v-row dense>
            <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on }">
                    <v-col align="center" cols="6" sm="4" lg="2">
                        <v-card elevation="5" class="playlist" v-on="on">
                            <v-container fluid fill-height>
                                <v-row justify="center">
                                    <v-icon size="64">mdi-plus</v-icon>
                                </v-row>
                                <v-row justify="center">
                                    <v-card-title class="text-no-wrap">New playlist</v-card-title>
                                </v-row>
                            </v-container>
                        </v-card>
                    </v-col>
                </template>
                <v-card>
                    <v-card-title>
                        <span class="headline">Create a new playlist</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="playlist_name"
                                        label="Name"
                                        color="orange"
                                        required
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="createPlaylist">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-col v-for="item in playlists" :key="item.id" align="center" cols="6" sm="4" lg="2">
                <v-hover v-slot:default="{ hover }">
                    <v-card
                        elevation="5"
                        class="playlist"
                        @click="$emit('playlist-action', item, track)"
                    >
                        <v-img src="https://img.icons8.com/nolan/192/music.png">
                            <v-container v-if="hover" fill-height>
                                <v-row justify="center">
                                    <v-icon size="64" v-html="action_icon"></v-icon>
                                </v-row>
                            </v-container>
                            <v-card-title class="text-no-wrap" v-text="item.name"></v-card-title>
                        </v-img>
                    </v-card>
                </v-hover>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import drippy from '../plugins/drippy.js'

export default {
    name: "Playlists",
    props: {
        track: Object,
        action_icon: {
            type: String,
            default: 'mdi-play-circle-outline'
        }
    },
    data: () => ({
        dialog: false,
        playlists: [],
        playlist_name: ''
    }),
    async mounted() {
        this.playlists = await drippy.getPlaylists();
        this.playlists.forEach(e => drippy.getPlaylist(e['id']));
    },
    methods: {
        async createPlaylist() {
            this.dialog = false;
            await drippy.createPlaylist(this.playlist_name);
            this.playlists = await drippy.getPlaylists();
        }
    }
};
</script>

<style lang="scss" scoped>
.playlist {
    min-height: 100%;

    .row {
        margin: 0px;
    }

    .v-image {
        transition: opacity 0.4s ease-in-out;
    }
}

.playlist:hover {
    .v-image {
        opacity: 0.6;
    }
}
</style>