<template>
    <v-simple-table v-if="song_list.length">
        <thead>
            <tr>
                <th></th>
                <th class="text-left">Title</th>
                <th class="text-left">Artist</th>
                <th class="text-left">Album</th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="(item, index) in song_list"
                :key="index + '-' + String(item.data)"
                @click="play(item)"
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
            </tr>
        </tbody>
    </v-simple-table>
</template>

<script>
export default {
    name: 'SongTable',
    props: {
        song_list: Array
    },
    methods: {
        play(song) {
            this.$root.$emit('playback_started', song);
        }
    }
}
</script>

<style lang="scss" scoped>
.song-artwork {
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