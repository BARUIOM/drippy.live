<template>
    <v-layout class="d-flex flex-column overflow-hidden" justify-space-between fill-height>
        <v-row no-gutters dense>
            <v-col cols="12">
                <v-list nav dense>
                    <v-list-item link to="/" exact>
                        <v-list-item-icon>
                            <v-icon>mdi-home</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item>
                    <v-list-item link to="/collection" exact>
                        <v-list-item-icon>
                            <v-icon>mdi-view-list</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Library</v-list-item-title>
                    </v-list-item>
                </v-list>
                <v-subheader>
                    <span>Playlists</span>
                    <v-spacer></v-spacer>
                    <v-btn @click="$root.$emit('create')" icon>
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-subheader>
            </v-col>
            <v-col cols="12">
                <v-list class="playlists overflow-y-auto" subheader nav dense>
                    <Playlists v-bind:playlists="playlists.user" v-bind:tooltip="!visible" />
                    <v-divider class="my-1"></v-divider>
                    <Playlists v-bind:playlists="playlists.liked" v-bind:tooltip="!visible" />
                </v-list>
                <v-divider></v-divider>
            </v-col>
        </v-row>
        <v-list-item class="px-2" @click="$root.$emit('logout')">
            <v-list-item-avatar>
                <v-icon color="red">mdi-exit-to-app</v-icon>
            </v-list-item-avatar>

            <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
    </v-layout>
</template>

<script>
import Playlists from './Playlists';

export default {
    props: {
        visible: Boolean,
        playlists: {
            type: Object,
            default: () => ({ user: [], liked: [] })
        }
    },
    components: { Playlists }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 960px) {
    .playlists {
        max-height: calc(100vh - 200px);
    }
}

@media screen and (min-width: 960px) {
    .playlists {
        max-height: calc(100vh - 272px);
    }
}

* {
    scrollbar-color: #363636 transparent !important;
}

::-webkit-scrollbar-thumb {
    background: #363636 !important;
}
</style>