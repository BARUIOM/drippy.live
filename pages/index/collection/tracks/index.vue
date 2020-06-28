<template>
    <Playlist
        name="Liked Songs"
        :artworks="['/images/thumb-up.png']"
        :author="$drippy.user.profile.name"
        v-bind:song_list="song_list"
    />
</template>

<script>
import Playlist from '@/components/misc/Playlist'

export default {
    components: { Playlist },
    data: () => ({
        song_list: []
    }),
    mounted() {
        this.$drippy.getSavedTracks().then(tracks => this.song_list = tracks);
    }
}
</script>