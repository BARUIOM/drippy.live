<template>
    <v-row dense>
        <v-col cols="12">
            <v-card>
                <v-container fluid>
                    <v-row no-gutters dense>
                        <v-col cols="auto">
                            <v-avatar size="128" tile>
                                <v-img :src="artist_info.picture"></v-img>
                            </v-avatar>
                        </v-col>
                        <v-col cols="6">
                            <v-card-title class="display-1 text-truncate" v-text="artist_info.name"></v-card-title>
                            <v-spacer></v-spacer>
                            <v-card-actions>
                                <v-btn icon>
                                    <v-icon>mdi-dots-horizontal</v-icon>
                                </v-btn>
                                <v-btn text>Follow</v-btn>
                            </v-card-actions>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-col>
        <v-col cols="12" v-if="artist_info.albums.length">
            <v-card>
                <v-card-title class="headline">Albums</v-card-title>
                <albums v-bind:albums="artist_info.albums" />
            </v-card>
        </v-col>
        <v-col cols="12" v-if="artist_info.singles.length">
            <v-card>
                <v-card-title class="headline">Singles & EPs</v-card-title>
                <albums v-bind:albums="artist_info.singles" />
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import albums from '~/components/albums'

export default {
    components: { albums },
    data: () => ({
        artist_info: {
            albums: [],
            singles: []
        }
    }),
    mounted() {
        this.$drippy.getArtist(this.$route.params["id"]).then(artist => this.artist_info = artist);
    }
}
</script>