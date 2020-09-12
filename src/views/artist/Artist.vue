<template>
    <Container
        v-bind:headline="artist.name"
        v-bind:thumbnail="(artist.images[0] || $drippy.thumbnails['artist']).url"
    >
        <template v-slot:actions>
            <q-btn icon="mdi-dots-horizontal" flat />
            <q-btn flat>Follow</q-btn>
        </template>

        <Collection title="Albums" v-bind:collection="artist.albums" @click="open" />
        <Collection title="Singles & EPs" v-bind:collection="artist.singles" @click="open" />
    </Container>
</template>

<script lang="ts">
import Vue from 'vue'
import { Route } from 'vue-router'
import { Component, Watch } from 'vue-property-decorator'

import Collection from '@/components/misc/Collection.vue'
import Container from '@/components/misc/Container.vue'

@Component({ components: { Collection, Container } })
export default class Artist extends Vue {

    private artist: any = {
        name: '',
        images: [
            {
                url: ''
            }
        ]
    };

    public open(artist: any): void {
        this.$router.push({ name: 'album', params: { id: artist['id'] } });
    }


    @Watch('$route', { immediate: true, deep: true })
    private async change(route: Route): Promise<void> {
        const artist = await this.$drippy.getArtist(route.params['id']);
        this.artist = Object.freeze(artist);
    }

}
</script>