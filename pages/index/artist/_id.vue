<template>
    <v-row dense>
        <v-col class="pa-0" cols="12">
            <v-card color="accent" elevation="0" tile>
                <v-container fluid>
                    <v-row no-gutters dense>
                        <v-col cols="auto">
                            <v-avatar class="elevation-8" size="128" tile>
                                <v-img
                                    :src="$drippy.getPicture(artist, 1, '/images/account-music.png')"
                                ></v-img>
                            </v-avatar>
                        </v-col>
                        <v-col cols="6">
                            <v-card-title
                                class="display-1 text-truncate font-weight-bold"
                                v-text="artist.name"
                            ></v-card-title>
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
        <v-col class="pa-0" cols="12" v-if="artist.albums.length">
            <v-card color="accent" elevation="0" tile>
                <v-card-title class="headline font-weight-bold">Albums</v-card-title>
                <v-divider></v-divider>
                <albums v-bind:albums="artist.albums" />
            </v-card>
        </v-col>
        <v-col class="pa-0" cols="12" v-if="artist.singles.length">
            <v-card color="accent" elevation="0" tile>
                <v-card-title class="headline font-weight-bold">Singles & EPs</v-card-title>
                <v-divider></v-divider>
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
    }
}
</script>