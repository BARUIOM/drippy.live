<template>
    <div v-if="$user.ready" class="p-2">
        <Artists @click="open('artist', arguments[0])" />
        <Collection
            title="Playlists"
            v-bind:collection="$user.collection.playlists"
            @click="open('playlist', arguments[0])"
        >
            <Button @click="$root.$emit('new-playlist')">
                <span class="mdi mdi-plus mdi-24px" />
            </Button>
        </Collection>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'


import Button from '@/components/Button.vue'
import Artists from '@/components/home/Artists.vue'
import Collection from '@/components/misc/Collection.vue'

@Component({ components: { Button, Artists, Collection } })
export default class Library extends Vue {

    private mounted(): void {
        this.$root.$emit('header', 'default');
    }

    private open(name: string, object: any): void {
        this.$router.push({ name, params: { id: object.id } });
    }

}
</script>