<template>
    <playlist
        v-bind:name="name"
        v-bind:artists="artists"
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
        artists: [],
        song_list: [],
        artworks: []
    }),
    mounted() {
        this.$drippy.getAlbum(this.$route.params["id"]).then(album => {
            this.name = album.name;
            this.artists = [...album.artists];
            this.song_list = [...album.tracks.items];
            this.artworks = [this.$drippy.getPicture(album, 0)];

            if (this.$route.query['highlight']) {
                const track = this.song_list.find(e => e['id'] === this.$route.query['highlight']);
                this.$player.play(track, this.song_list);
                this.$router.replace({});
            }
        });
    }
}
</script>