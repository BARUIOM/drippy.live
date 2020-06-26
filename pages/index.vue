<template>
    <div>
        <v-app-bar class="hidden-md-and-up" scroll-target="#content" hide-on-scroll app>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-spacer></v-spacer>
            <v-btn @click="$root.$emit('queue')" icon>
                <v-icon>mdi-menu-open</v-icon>
            </v-btn>
        </v-app-bar>

        <v-navigation-drawer
            v-model="drawer"
            :mini-variant.sync="mini"
            :temporary="$vuetify.breakpoint.mobile"
            :permanent="!$vuetify.breakpoint.mobile"
            app
        >
            <drawer v-bind:profile="profile" v-bind:playlists="playlists">
                <v-btn v-if="!$vuetify.breakpoint.mobile" @click.stop="mini = !mini" icon>
                    <v-icon>mdi-chevron-double-left</v-icon>
                </v-btn>
            </drawer>
        </v-navigation-drawer>

        <v-main id="content" class="overflow-y-auto">
            <v-container class="pa-0 overflow-hidden" margin fluid>
                <nuxt-child />
            </v-container>
        </v-main>

        <queue />
        <player />
        <addtracks @selected="add" v-bind:playlists="playlists.user" />
        <newplaylist @submit="createPlaylist" />
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
        _mini: true,
        profile: {},
        playlists: {},
        drawer: false
    }),
    mounted() {
        this.$drippy.getProfile().then(async profile => {
            this.profile = profile;
            this.playlists = await this.$drippy.getPlaylists();
        });
    },
    methods: {
        add(playlist, tracks) {
            this.$drippy.addTracksToPlaylist(playlist.id, tracks).then(() => {
                this.$root.$emit('snackbar', `Tracks were added to playlist ${playlist.name}`, 'success', true);
            });
        },
        createPlaylist(name) {
            this.$drippy.createPlaylist(name).then(() => {
                this.$root.$emit('snackbar', `Playlist '${name}' created!`, 'success', true);
            });
        }
    },
    computed: {
        mini: {
            get() {
                if (this.$vuetify.breakpoint.mobile)
                    return false;
                return this.$data._mini;
            },
            set(value) {
                if (!this.$vuetify.breakpoint.mobile)
                    this.$data._mini = value;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 960px) {
    .v-main {
        padding: 0 !important;

        .container.margin {
            margin-top: 56px !important;
        }
    }
}

@media screen and (min-width: 960px) {
    .v-main {
        padding-top: 0px !important;
    }

    .v-navigation-drawer {
        max-height: calc(100vh - 72px) !important;
    }
}

.v-app-bar {
    left: 0px !important;
}

.v-main {
    max-height: calc(100vh - 72px);
}

.v-navigation-drawer {
    background-color: #212121 !important;
}
</style>