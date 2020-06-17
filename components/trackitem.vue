<template>
    <v-hover v-slot:default="{ hover }">
        <v-list-item @contextmenu.prevent="menu = true" @click="$emit('play')">
            <v-list-item-avatar v-if="!hideArtwork" class="elevation-4" size="48" tile>
                <v-img :src="$drippy.getPicture(track.album, 2)" />
            </v-list-item-avatar>
            <v-list-item-avatar v-else size="48">
                <v-icon v-if="!hover">mdi-music-note-eighth-dotted</v-icon>
                <v-icon v-else>mdi-play</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title class="ma-0 pb-1 body-1" v-text="track.name"></v-list-item-title>
                <v-list-item-subtitle class="pt-1">
                    <ArtistHyperlink v-bind:artists="track.artists" />
                    <span v-if="!hideAlbum" class="mx-1">•</span>
                    <span v-if="!hideAlbum">{{ track.album.name }}</span>
                </v-list-item-subtitle>
            </v-list-item-content>
            <v-menu v-model="menu" offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on" icon>
                        <v-icon v-if="menu || hover">mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>
                <v-list class="py-1" dense>
                    <slot></slot>
                </v-list>
            </v-menu>
        </v-list-item>
    </v-hover>
</template>

<script>
import ArtistHyperlink from './ArtistHyperlink'

export default {
    props: {
        track: Object,
        hideArtwork: Boolean,
        hideAlbum: Boolean
    },
    components: { ArtistHyperlink },
    data: () => ({
        menu: false
    })
}
</script>