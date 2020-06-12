<template>
    <v-card flat tile>
        <v-container fluid>
            <v-row no-gutters>
                <v-col cols="12" sm="4" lg="2" class="elevation-10">
                    <div class="d-flex flex-row flex-wrap">
                        <v-img v-for="(item, i) in artworks" :key="i" :src="item"></v-img>
                    </div>
                </v-col>
                <v-col cols="12" sm="8" lg="10">
                    <v-card-title class="display-1 font-weight-bold" v-text="name"></v-card-title>
                    <v-card-subtitle v-if="artists.length" class="title">
                        <ArtistHyperlink v-bind:artists="artists" separator="•" spacer />
                    </v-card-subtitle>
                    <v-card-subtitle v-else class="title" v-text="author"></v-card-subtitle>
                    <v-card-actions>
                        <v-btn icon>
                            <v-icon>mdi-heart-outline</v-icon>
                        </v-btn>
                        <v-btn icon>
                            <v-icon>mdi-dots-horizontal</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-col>
            </v-row>
        </v-container>
        <songlist
            v-bind:song_list="song_list"
            v-bind:hideAlbum="hideAlbum"
            v-bind:hideArtwork="hideArtwork"
            v-bind:user_playlist="user_playlist"
        />
    </v-card>
</template>

<script>
import songlist from './songlist'
import ArtistHyperlink from './ArtistHyperlink'

export default {
    components: { songlist, ArtistHyperlink },
    props: {
        name: String,
        author: String,
        song_list: Array,
        artworks: Array,
        user_playlist: {
            type: Boolean,
            default: false
        },
        hideAlbum: {
            type: Boolean,
            default: false
        },
        hideArtwork: {
            type: Boolean,
            default: false
        },
        artists: {
            type: Array,
            default: () => ([])
        }
    }
};
</script>

<style lang="scss" scoped>
.v-image:not(:only-child) {
    max-width: 50%;
}
</style>