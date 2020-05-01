<template>
    <playlists @event="open" />
</template>

<script>
import playlists from '~/components/playlists'
export default {
    components: { playlists },
    methods: {
        open(playlist) {
            this.$router.push({ name: 'index-playlists-id', params: { id: playlist.id } });
        }
    }
}
</script>