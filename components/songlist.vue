<template>
    <v-list v-if="song_list.length" class="pa-0" two-line>
        <template v-for="(item, index) in song_list">
            <div :key="'i' + index">
                <div v-if="queue">
                    <slot v-if="index === $data.index" name="title"></slot>
                    <slot v-else-if="index === $data.index + 1" name="subtitle"></slot>
                </div>
                <trackitem
                    v-bind:class="{ 'disabled': disabled }"
                    v-if="!queue || index >= $data.index"
                    @play="play(index)"
                    v-bind:track="item"
                    v-bind:hide-album="hideAlbum"
                    v-bind:hide-artwork="hideArtwork"
                >
                    <v-list-item @click.stop="$root.$emit('add', [item])">
                        <v-list-item-title>Add track to playlist</v-list-item-title>
                    </v-list-item>
                    <v-list-item v-if="user_playlist" @click.stop="remove(item, index)">
                        <v-list-item-title>Remove track from this playlist</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click.stop="copy(item)">
                        <v-list-item-title>Copy track link</v-list-item-title>
                    </v-list-item>
                </trackitem>
            </div>
        </template>
    </v-list>
</template>

<script>
import trackitem from './trackitem';

export default {
    props: {
        song_list: Array,
        user_playlist: Boolean,
        hideAlbum: {
            type: Boolean,
            default: false
        },
        hideArtwork: {
            type: Boolean,
            default: false
        },
        queue: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    components: { trackitem },
    data: (vm) => ({
        index: vm.$player.index
    }),
    mounted() {
        this.$player.on('playback-started', this.define);
    },
    beforeDestroy() {
        this.$player.off('playback-started', this.define);
    },
    methods: {
        play(index) {
            if (this.$player.playlist !== this.song_list)
                this.$player.playlist = this.song_list;
            this.$player.play(index);
        },
        remove(track, index) {
            this.$drippy.removeTrackFromPlaylist(this.$route.params['id'], track).then(() => {
                this.song_list.splice(index, 1);
            });
        },
        copy(track) {
            navigator.clipboard.writeText(`${window.location.origin}/track/${track.id}`).then(() => {
                this.$root.$emit('snackbar', 'Track link copied to clipboard!', 'success', true);
            });
        },
        define(track, index) {
            this.index = index;
            this.$forceUpdate();
        }
    }
}
</script>

<style lang="scss" scoped>
.v-list.v-list--two-line {
    border-color: transparent !important;
    background-color: transparent !important;

    .v-list-item {
        height: 64px;
    }

    .v-list-item.disabled {
        transition: opacity 0.2s linear;
    }

    .v-list-item.disabled:not(:hover) {
        opacity: 0.4;
    }
}
</style>