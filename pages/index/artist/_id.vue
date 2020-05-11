<template>
    <v-row dense>
        <v-col cols="12">
            <v-card>
                <v-container fluid>
                    <v-row no-gutters dense>
                        <v-col cols="auto">
                            <v-avatar size="128" tile>
                                <v-img :src="getPicture(artist)"></v-img>
                            </v-avatar>
                        </v-col>
                        <v-col cols="6">
                            <v-card-title class="display-1 text-truncate" v-text="artist.name"></v-card-title>
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
        <v-col cols="12" v-if="artist.albums.length">
            <v-card>
                <v-card-title class="headline">Albums</v-card-title>
                <albums v-bind:albums="artist.albums" />
            </v-card>
        </v-col>
        <v-col cols="12" v-if="artist.singles.length">
            <v-card>
                <v-card-title class="headline">Singles & EPs</v-card-title>
                <albums v-bind:albums="artist.singles" />
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import albums from '~/components/albums'

export default {
    components: { albums },
    data: () => ({
        artist: {
            albums: [],
            singles: []
        }
    }),
    mounted() {
        this.$drippy.getArtist(this.$route.params["id"]).then(artist => this.artist = artist);
    },
    methods: {
        getPicture(artist) {
            if (artist.images && artist.images.length) {
                return artist.images[0].url;
            }
            return '/images/account-music.png';
        }
    }
}
</script>