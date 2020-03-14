<template>
    <v-simple-table v-if="song_list.length">
        <thead>
            <tr>
                <th></th>
                <th class="text-left">Title</th>
                <th class="text-left">Artist</th>
                <th class="text-left">Album</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="(item, index) in song_list"
                :key="index + '-' + String(item.data)"
                @click="$emit('selected-track', item)"
                class="table-item"
            >
                <td class="song-artwork">
                    <v-avatar size="32" tile>
                        <v-img :src="item.artwork_url" />
                    </v-avatar>
                </td>
                <td>{{ item.title }}</td>
                <td>{{ item.artists.join(', ') }}</td>
                <td>{{ item.album }}</td>
                <td class="song-options">
                    <v-menu transition="slide-x-transition" bottom right>
                        <template v-slot:activator="{ on }">
                            <v-btn icon v-on.stop="on">
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>

                        <v-list>
                            <v-dialog v-model="dialog">
                                <template v-slot:activator="{ on }">
                                    <v-list-item v-on="on">
                                        <v-list-item-title>Add to playlist</v-list-item-title>
                                    </v-list-item>
                                </template>

                                <Dialog :track="item" @playlist-action="addToPlaylist" />
                            </v-dialog>
                        </v-list>
                    </v-menu>
                </td>
            </tr>
        </tbody>
    </v-simple-table>
</template>

<script>
import drippy from "../plugins/drippy.js";
import Dialog from "./PlaylistsDialog";

export default {
    name: 'SongTable',
    components: { Dialog },
    props: {
        song_list: Array
    },
    data: () => ({
        dialog: false
    }),
    methods: {
        async addToPlaylist(playlist, track) {
            this.dialog = false;
            await drippy.addTrackToPlaylist(playlist.id, track.data);
        }
    }
}
</script>

<style lang="scss" scoped>
.song-artwork,
.song-options {
    width: 32px;
}

.table-item {
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -ms-user-select: none;
}
</style>