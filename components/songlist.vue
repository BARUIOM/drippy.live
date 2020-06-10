<template>
    <v-list v-if="song_list.length" class="pa-0" color="accent" two-line>
        <v-hover v-for="(item, index) in song_list" :key="'i' + index" v-slot:default="{ hover }">
            <v-list-item :id="item.id" @click="$player.play(item, song_list)">
                <v-list-item-avatar v-if="!hideArtwork" class="elevation-4" size="48" tile>
                    <v-img :src="$drippy.getPicture(item.album, 2)" />
                </v-list-item-avatar>
                <v-list-item-avatar v-else size="48">
                    <v-icon v-if="!hover">mdi-music-note-eighth-dotted</v-icon>
                    <v-icon v-else>mdi-play</v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title class="ma-0 pb-1" v-text="item.name"></v-list-item-title>
                    <v-list-item-subtitle class="pt-1">
                        <ArtistHyperlink v-bind:artists="item.artists" />
                        <span v-if="!hideAlbum" class="mx-1">•</span>
                        <span v-if="!hideAlbum">{{ item.album.name }}</span>
                    </v-list-item-subtitle>
                </v-list-item-content>
                <v-menu v-model="item.menu" offset-y>
                    <template v-slot:activator="{ on }">
                        <v-btn v-on="on" icon>
                            <v-icon v-if="item.menu || hover">mdi-dots-vertical</v-icon>
                        </v-btn>
                    </template>
                    <v-list class="py-1" dense>
                        <v-list-item @click.stop="$root.$emit('add', [item])">
                            <v-list-item-title>Add track to playlist</v-list-item-title>
                        </v-list-item>
                        <v-list-item v-if="user_playlist" @click.stop="remove(item, index)">
                            <v-list-item-title>Remove track from this playlist</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="copy(item)">
                            <v-list-item-title>Copy track link</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-list-item>
        </v-hover>
    </v-list>
</template>

<script>
import ArtistHyperlink from './ArtistHyperlink'

export default {
    props: {
        song_list: Array,
        user_playlist: Boolean,
        hideAlbum: {
            type: Boolean,
            default: false
        },
        hideArtwork: {
            type: Boolean,
            default: false
        }
    },
    components: { ArtistHyperlink },
    data: () => ({
        menu: false
    }),
    methods: {
        remove(track, index) {
            this.$drippy.removeTrackFromPlaylist(this.$route.params['id'], track).then(() => {
                this.song_list.splice(index, 1);
            });
        },
        copy(track) {
            navigator.clipboard.writeText(`${window.location.origin}/track/${track.id}`).then(() => {
                this.$root.$emit('snackbar', 'Track link copied to clipboard!', 'success', true);
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.v-card {
    .v-list-item {
        height: 64px;
    }
}
</style>