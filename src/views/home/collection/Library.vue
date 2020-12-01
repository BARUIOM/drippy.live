<template>
    <div v-if="$user.ready" class="p-2">
        <div class="w-full">
            <div class="p-2 text-xl font-bold">Artists</div>
        </div>
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

import Collection from '@/components/misc/Collection.vue'

@Component({ components: { Collection } })
export default class Library extends Vue {

    public open(name: string, object: any): void {
        this.$router.push({ name, params: { id: object.id } });
    }

}
</script>