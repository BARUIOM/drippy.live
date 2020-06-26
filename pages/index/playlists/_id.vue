<template>
    <Playlist
        v-bind:name="name"
        v-bind:author="author"
        v-bind:song_list="song_list"
        v-bind:artworks="artworks"
        v-bind:user_playlist="user_playlist"
    />
</template>

<script>
import Playlist from '@/components/misc/Playlist'

export default {
    components: { Playlist },
    data: () => ({
        name: '',
        author: '',
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
                this.author = playlist.owner.display_name;
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