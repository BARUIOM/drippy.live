<template>
    <v-overlay v-model="visible" color="black" opacity="0.9" z-index="100">
        <v-container class="py-0 overflow-y-auto" fluid>
            <v-row>
                <v-col cols="12" align="center">
                    <v-btn @click="visible = false" color="transparent" fab>
                        <v-icon size="48">mdi-close</v-icon>
                    </v-btn>
                </v-col>
                <v-col cols="12">
                    <div class="text-center">
                        <span class="display-2 font-weight-bold">Add to playlist</span>
                    </div>
                </v-col>
                <v-col cols="12" align="center">
                    <v-btn @click="$root.$emit('create')" color="orange" rounded>Create playlist</v-btn>
                </v-col>
                <v-col v-for="(playlist, i) in playlists" :key="i" cols="6" sm="4" md="2">
                    <div
                        @click="visible = false; $emit('selected', playlist, tracks)"
                        class="elevation-4"
                        v-ripple
                    >
                        <v-img aspect-ratio="1" :src="$drippy.getPicture(playlist, 0)"></v-img>
                    </div>
                    <div class="pt-3 text-center">
                        <span class="subtitle-1 font-weight-bold" v-text="playlist.name"></span>
                    </div>
                    <div class="pb-2 text-center">
                        <span class="subtitle-2 grey--text">{{ playlist.tracks.total }} songs</span>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </v-overlay>
</template>

<script>
export default {
    props: {
        playlists: Array
    },
    data: () => ({
        tracks: [{}],
        visible: false
    }),
    mounted() {
        this.$root.$on('add', tracks => {
            this.visible = true;
            this.tracks = tracks;
        });
    }
}
</script>

<style lang="scss" scoped>
.container {
    min-width: 100vw;
    max-height: 100vh;
}

.v-image {
    background-color: #282828;
}
</style>