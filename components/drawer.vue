<template>
    <v-layout class="d-flex flex-column" justify-space-between fill-height>
        <div>
            <v-list-item class="px-2">
                <v-list-item-avatar class="elevation-2">
                    <v-img v-if="$drippy.userdata.photoURL" :src="$drippy.userdata.photoURL"></v-img>
                    <v-icon v-else>mdi-account</v-icon>
                </v-list-item-avatar>

                <v-list-item-title v-text="$drippy.userdata.displayName"></v-list-item-title>
            </v-list-item>

            <v-divider></v-divider>

            <v-list nav dense>
                <v-list-item link to="/" exact>
                    <v-list-item-icon>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Home</v-list-item-title>
                </v-list-item>

                <v-list-item link to="/playlists" exact>
                    <v-list-item-icon>
                        <v-icon>mdi-playlist-music</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Playlists</v-list-item-title>
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
        </div>
    </v-layout>
</template>

<style lang="scss" scoped>
.v-list-item {
    flex: unset !important;
}
</style>