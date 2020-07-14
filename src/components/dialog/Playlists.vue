<template>
    <div>
        <q-dialog v-model="visible" persistent maximized>
            <q-scroll-area class="fit">
                <div class="row flex-center">
                    <div class="q-pa-md col-12 q-gutter-y-lg">
                        <div class="row justify-center">
                            <q-btn @click="visible = false" size="lg" icon="mdi-close" round flat />
                        </div>
                        <div class="row justify-center">
                            <span class="text-h3 text-weight-bold">Add to playlist</span>
                        </div>
                        <div class="row justify-center">
                            <q-btn
                                @click="$root.$emit('create')"
                                color="primary"
                                rounded
                            >Create playlist</q-btn>
                        </div>
                    </div>
                    <div class="col-12">
                        <Collection
                            v-bind:collection="external($user.collection.playlists)"
                            @click="add"
                        />
                    </div>
                </div>
            </q-scroll-area>
        </q-dialog>

        <CreatePlaylist ref="manager" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import Collection from '@/components/misc/Collection.vue'
import CreatePlaylist from '@/components/dialog/CreatePlaylist.vue'

@Component({ components: { Collection, CreatePlaylist } })
export default class PlaylistDialog extends Vue {

    private tracks!: any[];
    private visible: boolean = false;

    public mounted(): void {
        this.$root.$on('create', () => (this.$refs['manager'] as CreatePlaylist).show());
        (this.$refs['manager'] as CreatePlaylist).$on('close', () => this.$forceUpdate());

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

    public external(playlists: any[]): any[] {
        return playlists.filter(e =>
            e['owner'].id === this.$user?.profile.id
        );
    }

}
</script>