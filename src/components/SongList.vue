<template>
    <v-list v-if="song_list.length" three-line>
        <template v-for="(item, index) in song_list">
            <v-list-item :key="index + '-' + String(item.data)" @click="$emit('selected-track', item)">
                <v-list-item-avatar tile size="64">
                    <v-img :src="item.artwork_url" />
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                    <v-list-item-subtitle v-text="item.album"></v-list-item-subtitle>
                    <v-list-item-subtitle v-text="item.artists.join(', ')"></v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-divider :key="index"></v-divider>
        </template>
    </v-list>
</template>

<script>
export default {
    name: 'SongList',
    props: {
        song_list: Array
    }
}
</script>