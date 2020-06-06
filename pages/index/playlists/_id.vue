<template>
    <playlist
        v-bind:name="name"
        v-bind:creator="creator"
        v-bind:song_list="song_list"
        v-bind:artworks="artworks"
        v-bind:user_playlist="user_playlist"
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
        artworks: [],
        user_playlist: false
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
                this.user_playlist = playlist.owner.id === this.$drippy.user.profile.id;
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