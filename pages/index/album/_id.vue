<template>
    <playlist
        v-bind:name="name"
        v-bind:creator="creator"
        v-bind:song_list="song_list"
        v-bind:artworks="artworks"
        hide-album
        hide-artwork
    />
</template>

<script>
import playlist from '~/components/playlist'

export default {
    components: { playlist },
    data: () => ({
        name: '',
        creator: '',
        song_list: [],
        artworks: []
    }),
    mounted() {
        this.$drippy.getAlbum(this.$route.params["id"]).then(album => {
            this.name = album.name;
            this.creator = album.artist;
            this.song_list = [...album.tracks];
            this.artworks = [this.song_list[0].artwork_url];
        });
    }
}
</script>