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
                    <v-list-item link to="/collection/tracks" exact>
                        <v-list-item-icon>
                            <v-icon>mdi-thumb-up</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Liked songs</v-list-item-title>
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
                    <slot></slot>
                </v-list>
            </v-col>
        </v-row>
    </v-layout>
</template>

<style lang="scss" scoped>
@media screen and (max-width: 960px) {
    .playlists {
        max-height: calc(100vh - 150px);
    }
}

@media screen and (min-width: 960px) {
    .playlists {
        max-height: calc(100vh - 222px);
    }
}

* {
    scrollbar-color: #363636 transparent !important;
}

::-webkit-scrollbar-thumb {
    background: #363636 !important;
}
</style>