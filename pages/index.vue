<template>
    <div>
        <v-app-bar scroll-target="#content" hide-on-scroll dense app>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <portal-target name="header" />
            <v-btn @click="$root.$emit('queue')" icon>
                <v-icon>mdi-menu-open</v-icon>
            </v-btn>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" :temporary="$vuetify.breakpoint.mobile" app>
            <Drawer>
                <Playlists v-bind:playlists="playlists.user" />
                <v-divider class="my-1"></v-divider>
                <Playlists v-bind:playlists="playlists.liked" />
            </Drawer>
        </v-navigation-drawer>

        <v-main id="content" class="overflow-y-auto">
            <v-container class="pa-0 overflow-hidden" margin fluid>
                <nuxt-child />
            </v-container>
        </v-main>

        <Queue />
        <Player />
        <AddTracks @selected="add" v-bind:playlists="playlists.user" />
        <NewPlaylist @submit="createPlaylist" />
    </div>
</template>

<script>
import Drawer from '@/components/home/Drawer'
import Playlists from '@/components/home/Playlists';
import AddTracks from '@/components/home/AddTracks'
import NewPlaylist from '@/components/home/NewPlaylist'
import Player from '@/components/player/Player'
import Queue from '@/components/player/Queue'

export default {
    components: { Drawer, Playlists, AddTracks, NewPlaylist, Player, Queue },
    data: () => ({
        profile: {},
        playlists: { user: [], liked: [] },
        drawer: false
    }),
    mounted() {
        this.$root.$on('remove', async (playlist, track) => {
            await this.$drippy.removeTrackFromPlaylist(playlist.id, track);
            this.playlists.user.find(e => e['id'] === playlist.id).tracks.total--;
            this.$root.$emit('snackbar', 'Track removed from playlist', 'success', true);
        });

        this.$drippy.getProfile().then(async profile => {
            this.profile = profile;
            const playlists = await this.$drippy.getPlaylists();

            playlists.filter(e => e['owner'].id === profile['id']).forEach(playlist => {
                this.playlists.user.push(playlist);
            });
            playlists.filter(e => e['owner'].id !== profile['id']).forEach(playlist => {
                this.playlists.liked.push(playlist);
            });
        });
    },
    methods: {
        add(playlist, tracks) {
            this.$drippy.addTracksToPlaylist(playlist.id, tracks).then(() => {
                this.playlists.user.find(e => e['id'] === playlist.id).tracks.total++;
                this.$root.$emit('snackbar', `Tracks were added to playlist '${playlist.name}'`, 'success', true);
            });
        },
        createPlaylist(name) {
            this.$drippy.createPlaylist(name).then(playlist => {
                this.playlists.user.unshift(playlist);
                this.$root.$emit('snackbar', `Playlist '${name}' created!`, 'success', true);
            });
        }
    }
}
</script>

<style lang="scss" scoped>
@media screen and (min-width: 960px) {
    .v-navigation-drawer {
        max-height: calc(100vh - 72px) !important;
    }
}

.v-main {
    max-height: calc(100vh - 72px);
}

.v-navigation-drawer {
    background-color: #212121 !important;
}

.vue-portal-target {
    width: 100%;
}
</style>