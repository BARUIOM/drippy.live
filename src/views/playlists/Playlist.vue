<template>
    <Container
        v-bind:headline="playlist.name"
        v-bind:thumbnail="playlist.images[0].url"
        :fit="true"
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
            <div class="text-h6 text-grey" v-text="playlist.owner.display_name" />
        </template>
        <TrackList v-bind:track_list="playlist.tracks">
            <template v-if="$user.profile.id === playlist.owner.id" v-slot:menu="{ index, item }">
                <q-item @click="removeTrack(index, item)" clickable>
                    <q-item-section>Remove track from this playlist</q-item-section>
                </q-item>
            </template>
        </TrackList>
    </Container>
</template>

<script lang="ts">
import Vue from 'vue'
import { Route } from 'vue-router'
import { Component, Watch } from 'vue-property-decorator'

import Container from '@/components/misc/Container.vue'
import TrackList from '@/components/misc/TrackList.vue'

@Component({ components: { Container, TrackList } })
export default class Playlist extends Vue {

    private playlist: any = {
        owner: {},
        tracks: [],
        images: [
            this.$drippy.thumbnails['collection']
        ]
    };

    private following: boolean = false;

    public async load(id: string): Promise<void> {
        const playlist = await this.$drippy.getPlaylist(id);
        if (!playlist.images.length) {
            playlist.images[0] = this.$drippy.thumbnails['collection'];
        }

        playlist.tracks = [...playlist.tracks.items.map((e: any) => e.track)];
        this.playlist = playlist;
    }

    public async mounted(): Promise<void> {
        await this.load(this.$route.params["id"]);
        this.following = this.$user.collection._playlists
            .contains(this.playlist.id);
    }

    private async follow(): Promise<void> {
        await this.$drippy.followPlaylist(this.playlist, this.$user);
        this.$q.notify({ type: 'positive', message: `Playlist '${this.playlist.name}' added to your collection!`, position: 'top' });
        this.following = true;
    }

    private async unfollow(): Promise<void> {
        await this.$drippy.unfollowPlaylist(this.playlist.id, this.$user);
        this.$q.notify({ type: 'positive', message: `Playlist '${this.playlist.name}' removed from your collection!`, position: 'top' });
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
            this.$q.notify({ type: 'positive', message: 'Playlist link copied to clipboard!', position: 'top' });
        });
    }

    @Watch('$route', { immediate: true, deep: true })
    private async change(route: Route): Promise<void> {
        await this.load(route.params['id']);
    }

}

interface Author {

    id?: string;
    name?: string;

}
</script>