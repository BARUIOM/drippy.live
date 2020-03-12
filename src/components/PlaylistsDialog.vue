<template>
    <v-container no-gutters>
        <v-row dense>
            <v-col v-for="item in playlists" :key="item.name" class="mb-2" align="center" cols="6" sm="4" md="3" lg="2" xl="2">
                <v-hover v-slot:default="{ hover }">
                    <v-card class="playlist" @click="select(item.id)">
                        <v-img src="https://img.icons8.com/nolan/192/music.png">
                            <v-row></v-row>
                            <v-row align="center" justify="center">
                                <v-icon v-if="hover" size="64">mdi-plus</v-icon>
                            </v-row>
                            <v-row>
                                <v-card-title class="text-no-wrap" v-text="item.name"></v-card-title>
                            </v-row>
                        </v-img>
                    </v-card>
                </v-hover>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import drippy from "../plugins/drippy.js";

export default {
    name: "PlaylistsDialog",
    data: () => ({
        playlists: []
    }),
    async mounted() {
        this.playlists = await drippy.getPlaylists();
    },
    methods: {
        select(playlist_id) {
            this.$emit("selected", playlist_id);
        }
    }
};
</script>

<style lang="scss" scoped>
.container {
    max-width: 100%;
}

.v-image {
    transition: opacity 0.4s ease-in-out;

    .row {
        min-height: 64px;
        max-height: 64px;
        max-width: 192px;
    }
}

.playlist {
    max-width: 192px;
}

.playlist:hover {
    .v-image {
        opacity: 0.6;
    }
}
</style>