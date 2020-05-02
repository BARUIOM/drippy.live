<template>
    <div>
        <v-app-bar class="hidden-md-and-up" app>
            <v-btn icon @click.stop="drawer = !drawer">
                <v-icon>mdi-menu</v-icon>
            </v-btn>
        </v-app-bar>

        <v-navigation-drawer class="hidden-sm-and-down" permanent expand-on-hover app>
            <drawer />
        </v-navigation-drawer>

        <v-navigation-drawer v-model="drawer" absolute temporary>
            <drawer />
        </v-navigation-drawer>

        <v-content fill-height class="overflow-y-auto">
            <v-container fluid>
                <nuxt-child />
            </v-container>
        </v-content>

        <player />

        <v-dialog v-model="dialog">
            <v-card>
                <v-card-title class="justify-center">Add track to playlist</v-card-title>
                <v-card-text>
                    <playlists v-bind:track="track" @event="add" />
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import drawer from '~/components/drawer'
import player from '~/components/player'
import playlists from '~/components/playlists'

export default {
    components: { drawer, player, playlists },
    data: () => ({
        track: {},
        message: '',
        drawer: false,
        dialog: false
    }),
    mounted() {
        this.$root.$on('add', track => {
            this.track = track;
            this.dialog = true;
        });
    },
    methods: {
        add(playlist, track) {
            this.dialog = false;
            this.$drippy.addTrackToPlaylist(playlist.id, track).then(() => {
                this.$root.$emit('snackbar', `'${track.name}' added to playlist ${playlist.name}`, 'success', true);
            });
        }
    }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 960px) {
    .v-content {
        margin-top: 56px;
        padding: 0 !important;
        max-height: calc(100vh - 128px) !important;
    }
}

@media screen and (min-width: 960px) {
    .v-content {
        padding-top: 0px !important;
    }
}

.v-app-bar {
    left: 0px !important;
}

.v-content {
    max-height: calc(100vh - 72px);
}
</style>