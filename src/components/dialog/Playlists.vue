<template>
    <q-dialog v-model="visible" persistent maximized>
        <div class="row fit flex-center">
            <div class="col-12 q-gutter-y-lg">
                <div class="row justify-center">
                    <q-btn @click="visible = false" size="lg" icon="mdi-close" round flat />
                </div>
                <div class="row justify-center">
                    <span class="text-h3 text-weight-bold">Add to playlist</span>
                </div>
                <div class="row justify-center">
                    <q-btn color="primary" rounded>Create playlist</q-btn>
                </div>
            </div>
            <div class="col-12">
                <Collection v-bind:collection="playlists" @click="add" />
            </div>
        </div>
    </q-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import Collection from '@/components/misc/Collection.vue'

@Component({ components: { Collection } })
export default class PlaylistDialog extends Vue {

    private tracks!: any[];
    private visible: boolean = false;

    public mounted(): void {
        this.$root.$on('add', (tracks: any) => {
            this.visible = true;
            this.tracks = tracks;
        });
    }

    public add(playlist: any): void {
        this.$drippy.addTracksToPlaylist(playlist['id'], this.tracks).then(() => {
            const message = `Track${this.tracks.length > 1 ? 's' : ''} added to playlist '${playlist['name']}'`;
            this.$q.notify({ type: 'positive', message, position: 'top' });
        }).finally(() => this.visible = false);
    }

    public get playlists() {
        if (this.$user !== undefined) {
            const user = this.$user;
            return user.collection.playlists.filter(e =>
                e['owner'].id === user.profile.id
            );
        }
    }

}
</script>