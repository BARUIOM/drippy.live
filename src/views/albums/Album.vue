<template>
    <Playlist
        v-bind:name="name"
        v-bind:artists="artists"
        v-bind:song_list="song_list"
        v-bind:artworks="artworks"
        hide-album
        hide-artwork
    />
</template>

<script>
import Playlist from '@/components/misc/Playlist'

export default {
    components: { Playlist },
    data: () => ({
        name: '',
        artists: [],
        song_list: [],
        artworks: []
    }),
    mounted() {
        this.load(this.$route.params["id"]).then(() => {
            if (this.$route.query['highlight']) {
                const track = this.song_list.find(e => e['id'] === this.$route.query['highlight']);
                if (this.$player.playlist !== this.song_list)
                    this.$player.playlist = this.song_list;

                this.$player.play(this.song_list.indexOf(track));
                this.$router.replace({});
            }
        });
    },
    methods: {
        async load(id) {
            const album = await this.$drippy.getAlbum(id);

            this.name = album.name;
            this.artists = [...album.artists];
            this.song_list = [...album.tracks.items];
            this.artworks = [this.$drippy.getPicture(album, 0)];
        }
    },
    watch: {
        $route(to, from) {
            this.load(to.params['id']);
        }
    }
}
</script>