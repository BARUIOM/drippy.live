<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <v-card>
                    <v-container class="d-flex flex-no-wrap" fluid>
                        <v-avatar size="128" tile>
                            <v-img :src="artist_info.picture"></v-img>
                        </v-avatar>

                        <v-row align="end" class="mx-2">
                            <v-card-title class="display-1 text-truncate" v-text="artist_info.name"></v-card-title>
                            <v-spacer></v-spacer>
                            <v-card-actions>
                                <v-btn icon>
                                    <v-icon>mdi-dots-horizontal</v-icon>
                                </v-btn>
                                <v-btn text>Follow</v-btn>
                            </v-card-actions>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
            <v-col cols="12" v-if="artist_info.albums.length">
                <v-card>
                    <v-card-title class="headline">Albums</v-card-title>
                    <Albums v-bind:albums="artist_info.albums" />
                </v-card>
            </v-col>
            <v-col cols="12" v-if="artist_info.singles.length">
                <v-card>
                    <v-card-title class="headline">Singles & EPs</v-card-title>
                    <Albums v-bind:albums="artist_info.singles" />
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import drippy from "../plugins/drippy.js";
import Albums from "./Albums";

export default {
    name: 'Artist',
    components: { Albums },
    data: () => ({
        artist_info: {
            albums: [],
            singles: []
        }
    }),
    mounted() {
        drippy.getArtist(this.$route.params["id"]).then(artist => this.artist_info = artist);
    }
}
</script>
