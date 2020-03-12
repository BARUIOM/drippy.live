<template>
    <v-container no-gutters>
        <v-row dense>
            <v-col
                v-for="item in playlists"
                :key="item.name"
                class="mb-2"
                align="center"
                cols="6"
                sm="4"
                md="3"
                lg="2"
                xl="2"
            >
                <v-hover v-slot:default="{ hover }">
                    <v-card
                        max-width="192"
                        link
                        :to="{ name: 'playlist', params: { id: item.id }}"
                        exact
                    >
                        <v-img src="https://img.icons8.com/nolan/192/music.png" class="artwork">
                            <v-row></v-row>
                            <v-row align="center" justify="center">
                                <v-icon v-if="hover" size="64">mdi-play-circle-outline</v-icon>
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
import drippy from '../plugins/drippy.js'

export default {
    name: "Playlists",
    data: () => ({
        playlists: []
    }),
    async mounted() {
        this.playlists = await drippy.getPlaylists();
    }
};
</script>

<style lang="scss" scoped>
.container {
    max-width: 100%;
}

.artwork {
    color: white;
}

.v-image {
    transition: opacity 0.4s ease-in-out;

    .row {
        min-height: 64px;
        max-height: 64px;
        max-width: 192px;
    }
}

.v-card:hover {
    .v-image {
        opacity: 0.6;
    }
}
</style>