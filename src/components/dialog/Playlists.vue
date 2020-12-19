<template>
    <div
        v-bind:class="{ visible }"
        class="dialog bg-black bg-opacity-90 select-none text-white"
    >
        <div
            class="flex flex-col w-full h-full items-center justify-center p-2"
        >
            <Button @click="visible = false" class="rounded-full">
                <span class="mdi mdi-close mdi-48px"> </span>
            </Button>
            <div class="text-4xl font-bold p-2">Add to playlist</div>
            <Button
                @click="$root.$emit('new-playlist')"
                class="bg-primary rounded-full px-8 h-9 my-2"
            >
                Create Playlist
            </Button>
            <div class="flex flex-wrap w-full overflow-y-auto">
                <div
                    @click="add(playlist)"
                    class="w-1/2 sm:w-1/3 md:w-1/4 xl:w-1/6 p-2 cursor-pointer"
                    v-for="(playlist, i) in playlists()"
                    :key="i"
                >
                    <Cover
                        class="bg-black"
                        :url="Utils.get(playlist.images, 'large')"
                    />
                    <div
                        class="text-md text-center font-bold p-2"
                        v-text="playlist.name"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import Cover from '@/components/Cover.vue'
import Button from '@/components//Button.vue'

@Component({ components: { Cover, Button } })
export default class Playlists extends Vue {

    private tracks!: any[];
    private visible: boolean = false;

    private mounted(): void {
        this.$root.$on('add', (tracks: any[]) => {
            this.visible = true;
            this.tracks = tracks;
        });
    }

    private add(playlist: any): void {
        this.$drippy.addTracksToPlaylist(playlist['id'], this.tracks).then(() => {
            const message = `Track${this.tracks.length > 1 ? 's' : ''} added to playlist '${playlist['name']}'`;
            // TODO toast
        }).finally(() => this.visible = false);
    }

    private playlists(): readonly any[] {
        const playlists = this.$user.collection.playlists
            .filter(e => e['owner'].id === this.$user.profile.id);

        return Object.freeze(playlists);
    }

}
</script>