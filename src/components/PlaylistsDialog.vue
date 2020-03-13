<template>
    <v-card>
        <v-card-title class="headline" primary-title>Add song to playlist</v-card-title>

        <v-card-text>
            <Playlists action_icon="mdi-plus" v-bind:track="track" @playlist-action="action" />
        </v-card-text>
    </v-card>
</template>

<script>
import Playlists from "./Playlists";

export default {
    name: 'PlaylistsDialog',
    components: { Playlists },
    props: {
        track: Object
    },
    methods: {
        action(playlist, track) {
            this.$emit('playlist-action', playlist, track);
        }
    }
}
</script>