<template>
    <v-dialog v-model="visible" transition="dialog-bottom-transition" fullscreen scrollable>
        <v-card flat tile>
            <v-toolbar dark>
                <v-btn @click.stop="visible = false" icon>
                    <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
                <v-toolbar-title>Play Queue</v-toolbar-title>
            </v-toolbar>

            <v-card-text class="pa-0">
                <songlist v-bind:song_list="playlist" queue>
                    <template v-slot:title>
                        <v-card-title>Now playing</v-card-title>
                    </template>
                    <template v-slot:subtitle>
                        <v-card-title>Next</v-card-title>
                    </template>
                </songlist>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import songlist from './songlist'

export default {
    components: { songlist },
    data: () => ({
        visible: false,
        playlist: []
    }),
    mounted() {
        this.$root.$on('queue', () => {
            this.visible = true;
            this.playlist = JSON.parse(JSON.stringify(this.$player.playlist));
        });
    },
    watch: {
        $route(to, from) {
            this.visible = false;
        }
    }
}
</script>

<style lang="scss">
.v-dialog__content {
    z-index: 4 !important;

    .v-dialog.v-dialog--fullscreen {
        padding-left: 56px;
        background-color: #121212;
    }
}

.v-card .v-toolbar {
    max-height: 56px;

    > div {
        max-height: inherit;
    }
}
</style>