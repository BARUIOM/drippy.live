<template>
    <div>
        <portal to="header">
            <q-tabs v-model="tab" class="bg-dark" align="left">
                <q-tab name="playlists" label="Playlists" />
                <q-tab name="artists" label="Artists" />
                <q-tab name="albums" label="Albums" />
            </q-tabs>
        </portal>
        <q-tab-panels class="bg-transparent" v-model="tab">
            <q-tab-panel class="q-pa-none" name="playlists">
                <Contents
                    type="collection"
                    v-bind:contents="$user.collection.playlists"
                    @click="open('playlist', arguments[0])"
                    :wrap="true"
                />
            </q-tab-panel>

            <q-tab-panel class="q-pa-none" name="artists">
                <Contents
                    type="artist"
                    v-bind:contents="$user.collection.following"
                    @click="open('artist', arguments[0])"
                    :wrap="true"
                />
            </q-tab-panel>

            <q-tab-panel class="q-pa-none" name="albums">
                <Contents
                    type="collection"
                    v-bind:contents="$user.collection.albums"
                    @click="open('album', arguments[0])"
                    :wrap="true"
                />
            </q-tab-panel>
        </q-tab-panels>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import Contents from '@/components/misc/Contents.vue'

@Component({ components: { Contents } })
export default class Library extends Vue {

    private tab: string = 'playlists'

    public mounted(): void {
        this.$user.on('ready', () => this.$forceUpdate());
    }

    public open(name: string, id: string): void {
        this.$router.push({ name, params: { id } });
    }

}
</script>