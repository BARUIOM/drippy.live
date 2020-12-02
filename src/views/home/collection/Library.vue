<template>
    <div v-if="$user.ready" class="p-2">
        <Artists
            v-bind:artists="$user.collection.following"
            @click="open('artist', arguments[0])"
        />
        <Collection
            title="Playlists"
            v-bind:collection="$user.collection.playlists"
            @click="open('playlist', arguments[0])"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import Artists from '@/components/home/Artists.vue'
import Collection from '@/components/misc/Collection.vue'

@Component({ components: { Artists, Collection } })
export default class Library extends Vue {

    public open(name: string, object: any): void {
        this.$router.push({ name, params: { id: object.id } });
    }

}
</script>