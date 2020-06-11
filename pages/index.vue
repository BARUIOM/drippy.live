<template>
    <div>
        <v-app-bar class="hidden-md-and-up" scroll-target="#content" hide-on-scroll app>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </v-app-bar>

        <v-navigation-drawer class="hidden-sm-and-down" permanent expand-on-hover app>
            <drawer v-bind:profile="profile" v-bind:playlists="playlists" />
        </v-navigation-drawer>

        <v-navigation-drawer v-model="drawer" absolute temporary>
            <drawer v-bind:profile="profile" v-bind:playlists="playlists" />
        </v-navigation-drawer>

        <player />

        <v-content id="content" class="overflow-y-auto">
            <v-container class="pa-0 overflow-hidden" margin fluid>
                <nuxt-child />
            </v-container>
        </v-content>

        <queue ref="queue" />
        <addtracks ref="add_tracks" @selected="add" v-bind:playlists="playlists.user" />
        <newplaylist ref="new_playlist" @submit="createPlaylist" />
    </div>
</template>

<script>
import drawer from '~/components/drawer'
import player from '~/components/player'
import queue from '~/components/queue'
import addtracks from '~/components/addtracks'
import newplaylist from '~/components/newplaylist'

export default {
    components: { drawer, player, queue, addtracks, newplaylist },
    data: () => ({
        profile: {},
        playlists: {},
        drawer: false
    }),
    mounted() {
        this.$drippy.getProfile().then(profile => this.profile = profile);
        this.$drippy.getPlaylists().then(playlists => this.playlists = playlists);
        this.$root.$on('queue', () => this.$refs['queue'].$emit('show'));
        this.$root.$on('create', () => this.$refs['new_playlist'].$emit('show'));
        this.$root.$on('add', tracks => this.$refs['add_tracks'].$emit('show', tracks));
    },
    methods: {
        add(playlist, tracks) {
            this.$drippy.addTracksToPlaylist(playlist.id, tracks).then(() => {
                this.$root.$emit('snackbar', `Tracks were added to playlist ${playlist.name}`, 'success', true);
            });
        },
        createPlaylist(name) {
            this.$drippy.createPlaylist(name).then(async () => {
                this.playlists = await this.$drippy.getPlaylists();
                this.$root.$emit('snackbar', `Playlist '${name}' created!`, 'success', true);
            });
        }
    }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 960px) {
    .v-content {
        padding: 0 !important;

        .container.margin {
            margin-top: 56px !important;
        }
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

.v-navigation-drawer {
    background-color: #212121 !important;
}
</style>