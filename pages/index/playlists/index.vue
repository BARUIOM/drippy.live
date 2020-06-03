<template>
    <v-container fluid>
        <playlists @event="open" />
    </v-container>
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