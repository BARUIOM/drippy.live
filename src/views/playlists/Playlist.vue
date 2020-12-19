<template>
    <Container
        v-bind:headline="playlist.name"
        v-bind:thumbnail="Utils.get(playlist.images, 'large')"
    >
        <template v-slot:actions>
            <q-btn
                v-if="$user.profile.id !== playlist.owner.id"
                @click="following ? unfollow() : follow()"
                flat
            >
                <q-icon
                    v-bind:class="{ 'text-primary': following }"
                    :name="following ? 'mdi-heart' : 'mdi-heart-outline'"
                />
            </q-btn>
            <q-btn flat>
                <q-icon name="mdi-dots-horizontal" />
                <q-menu auto-close>
                    <q-list dense>
                        <template v-if="$user.profile.id === playlist.owner.id">
                            <q-item @click="remove" clickable>
                                <q-item-section>Delete playlist</q-item-section>
                            </q-item>
                        </template>

                        <q-item @click="copy" clickable>
                            <q-item-section>Copy playlist link</q-item-section>
                        </q-item>
                    </q-list>
                </q-menu>
            </q-btn>
        </template>
        <template v-slot:subheader>
            <HyperLink
                class="font-bold text-xl text-center sm:text-left"
                :elements="Utils.map([playlist.owner], 'user')"
            />
        </template>
        <TrackList v-bind:track_list="playlist.tracks">
            <template
                v-if="$user.profile.id === playlist.owner.id"
                v-slot:menu="{ index, item }"
            >
                <q-item @click="removeTrack(index, item)" clickable>
                    <q-item-section
                        >Remove track from this playlist</q-item-section
                    >
                </q-item>
            </template>
        </TrackList>
    </Container>
</template>

<script lang="ts">
import Vue from 'vue'
import { Route } from 'vue-router'
import { Component, Watch } from 'vue-property-decorator'

import HyperLink from '@/components/HyperLink.vue'
import Container from '@/components/misc/Container.vue'
import TrackList from '@/components/misc/TrackList.vue'

@Component({ components: { HyperLink, Container, TrackList } })
export default class Playlist extends Vue {

    private playlist: any = {
        owner: {},
        tracks: [],
        images: []
    };

    private following: boolean = false;

    private async follow(): Promise<void> {
        await this.$drippy.followPlaylist(this.playlist, this.$user);
        //this.$q.notify({ type: 'positive', message: `Playlist '${this.playlist.name}' added to your collection!`, position: 'top' });
        this.following = true;
    }

    private async unfollow(): Promise<void> {
        await this.$drippy.unfollowPlaylist(this.playlist.id, this.$user);
        //this.$q.notify({ type: 'positive', message: `Playlist '${this.playlist.name}' removed from your collection!`, position: 'top' });
        this.following = false;
    }

    private remove(): void {
        this.unfollow().then(() => this.$router.push({ name: 'collection' }));
    }

    private removeTrack(index: number, track: any): void {
        this.$drippy.removeTrackFromPlaylist(this.playlist.id, track).then(() => {
            this.playlist.tracks.splice(index, 1);
        });
    }

    private copy(): void {
        navigator.clipboard.writeText(window.location.href).then(() => {
            //this.$q.notify({ type: 'positive', message: 'Playlist link copied to clipboard!', position: 'top' });
        });
    }

    @Watch('$route', { immediate: true, deep: true })
    private async change(route: Route): Promise<void> {
        const playlist = await this.$drippy.getPlaylist(route.params['id']);

        playlist.tracks = [...playlist.tracks.items.map((e: any) => e.track)];
        this.playlist = playlist;

        this.following = this.$user.collection._playlists
            .contains(this.playlist.id);
    }

}
</script>