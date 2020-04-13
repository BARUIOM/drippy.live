<template>
    <v-list nav dense>
        <v-list-item link to="/search" exact>
            <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
        </v-list-item>

        <v-list-item link to="/playlists" exact>
            <v-list-item-icon>
                <v-icon>mdi-playlist-music</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Playlists</v-list-item-title>
        </v-list-item>
    </v-list>
</template>

<script>
export default {
    name: 'Drawer',
    data: () => ({})
}
</script>