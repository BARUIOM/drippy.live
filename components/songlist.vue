<template>
    <v-list v-if="song_list.length" class="pa-0" color="accent" two-line>
        <v-hover v-for="(item, index) in song_list" :key="'i' + index" v-slot:default="{ hover }">
            <v-list-item @click="$player.play(item, song_list)">
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
                        <span v-text="item.artists.map(e => e.name).join(', ')"></span>
                        <span v-if="!hideAlbum" class="mx-1">•</span>
                        <span v-if="!hideAlbum">{{ item.album.name }}</span>
                    </v-list-item-subtitle>
                </v-list-item-content>
                <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                        <v-btn v-on="on" icon>
                            <v-icon v-if="hover">mdi-dots-vertical</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item @click.stop="$root.$emit('add', item)">
                            <v-list-item-title>Add track to playlist</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-list-item>
        </v-hover>
    </v-list>
</template>

<script>
export default {
    props: {
        song_list: Array,
        hideAlbum: {
            type: Boolean,
            default: false
        },
        hideArtwork: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        menu: false
    })
}
</script>

<style lang="scss" scoped>
.v-list-item {
    height: 64px;
}
</style>