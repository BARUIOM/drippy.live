<template>
    <v-container fluid>
        <v-row dense>
            <v-col v-for="(album, i) in albums" :key="i" align="center" cols="6" md="4" lg="2">
                <div v-ripple class="album elevation-4" @click="open(album.id)">
                    <v-img :src="album.artwork_url"></v-img>
                </div>
                <div class="py-3 subtitle-1 font-weight-bold" v-text="album.name"></div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'Albums',
    props: {
        albums: Array
    },
    methods: {
        open(id) {
            this.$router.push({ name: 'index-album-id', params: { id } });
        }
    }
}
</script>

<style lang="scss" scoped>
.album {
    cursor: pointer;
}
</style>