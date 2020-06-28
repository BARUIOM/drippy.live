<template>
    <div>
        <v-list-item
            v-for="(item, i) in playlists"
            :to="{ name: 'index-playlists-id', params: { id: item.id } }"
            :key="'u' + i"
        >
            <v-list-item-icon class="icon">
                <v-icon>mdi-playlist-music</v-icon>
            </v-list-item-icon>
            <v-list-item-title v-text="item.name"></v-list-item-title>
        </v-list-item>
    </div>
</template>

<script>
export default {
    props: {
        playlists: Array
    }
}
</script>