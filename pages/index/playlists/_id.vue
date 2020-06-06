<template>
    <playlist
        v-bind:name="name"
        v-bind:creator="creator"
        v-bind:song_list="song_list"
        v-bind:artworks="artworks"
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
        this.load(this.$route.params["id"]);
    },
    methods: {
        load(id) {
            this.$drippy.getPlaylist(id).then(playlist => {
                this.name = playlist.name;
                this.creator = playlist.owner.display_name;
                this.song_list = [...playlist.tracks.items.map(e => e.track)];
                this.artworks = [this.$drippy.getPicture(playlist, 0)];
            });
        }
    },
    watch: {
        $route(to, from) {
            this.load(to.params['id']);
        }
    }
}
</script>