<template>
    <v-container fluid>
        <v-row dense class="ma-0">
            <v-col v-for="(album, i) in albums" :key="i" align="center" cols="6" md="4" lg="2">
                <v-card elevation="4" link :to="{ name: 'album', params: { id: album.id } }">
                    <v-img class="align-end" :src="album.artwork_url">
                        <v-card-title class="title text-truncate" v-text="album.name"></v-card-title>
                    </v-img>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'Albums',
    props: {
        albums: Array
    }
}
</script>

<style lang="scss" scoped>
.title {
    background-image: linear-gradient(to bottom, transparent, black);
}
</style>