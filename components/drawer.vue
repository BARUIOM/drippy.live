<template>
    <v-layout class="d-flex flex-column overflow-hidden" justify-space-between fill-height>
        <div>
            <v-list-item v-if="Object.keys(profile).length" class="px-2">
                <v-list-item-avatar class="elevation-2">
                    <v-img v-if="profile.photo" :src="profile.photo"></v-img>
                    <v-icon v-else>mdi-account</v-icon>
                </v-list-item-avatar>

                <v-list-item-title v-text="profile.name"></v-list-item-title>
                <slot></slot>
            </v-list-item>

            <v-divider></v-divider>

            <v-list nav dense>
                <v-list-item link to="/" exact>
                    <v-list-item-icon>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Home</v-list-item-title>
                </v-list-item>
            </v-list>
            <v-subheader>
                <span>Playlists</span>
                <v-spacer></v-spacer>
                <v-btn @click="$root.$emit('create')" icon>
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </v-subheader>
            <v-list class="playlists overflow-y-auto" subheader nav dense>
                <v-list-item
                    v-for="(item, i) in playlists.user"
                    :to="{ name: 'index-playlists-id', params: { id: item.id } }"
                    :key="'u' + i"
                >
                    <v-list-item-icon class="icon">
                        <v-icon>mdi-playlist-music</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title v-text="item.name"></v-list-item-title>
                </v-list-item>

                <v-divider class="mb-1"></v-divider>

                <v-list-item
                    v-for="(item, i) in playlists.liked"
                    :to="{ name: 'index-playlists-id', params: { id: item.id } }"
                    :key="'l' + i"
                >
                    <v-list-item-icon class="icon">
                        <v-icon>mdi-playlist-music</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title v-text="item.name"></v-list-item-title>
                </v-list-item>
            </v-list>
        </div>
        <div>
            <v-divider></v-divider>
            <v-list-item class="px-2" @click="$root.$emit('logout')">
                <v-list-item-avatar>
                    <v-icon color="red">mdi-exit-to-app</v-icon>
                </v-list-item-avatar>

                <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
        </div>
    </v-layout>
</template>

<script>
export default {
    props: {
        profile: Object,
        playlists: {
            type: Object,
            default: () => ({ user: [], liked: [] })
        }
    }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 960px) {
    .playlists {
        max-height: calc(100vh - 219px);
    }
}

@media screen and (min-width: 960px) {
    .playlists {
        max-height: calc(100vh - 291px);
    }
}

* {
    scrollbar-color: #363636 transparent !important;
}

::-webkit-scrollbar-thumb {
    background: #363636 !important;
}

.playlists .icon {
    display: none;
}

.v-subheader {
    transition: visibility 0.1s, opacity 0.25s linear;
}

.v-navigation-drawer--mini-variant div {
    overflow: hidden !important;

    .v-subheader {
        opacity: 0;
        visibility: hidden;
    }

    .playlists .icon {
        display: initial;
    }
}
</style>