<template>
    <v-row dense>
        <v-col cols="6" sm="4" lg="2">
            <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on }">
                    <v-card elevation="5" v-on="on">
                        <v-img src="/images/playlist-plus@4x.png">
                            <v-card-title>New playlist</v-card-title>
                        </v-img>
                    </v-card>
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
        </v-col>

        <v-col v-for="item in playlists" :key="item.id" cols="6" sm="4" lg="2">
            <v-card elevation="5" @click="$emit('event', item, track)">
                <v-img src="/images/music-box-multiple-outline@4x.png">
                    <v-card-title class="text-no-wrap" v-text="item.name"></v-card-title>
                </v-img>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>

export default {
    props: {
        track: Object
    },
    data: () => ({
        dialog: false,
        playlists: [],
        playlist_name: ''
    }),
    mounted() {
        this.$drippy.getPlaylists().then(playlists => this.playlists = playlists);
    },
    methods: {
        async createPlaylist() {
            this.dialog = false;
            await this.$drippy.createPlaylist(this.playlist_name);
            this.playlists = await this.$drippy.getPlaylists();
        }
    }
}
</script>