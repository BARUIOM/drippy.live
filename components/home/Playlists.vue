<template>
    <div>
        <template v-for="(item, i) in playlists">
            <v-tooltip :disabled="!tooltip" :key="'u' + i" transition="slide-x-transition" right>
                <template v-slot:activator="{ on }">
                    <v-list-item
                        :to="{ name: 'index-playlists-id', params: { id: item.id } }"
                        v-on="on"
                    >
                        <v-list-item-icon class="icon">
                            <v-icon>mdi-playlist-music</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title v-text="item.name"></v-list-item-title>
                    </v-list-item>
                </template>

                <span v-text="item.name"></span>
            </v-tooltip>
        </template>
    </div>
</template>

<script>
export default {
    props: {
        playlists: Array,
        tooltip: Boolean
    }
}
</script>